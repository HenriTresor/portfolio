import Header from '@/components/Header'
import React from 'react'
import { projects } from '../data/skills'
import Card from '@/components/Card'

type Props = {}

function Projects({ }: Props) {
    return (


        <div className='bg-[#081b29] h-auto'>
            <Header /> 
            <div className='h-auto flex flex-col p-5 justify-start mt-20 items-center gap-10 text-slate-100'>
                <h1 className='text-[2em]'>My <span className='text-[#00baf0]'>Projects</span></h1>

                <div className='grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2'>
                    {
                        projects?.map(project => (
                            <Card key={project.name} {...project} />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects