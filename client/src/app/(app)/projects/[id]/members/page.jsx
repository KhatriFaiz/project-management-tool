"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Search } from "lucide-react";
import Link from "next/link";

const initialMembers = [
  {
    id: "1",
    name: "John Doe",
    username: "johnd",
    email: "john@example.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janes",
    email: "jane@example.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Bob Johnson",
    username: "bobj",
    email: "bob@example.com",
    role: "Designer",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export default function ProjectMembersPage() {
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Simulating an API call to search for users
    const results = initialMembers.filter(
      (member) =>
        member.email.toLowerCase().includes(query.toLowerCase()) &&
        !members.some((m) => m.id === member.id)
    );
    setSearchResults(results);
  };

  const handleInvite = (member) => {
    setMembers([...members, member]);
    setSearchResults(searchResults.filter((m) => m.id !== member.id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Members</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Search for a user by email to invite them to the project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={result.avatar} alt={result.name} />
                      <AvatarFallback>{result.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{result.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.email}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleInvite(result)}>
                    Invite
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Member</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      @{member.username}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{member.role}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="#">
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
