import Header from '@/components/Header'
import React from 'react'

type Props = {}

function Education({ }: Props) {
    return (
        <div className='bg-[#081b29] h-min-screen'>
            <Header />
            <div className='h-max-screen md:h-screen flex flex-col p-5 justify-start mt-20 items-center gap-10 text-slate-100' >
                <h1 className='text-[2em]'>My <span className='text-[#00baf0]'>Journey</span></h1>

                <div className='flex justify-center items-start w-full flex-col md:flex-row'>
                    <div className='ml-10 w-full'>
                        <h1>Education</h1>
                        <div className='box'>
                            <span>
                                2022 - 2025    
                            </span>
                            <h1>Software engineering - <span className='text-[#00baf0]'>Rwanda Coding Academy</span></h1>
                            <div className='flex items-center justify-start'>
                                <div className='w-4 h-[100px] bg-[#00abf0]'></div>
                                <p className='ml-5'>Started class in the Africa&apos;s elite coding school in 2022 enrolling in Software engineering and embedded systems course. With 3-years of learning, i will be ready to take on challenging projects and work with others in teams.</p>
                         </div>
                        </div>
                       
                    </div>
                    <div className='ml-10 w-full'>
                            <h1>Experience</h1>
                        <div className='box'>
                            <span>
                                2022 - 2025
                            </span>
                            <h1>Software engineering - <span className='text-[#00baf0]'>Rwanda Coding Academy</span></h1>
                            <div className='flex items-center justify-start'>
                                <div className='w-4 h-[100px] bg-[#00abf0]'></div>
                                <p className='ml-5'>3 years taking pace on challenging projects, working in teams and counselling others.</p>
                            </div>  
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Education