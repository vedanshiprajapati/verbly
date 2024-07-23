import { Sun, Moon, Search, PenTool } from "lucide-react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useTheme } from "../context/ThemeProvider";
import { Link, Outlet } from "react-router-dom";
import { AvatarDropdown } from "./AvatarDropdown";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-bold text-2xl">Verbly</span>
              </Link>
              <div className="hidden sm:block">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="relative">
                      <Search className="absolute left-1.5 top-1.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search Blog"
                        type="search"
                        className="pl-8 w-[300px]"
                      />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Search Tips</h4>
                      <p className="text-sm">
                        Use keywords to find specific blogs. Try searching by
                        topic, author, or title.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative w-[1.2rem] h-[1.2rem]">
                  <Sun className="h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute top-0 left-0" />
                  <Moon className="h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute top-0 left-0" />
                </div>
                <Switch
                  checked={theme === "light"}
                  onCheckedChange={handleThemeToggle}
                />
              </div>
              {isAuthenticated ? (
                <>
                  <Link to="/blog/edit">
                    <Button variant="ghost">
                      <PenTool className="mr-2 h-4 w-4" />
                      Write
                    </Button>
                  </Link>
                  <AvatarDropdown />
                </>
              ) : (
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <Separator />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
