import { MountainIcon } from "lucide-react";
import { Button } from "../ui/button";
import { LayoutGridIcon } from "lucide-react";
import { ClipboardListIcon } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { BarChartIcon } from "lucide-react";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-background border-r w-16 sm:w-60 flex flex-col items-start py-4 px-2 sm:px-4 ">
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 sm:mb-12"
        prefetch={false}
      >
        <MountainIcon className="w-6 h-6" />
        <span className="text-lg font-semibold hidden sm:block">Acme PM</span>
      </Link>
      <nav className="flex flex-col items-start w-full">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 rounded-md hover:bg-muted"
          asChild
        >
          <Link href="/">
            <HomeIcon className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:block">Home</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 rounded-md hover:bg-muted"
          asChild
        >
          <Link href="/projects">
            <LayoutGridIcon className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:block">
              Projects
            </span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 rounded-md hover:bg-muted"
          asChild
        >
          <Link href="/tasks">
            <ClipboardListIcon className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:block">Tasks</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 rounded-md hover:bg-muted"
        >
          <CalendarIcon className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:block">Calendar</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 rounded-md hover:bg-muted"
        >
          <BarChartIcon className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:block">Reports</span>
        </Button>
      </nav>
      <div className="mt-auto w-full">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 rounded-md hover:bg-muted"
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:block">Settings</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
