import React from 'react'

export default function FilledButton({ icon: Icon, label, onClick, backgroundColor }) {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor }}
            className={`flex justify-center gap-2 p-2 rounded-lg text-canvas-text text-[13px] font-semibold`}
        >
            <Icon size={16} />
            <span>{label}</span>

        </button>
    )
}
