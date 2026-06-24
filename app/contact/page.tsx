import Hero from '@/component/common/Hero'
import CurveDivider from '@/component/common/Wave'
import AnimatedMap from '@/component/contact/AnimatedMap'
import Mail from '@/component/contact/Mail'
import SmallCard from '@/component/contact/SmallCard'

function page() {
  return (
    <section className='py-22'>
        <Hero title='Contact' current={{name:"Contact",link:"/contact"}} >
        <SmallCard/>
        </Hero>
            <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />
        <AnimatedMap/>
        <Mail/>
    </section>
  )
}

export default page