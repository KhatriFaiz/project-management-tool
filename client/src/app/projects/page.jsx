import CreateProjectDialog from "@/components/dialogs/CreateProjectDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Menu } from "lucide-react";

const ProjectsPage = () => {
  return (
    <main>
      <section className="max-w-screen-lg mx-auto">
        <div className="py-10">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <div className="flex justify-end">
            <CreateProjectDialog />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Project Manager</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Project Title</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell className="flex justify-end">
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default ProjectsPage;
