import Header from '@/components/Header'
import React from 'react'

type Props = {}

function Education({ }: Props) {
    return (
        <div className='bg-[#081b29] h-max-screen'>
            <Header />
            <div className='h-screen flex flex-col p-5 justify-start mt-20 items-center gap-10 text-slate-100' >
                <h1 className='text-[2em]'>My <span className='text-[#00baf0]'>Journey</span></h1>

                <div className='flex justify-center items-start w-full'>
                    <div className='ml-10'>
                        <h1>Education</h1>
                        <div className='box'>
                            <span>
                                2022 - 2025    
                            </span>
                            <h1>Software engineering - <span className='text-[#00baf0]'>Rwanda Coding Academy</span></h1>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus doloremque aspernatur eligendi possimus, corporis cupiditate id expedita optio consequuntur cum quibusdam qui quisquam impedit dicta odio, illum necessitatibus sapiente veritatis.</p>
                        </div>
                       
                    </div>
                    <div className='ml-10'>
                            <h1>Experience</h1>
                        <div className='box'>
                            <span>
                                2022 - 2025
                            </span>
                            <h1>Software engineering - <span className='text-[#00baf0]'>Rwanda Coding Academy</span></h1>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus doloremque aspernatur eligendi possimus, corporis cupiditate id expedita optio consequuntur cum quibusdam qui quisquam impedit dicta odio, illum necessitatibus sapiente veritatis.</p>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Education