import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <div className=' bg-gradient-to-br from-[#112e42] from-45%  to-[#00abf0]  h-max-screen'>
      <Header />
      <div className='w-full flex h-screen justify-around p-5 items-center'>
        <div className='flex flex-col gap-4 ml-0 md:ml-20 w-full text-center md:text-left md:p-0'>
          <h1 className='text-[#ededed] text-[2em]'>Hi, I am Henri Tresor</h1>
          <h4 className='text-[#00abf0] font-bold tracking-widest text-[1.4em]'>Full-stack engineer</h4>
          <p className='text-[#ededed] text-center tracking-wider md:text-left'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et modi ducimus sint vitae quisquam recusandae odio atque nihil ea minima similique in ab reprehenderit nesciunt, voluptas cumque molestias. Facilis, voluptate.</p>
          <div className='flex items-center gap-2'>
            <button className='btn bg-[#00abf0] text-black'>hire me</button>
            <button className='btn text-[#00abf0]'>Contact me</button>
          </div>
        </div>
        <div className='w-full hidden justify-center gap-2 md:flex'>
          <div className='w-[100px] h-[100px] bg-sky-500 rounded-full scale-50'>

          </div>
          <div className='w-[100px] h-[100px] border-4 border-[#00abf0] rounded-full scale-[1.5]'>
          </div>
          <div className='w-[100px] h-[100px] bg-sky-500 rounded-full scale-50'>

          </div>
        </div>
     </div>
    </div>
  )
}
