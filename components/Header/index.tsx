import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
      <div
          className='text-[#ededed] flex justify-around pt-4 w-full'
      >
          <h2 className='text-2xl font-bold'>
              
              Henri.</h2>
          <div className=''>
              <ul className='flex gap-9'>
                  <li className='nav-list-item'>Home</li>
                  <li className='nav-list-item'>About</li>
                  <li className='nav-list-item'>Education</li>
                  <li className='nav-list-item'>Contacts</li>
              </ul>
          </div>
      </div>
  )
}

export default Header