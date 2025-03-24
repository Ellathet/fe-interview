import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuth } from "../hooks/useAuth";

export const HeaderMenu = () => {
  const { logout } = useAuth();

  return (
    <div className="px-[1%] flex justify-end items-center py-[0.5rem] border-b">
      <nav className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-[2.5rem] h-[2.5rem] cursor-pointer">
              <AvatarFallback className={`font-bold bg-primary text-white`}>
                C
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 mr-4">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
};
