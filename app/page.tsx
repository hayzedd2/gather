
import Navbar from "@/components/Navbar";
import SkewedImage from "@/components/SkewedImage";
import { Button } from "@/components/ui/button";


export default function Home() {
 
  return (
    <section className="overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center ">
        <div className="hero mt-10 flex flex-col items-center">
          <h1 className="text-[2.8rem] mx-auto max-w-[450px] leading-[3.2rem] text-center font-[600]">
            Build beautiful forms in minutes
          </h1>
          <h6 className="text-muted-foreground my-2 text-[18px] font-[500] max-w-[600px] mx-auto text-center">
            Create beautiful forms and share them anywhere. It's super fast, you
            don't need to know how to code. Get started for free!
          </h6>
          <Button>Create a form now!</Button>
        </div>
       <SkewedImage/>
      </div>
    </section>
  );
}
