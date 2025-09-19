import React from 'react'
import { Plus } from "lucide-react";

export default function NodesSideBar() {
    return (
        <button className="w-14 flex justify-center mt-8">
            <Plus
                size={30}
                className="p-1 rounded-full bg-[#818089] text-white flex-shrink-0"
            />
        </button>
    )
}
