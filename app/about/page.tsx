import Header from '@/components/Header'
import React from 'react'
import Image from 'next/image'

type Props = {}

const About = (props: Props) => {
  return (
      <div className=' bg-[#081b29] h-max-screen'>
          <Header />
          <div className='h-screen flex flex-col p-5 justify-start mt-20 items-center gap-10'>
              <h1 className='text-[3em] text-white'>About <span className='text-[#00abf0]'>Me</span></h1>
              <Image
                  src={'/coding.jpg'}
                  alt={'coding image'}
                  width={'100'}
                  height={'100'}
                  className='rounded-full h-[200px] w-[200px] object-fill outline-7 outline-[#00abf0] outline outline-offset-4'
              />
         </div>
    </div>
  )
}

export default About