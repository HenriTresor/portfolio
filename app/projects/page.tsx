import Header from '@/components/Header'
import React from 'react'

type Props = {}

function Projects({}: Props) {
  return (
    
      
      <div className='bg-[#081b29] h-max-screen'>
          <Header />
          <div className='h-screen flex flex-col p-5 justify-start mt-20 items-center gap-10 text-slate-100'>
              <h1 className='text-[2em]'>My <span className='text-[#00baf0]'>Projects</span></h1>
          </div>
      </div>
  )
}

export default Projects