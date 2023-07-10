import Header from '@/components/Header'
import React from 'react'

type Props = {}

const Contacts = (props: Props) => {
  return (

    <div className='bg-[#081b29] h-max-screen'>
      <Header />
      <div className='h-screen flex flex-col p-5 justify-start mt-20 items-center gap-10'>
        <h1 className='text-[2em]'>Contact <span className='text-[#00baf0]'>Me</span></h1>

        <div className='flex flex-col gap-5'>
          <div>
            <input placeholder='Enter your name'/>  
            <input placeholder='enter your email'/>  
          </div>
          <input placeholder='Email subject'/>
          <textarea placeholder='Your message' rows={10}>

          </textarea>
          <button className='btn text-black bg-[#00abf0]'>send</button>
        </div>
      </div>
    </div>
  )
}

export default Contacts