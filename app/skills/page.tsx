import React from 'react'
import { CodingSKills, professionalSkills } from '../data/skills'
import Skill from '@/components/Skill'
import Header from '@/components/Header'

type Props = {}

function Skills({}: Props) {
  return (
      <div className='bg-[#081b29] h-max-screen '>
          <Header />
          <div className='text-slate-100 w-full text-center mt-20'>
              <h1 className='text-[3em] text-white'>My <span className='text-[#00abf0]'>Skills</span></h1>

              <div className='flex justify-center flex-col lg:flex-row items-start w-full mt-10'>
                  <div className='ml-10 w-full'>
                      <h1>Coding Skills</h1>
                      <div className='box w-full'>
                          {
                              CodingSKills && CodingSKills.map(skill => (
                                  <Skill {...skill} key={skill.skill} />
                              ))
                          }
                      </div>

                  </div>
                  <div className='ml-10 w-full'>
                      <h1>Professional Skills</h1>
                      <div className='box w-full'>
                          {
                              professionalSkills && professionalSkills.map(skill => (
                                  <Skill {...skill} key={skill.skill} />
                              ))
                          }
                      </div>
                  </div>
              </div>

          </div>
    </div>
  )
}

export default Skills