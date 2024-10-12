import { socketEvents } from "../../../common/utils/SocketEvents.js";
import Project from "../models/Project.model.js";
import { z } from "zod";

const projectDetailsSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  members: z
    .object({
      member: z.string().length(24),
      projectManager: z.boolean(),
    })
    .array(),
});

export function projectListners(socket) {
  socket.on(
    socketEvents.PROJECT.createProject,
    async (projectDetails, callback) => {
      try {
        projectDetails.members = [];
        projectDetails.members.push({
          member: socket.user.id,
          projectManager: true,
        });

        projectDetailsSchema.parse(projectDetails);

        const project = new Project(projectDetails);
        await project.save();

        callback({
          success: true,
          project,
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  socket.on(socketEvents.PROJECT.fetchUserProjects, async (callback) => {
    const projects = await Project.find({
      "members.member": socket.user._id,
    });

    callback({
      success: true,
      projects: [...projects],
    });
  });

  socket.on(
    socketEvents.PROJECT.fetchProjectOverview,
    async ({ projectId }, callback) => {
      try {
        const project = await Project.findById(projectId).select(
          "title description"
        );
        callback({
          success: true,
          project,
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
}
