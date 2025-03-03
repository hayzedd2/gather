
import Navbar from "@/components/homepage/Navbar";
import TemplatesContainer from "@/components/templates/TemplatesContainer";
const page = () => {
  return (
    <div>
      <Navbar/>
      <section className="p-4 mb-5 max-w-5xl mx-auto">
      <div className="w-full items-center text-center flex-col flex justify-center ">
        <h3 className="font-[600] text-[2rem]">Form templates</h3>
        <h6 className="mt-[-3px] max-w-[500px]">
          Start with a template to create your form faster!
        </h6>
      </div>
      <TemplatesContainer/>
     
    </section>
    </div>
  );
};

export default page;
