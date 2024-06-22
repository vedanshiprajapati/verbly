
import { Sun } from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavBar() {
    return (
        <>
            <header className="w-screen m-0 bg-slate-100 px-5 py-3 flex shadow-xl items-center justify-between">
                <div className="flex items-center">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Verbly
                </h3> 
                <div className="px-5">
                     <Input className="rounded-sm" placeholder="Search Blog" type="search" />
                </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Sun color="grey" size={20} />
                        <Switch />
                    </div>
                    <div><Button variant="link" color="grey">
                        Write</Button></div>
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>
    </>)
}