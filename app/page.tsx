import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <div className=' bg-[#081b29] h-max-screen'>
      <Header />
      <div className='w-full flex h-screen justify-around p-5 items-center'>
        <div className='w-[50%] flex flex-col gap-4 text-left ml-5'>
          <h1 className='text-[#ededed] text-[2em]'>Hi, I am Henri Tresor</h1>
          <h4 className='text-[#00abf0] font-bold tracking-widest text-[1.4em]'>Full-stack engineer</h4>
          <p className='text-[#ededed] text-left tracking-wider'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et modi ducimus sint vitae quisquam recusandae odio atque nihil ea minima similique in ab reprehenderit nesciunt, voluptas cumque molestias. Facilis, voluptate.</p>
          <div>
            <button className='btn bg-[#00abf0] text-black'>hire me</button>
            <button className='btn text-[#00abf0]'>Let&apos;s talk</button>
          </div>
        </div>
        <div className='w-[50%] flex justify-center gap-2'>
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
