import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Menu } from "lucide-react";

const ProjectOverviewPage = () => {
  return (
    <main>
      <div className="max-w-screen-lg mx-auto">
        <div className="py-10">
          <h1 className="text-2xl font-semibold">The First Project</h1>
        </div>
        <section>
          <h2 className="text-xl font-semibold mb-6">Project Members</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Amit Patel</TableCell>
                <TableCell className="flex justify-end">
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jay Patel</TableCell>
                <TableCell className="flex justify-end">
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </div>
    </main>
  );
};

export default ProjectOverviewPage;
