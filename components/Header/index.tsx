import React from 'react'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
  return (
      <div
          className='text-[#ededed] flex justify-around pt-4 w-full'
      >
          <Link href={'/'}>
              <h2 className='text-2xl font-bold'>

                  Henri.</h2>
          </Link>
          <div className=''>
              <ul className='flex gap-9'>
                  <Link href={'/'}><li className='nav-list-item'>Home</li></Link>
                  <Link href={'/about'}>
                      <li className='nav-list-item'>About</li>
                  </Link>
                  <Link href={'/education'}>
                      <li className='nav-list-item'>Education</li>
                  </Link>
                  <Link href={'/contacts'}>
                      <li className='nav-list-item'>Contacts</li>
                  </Link>
              </ul>
          </div>
      </div>
  )
}

export default Header