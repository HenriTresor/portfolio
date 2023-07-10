import Header from '@/components/Header'
import React from 'react'
import Image from 'next/image'
import skills from '@/data/skills'

type Props = {}

const About = (props: Props) => {
  return (
      <div className=' bg-[#081b29] h-auto '>
          <Header />
          <div className='h-auto flex flex-col p-5 justify-start mt-20 items-center gap-10'>
              <h1 className='text-[3em] text-white'>About <span className='text-[#00abf0]'>Me</span></h1>
              <Image
                  src={'/coding.jpg'}
                  alt={'coding image'}
                  width={'100'}
                  height={'100'}
                  className='rounded-full h-[200px] w-[200px] object-fill outline-7 outline-[#00abf0] outline outline-offset-4'
        />
        
        <p className='text-slate-100 text-left p-10 ml-3 mr-3 mt-5 tracking-wider leading-7 '>
          I am a skilled software engineer with a strong foundation in coding and a passion for creating innovative solutions. With expertise in languages such as Python and C, I have successfully developed and deployed robust software applications. My proficiency extends to database management, web development, and software testing, ensuring seamless functionality and user satisfaction. Adaptable and detail-oriented, I thrive in collaborative environments where I can leverage my problem-solving skills to overcome complex challenges. Committed to staying at the forefront of technological advancements, I continuously seek opportunities to expand my knowledge and contribute to cutting-edge projects. With a proven track record of delivering high-quality software solutions, I am ready to make a valuable impact in the field of software engineering.
        </p>

        <div className='text-slate-100 w-full text-center'>  
          <h1 className='text-[3em] text-white'>My <span className='text-[#00abf0]'>Skills</span></h1>

          <div className='flex justify-center items-start w-full mt-10'>
            <div className='ml-10 w-full'>
              <h1>Coding Skills</h1>
              <div className='box w-full'>
                {
                 skills && skills.map(skill => (
                    <div className='progress w-full mt-4 p-2' key={skill.skil}>
                      <span className='flex justify-between mb-2 '>
                        <h1>{ skill.skil}</h1>
                        <h1>{ skill.level}%</h1>
                      </span>
                      <div className='relative w-full p-1 outline outline-2 outline-[#00abf0] overflow-hidden rounded-lg'>
                        <div className={`absolute left-0 w-[${skill.level}%] h-full bg-[#00abf0] top-0 `}></div>
                      </div>
                    </div>
                  ))
                }
              </div>

            </div>
            <div className='ml-10 w-full'>
              <h1>Professional Skills</h1>
              <div className='box w-full'>
               
              </div>
            </div>
          </div>

        </div>
         </div>
    </div>
  )
}

export default About