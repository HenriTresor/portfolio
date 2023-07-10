import React from 'react'

type Props = {
    skill: string
    level: number | string
}

export default function Skill({ skill, level }: Props) {
    return (
        <div className='progress w-full mt-4 p-2'>
            <span className='flex justify-between mb-2 '>
                <h1>{skill}</h1>
                <h1>{level}</h1>
            </span>
            <div className='relative w-full p-1 outline outline-2 outline-[#00abf0] overflow-hidden rounded-lg'>
                <div className={`absolute left-0 w-[${level}] h-full bg-[#00abf0] top-0 `}></div>
            </div>
        </div>
    )
}