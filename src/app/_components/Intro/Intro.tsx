import ProfileImage from "./profile.webp"

import Image from "next/image"

export function Intro() {
  return (
    <div className='mx-auto mb-[2rem] mt-[5rem] flex w-[90vw] max-w-800 flex-col'>
      <p className='font-poppins text-[2rem] font-semibold leading-[1.3] pc:text-[3.5rem]'>
        Dedicated to{" "}
        <em className='text-gradient-intro h-[2.5rem] animate-bg-gradient pc:h-auto'>Coding.</em>
      </p>
      <div className='mt-[5rem] flex items-center self-end'>
        <p className='text-[0.7rem] leading-1.2 text-default-sub-light dark:text-default-sub-dark pc:text-[1rem]'>
          <strong className='mb-[0.3rem] block font-poppins text-[0.9rem] font-semibold text-default-light dark:text-default-dark pc:mb-[0.5rem] pc:text-[1.2rem]'>
            Shi Woo, Park
          </strong>
          <span>만들고 싶으면 만들어야지.</span>
        </p>
        <Image
          src={ProfileImage}
          alt='개발자 박시우의 프로필 이미지입니다.'
          className='ml-[0.7rem] block h-[4.0625rem] w-[4.0625rem] rounded-full border-2 border-solid border-default-sub-light dark:border-default-sub-dark pc:ml-[1rem] pc:h-[5.625rem] pc:w-[5.625rem]'
          placeholder='blur'
          priority
        />
      </div>
    </div>
  )
}
