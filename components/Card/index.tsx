'use client'

import React from 'react'
import Image from 'next/image'

type Props = {
    name: string
    image: string
    description: string
    live: string
    github: string
}

function Card(project: Props) {
    return (
        <>
            <div
                className='border-2 border-white p-3 mb-3 rounded-lg relative flex flex-col justify-end'
            >
                <div className='mb-5'>
                    <Image
                        src={project.image}
                        width={'100'}
                        height={'100'}
                        alt={`${project.description}`}
                        className='w-full object-cover'
                    />
              </div>
                <h1 className='text-[2em] mb-4 '>{project.name}</h1>
                <p className='tracking-wider leading-6 '>{project.description}</p>

                <div className='flex'>
                    <button className='btn' onClick={()=>window.open(`${project.live}`)}>
                        live
                    </button>
                    <button className='btn' onClick={() => window.open(`${project.github}`)}>
                        github
                    </button>
              </div>
            </div>
            
        </>
    )
}

export default Card