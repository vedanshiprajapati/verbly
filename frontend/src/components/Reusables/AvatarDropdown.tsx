import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { LogOut, PenTool, UserRound } from "lucide-react";

export function AvatarDropdown() {
  const token = localStorage.getItem("token") || "";
  const decoded = jwtDecode(token) as { id: string; username: string };
  const { logout } = useContext(AuthContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarFallback>{decoded.username[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="md:hidden block">
          <Link to="/blog/edit" className="flex">
            <PenTool className="mr-2 h-4 w-4" />
            <span className="text-right">Write</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="md:hidden block" />
        <DropdownMenuItem>
          <Link to={`/@${decoded.username}`} className="flex">
            <UserRound className="mr-2 h-4 w-4" />
            <span className="text-right">Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4"></LogOut>
          <span className="text-right">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
