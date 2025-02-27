import React from 'react'
import StaggerText from './StaggerText'
import SkewedImage from './SkewedImage'

const HeroSection = () => {
  return (
    <section id="#">
    <div className="flex flex-col w-full items-center justify-center ">
      <div className="hero mt-10 flex flex-col items-center">
        <StaggerText className="text-[3rem] mx-auto max-w-[450px] items-center justify-center leading-[3.4rem] text-center font-[600]">
          Build beautiful forms in minutes
        </StaggerText>

        <h6 className="text-muted-foreground mb-2 text-[15px] font-[500] max-w-[500px] mx-auto text-center">
          Create beautiful forms and share them anywhere. It's super fast,
          you don't need to know how to code.
        </h6>
        <button className="rounded-[100px] bg-black text-[14px] font-[500] hover:opacity-80 text-white py-[6px] px-[14px] cursor-pointer">
          Start for free
        </button>
      </div>
      <SkewedImage />
    </div>
  </section>
  )
}

export default HeroSection