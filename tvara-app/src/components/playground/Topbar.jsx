import React from 'react'
import navbar_logo from "../../assets/navbar_logo.svg";
import TopBarButtons from '../buttons/TopBarButtons';
import { Bot, Save, Sparkles , ZoomIn, ZoomOut, RotateCcw, User, Play} from "lucide-react";
import FilledButton from '../buttons/FilledButton';

export default function Topbar({ page_name }) {
    return (
        <div className='text-canvas-text bg-canvas-bg w-full py-5 flex items-center justify-between'>
            <div className='flex items-center gap-2 px-4 md:px-8 lg:px-12 text-lg'>
                <img
                    src={navbar_logo}
                    alt="Logo"
                    className="h-6 md:h-8 cursor-pointer"
                />
                <span className=''> /</span>
                <span className='text-[17px]'>{page_name}</span>
            </div>
            <div>
                {
                    page_name === "Workflow Builder" && (
                        <div className='flex justify-end gap-8 mr-6'>
                            <div className=' flex items-center gap-2'>
                                <TopBarButtons icon={ZoomOut} label={""} onClick={() => { console.log("AI Builder") }} />
                                    <span>100%</span>
                                <TopBarButtons icon={ZoomIn} label={""} onClick={() => { console.log("AI Builder") }} />
                                <TopBarButtons icon={RotateCcw} label={""} onClick={() => { console.log("AI Builder") }} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <TopBarButtons icon={Bot} label={"AI Builder"} onClick={() => { console.log("AI Builder") }} />
                                <TopBarButtons icon={Sparkles} label={"Templates"} onClick={() => { console.log("Templates") }} />
                                <TopBarButtons icon={Save} label={"Save"} onClick={() => { console.log("Save") }} />
                                <FilledButton icon={Play} label={"Run Workdflow"} onClick={() => { console.log("Upgrade") }} backgroundColor="#818089" />
                                <User size={37} className='mx-3 text-canvas-text rounded-full border-2 border-canvas-text p-1' />
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    )
}
