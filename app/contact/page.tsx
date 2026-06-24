import Hero from '@/component/common/Hero'
import CurveDivider from '@/component/common/Wave'
import AnimatedMap from '@/component/contact/AnimatedMap'
import Mail from '@/component/contact/Mail'
import SmallCard from '@/component/contact/SmallCard'
import { manrope } from '@/font/font'

function page() {
  return (
    <section className='py-22'>
        <Hero title='Contact' current={{name:"Contact",link:"/contact"}} >
        <SmallCard/>
        </Hero>
            <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />
            <div className='flex justify-center items-center bg-white p-5'>
              <p className={`text-6xl font-extrabold ${manrope.className} text-teal-900 `} >Our Site</p>
            </div>
        <AnimatedMap/>
        <Mail/>
        
    </section>
  )
}

export default page