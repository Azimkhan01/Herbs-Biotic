import CurveDivider from "../common/Wave";
import { manrope } from "@/font/font";
import './style.css'
import AnimatedLogo from "./ThreeLineSVG";
import CategoryToggle from "./CategoryToggle";
function Recommendation() {
  return (
    <div>
      <CurveDivider color="#fff" />

      <section
        className={`h-screen bg-white p-10 ${manrope.className} font-semibold tracking-widest flex flex-col gap-y-10`}
      >
        {/* content 1 heading  */}
        <div className="flex gap-x-10 gap-y-0 flex-col-reverse md:flex-row">
          <div className=" flex items-end ">
            <p className="text-4xl  flex flex-col gap-y-5 text-teal-900 ">
              <span>
                Made with <span className="font-black">love</span>,
              </span>
              <span>taken with care!</span>
            </p>
          </div>
         <div className="self-end md:self-auto">
           <AnimatedLogo/>
         </div>
        </div>
        
        {/* content 2 description */}
        <div className="flex justify-end w-full text-teal-900 font-black">
          <p className="md:w-2/5">
            Discover complete BARF recipes for your dog or cat – ready to serve!
          </p>
        </div>

        {/* category toggle  */}
         <CategoryToggle/>

      </section>

      <CurveDivider color="#F3F4F6" className="bg-white" />
    </div>
  );
}

export default Recommendation;
