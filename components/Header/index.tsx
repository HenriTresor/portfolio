'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
    const headerRef = useRef<any>(null)
    const navRef = useRef<any>(null)
    const scroll = () => {
        const sticky = headerRef.current?.offsetTop
        if (window.scrollY >= sticky) {
            headerRef.current.classList.add('bg-blue')
        }
    }
    useEffect(() => {

        window.addEventListener('scroll', scroll)
        return () => window.removeEventListener('scroll', scroll)
    }, [])
    return (
        <div
            ref={headerRef}
            className='text-[#ededed] flex  justify-around p-4 items-center w-full  top-0'
        >
            <Link href={'/'}>
                <h2 className='text-2xl font-bold'>

                    Henri.</h2>
            </Link>
            <ul className='gap-9 lg:flex hidden' ref={navRef}>
                <Link href={'/'}><li className='nav-list-item'>Home</li></Link>
                <Link href={'/about'}>
                    <li className='nav-list-item'>About</li>
                </Link>
                <Link href={'/skills'}>
                    <li className='nav-list-item'>Skills</li>
                </Link>
                <Link href={'/journey'}>
                    <li className='nav-list-item'>Journey</li>
                </Link>
                <Link href={'/projects'}>
                    <li className='nav-list-item'>Projects</li>
                </Link>
                <Link href={'/contacts'}>
                    <li className='nav-list-item'>Contacts</li>
                </Link>
            </ul>

            <div className='flex-col gap-1 lg:hidden flex' onClick={() => navRef.current?.classList.toggle('hamburger')}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </div>
    )
}

export default Header