import Header from '@/components/Header'
import React from 'react'

type Props = {}

function Education({ }: Props) {
    return (
        <div className='bg-[#081b29] h-max-screen'>
            <Header />
            <div className='h-screen flex flex-col p-5 text-center w-full items-center mt-20'>
                <h1 className='text-[3em] text-white'>My <span className='text-[#00abf0]'>Journey</span></h1>
                <div className='flex'>
                    <div className=''>
                        <h1>Education</h1>
                        <div className='text-white border-34 border-[#00abf0] w-auto h-auto p-5'>
                            <h1>Associate&apos;s Degree - Software engineering</h1>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Education