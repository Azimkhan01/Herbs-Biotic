import CurveDivider from "@/component/common/Wave";
import Hero from "@/component/home/Hero";
import Page2 from "@/component/home/Page2";
import QnA from "@/component/home/QnA";
import QNA2 from "@/component/home/QNA2";
import Recommendation from "@/component/home/Recommendation";
import Search from "@/component/home/Search";

export default function Home() {
  return (
    <>
    <Hero/>
    <Search/>
    <Recommendation/>    
    <QnA/>
    <Page2/>
    <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />
    <QNA2/>
    <CurveDivider color="#F3F4F6" className="bg-white" />
    
    </>
  );
}
