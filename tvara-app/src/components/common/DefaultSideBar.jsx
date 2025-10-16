import React, { useState } from "react";
import {
    History,
    Compass,
    Settings,
    User,
    ArrowRightFromLine,
    Plus,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

export default function DefaultSideBar() {
    const [collapsed, setCollapsed] = useState(false);

    const elements = [
        {
            name: "History",
            icon: History,
            onClick: () => console.log("History"),
        },
        {
            name: "Timeline",
            icon: Compass,
            onClick: () => console.log("Compass"),
        },
        {
            name: "Settings",
            icon: Settings,
            onClick: () => console.log("Settings"),
        },
        {
            name: "Profile",
            icon: User,
            onClick: () => console.log("User"),
        },
        {
            name: "Dashboard",
            icon: ArrowRightFromLine,
            onClick: () => console.log("ArrowRightFromLine"),
        },
    ];

    return (
        <div
            className={`m-6 flex flex-col justify-between transition-all duration-500 ease-in-out ${collapsed ? "items-center w-10 ml-3" : "items-start w-48"
                }`}
        >
            <div className="flex flex-col gap-2 w-full">
                {elements.map((element, index) => (
                    <button
                        key={index}
                        onClick={element.onClick}
                        className="flex items-center gap-3 p-3 rounded-lg text-canvas-text/80 font-medium hover:shadow-sm shadow-primary/10 transition-all duration-300 ease-in-out w-full"
                    >
                        <element.icon size={24} className="flex-shrink-0" />
                        <span
                            className={`transition-all duration-300 ease-in-out ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                                }`}
                        >
                            {element.name}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <button className="flex items-center gap-3 p-3 text-canvas-text/80 rounded-lg font-medium hover:shadow-sm shadow-primary/10 transition-all duration-300 ease-in-out w-full">
                    <Plus
                        size={24}
                        className="p-1 rounded-full bg-primary/80 text-white flex-shrink-0"
                    />
                    <span
                        className={`transition-all duration-300 ease-in-out ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                            }`}
                    >
                        Add Workflow
                    </span>
                </button>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 p-3 rounded-lg text-canvas-text/80 font-medium hover:shadow-sm shadow-primary/10 transition-all duration-300 ease-in-out w-full"
                >
                    {collapsed ? <ChevronsRight size={24} className="flex-shrink-0" /> : <ChevronsLeft size={24} className="flex-shrink-0" />}
                    <span
                        className={`transition-all duration-300 ease-in-out ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                            }`}
                    >
                        {collapsed ? "Expand" : "Collapse"}
                    </span>
                </button>
            </div>
        </div>
    );
}