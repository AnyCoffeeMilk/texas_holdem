'use client'

import { useState } from 'react'

export default function SettingItem({ name, initSelect, options }) {
    const [select, setSelect] = useState(initSelect)

    return (
        <div className="border-2 border-dark flex justify-between rounded-sm px-4 py-2 text-xl font-semibold">
            <span className="font-bold">{name}</span>
            <div className="space-x-2 uppercase">
                {options.map((item, index) => (
                    <span key={index} className="space-x-2">
                        <span
                            className={`${select === index ? 'underline' : null} cursor-pointer hover:underline`}
                            onClick={() => setSelect(index)}
                        >
                            {item.text}
                        </span>
                        {index + 1 < options.length ? <span>/</span> : null}
                    </span>
                ))}
            </div>
        </div>
    )
}
