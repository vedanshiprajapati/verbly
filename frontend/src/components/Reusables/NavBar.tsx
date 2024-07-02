import { Sun } from "lucide-react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useTheme } from "../context/ThemeProvider";
import { Link, Outlet } from "react-router-dom";
import { AvatarDropdown } from "./AvatarDropdown";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };
  return (
    <>
      <div className="h-screen">
        <header className="m-0 px-7 py-4 flex shadow-xl items-center justify-between">
          <div className="flex items-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              <Link to={"/"}>Verbly</Link>
            </h3>
            <div className="px-5">
              <Input
                className="rounded-sm"
                placeholder="Search Blog"
                type="search"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mr-6">
            <div className="flex items-center gap-1">
              <Sun color="grey" size={20} />
              <Switch
                checked={theme === "light"}
                onCheckedChange={handleThemeToggle}
              />
            </div>
            {isAuthenticated ? (
              <>
                <Link to={"/blog/edit"}>
                  <div>
                    <Button variant="link" color="grey">
                      Write
                    </Button>
                  </div>
                </Link>
                <div>
                  <AvatarDropdown />
                </div>
              </>
            ) : (
              <Button className=" ml-3">
                <Link to={"/login"}>Login</Link>
              </Button>
            )}
          </div>
        </header>
        <Outlet />
      </div>
    </>
  );
}
