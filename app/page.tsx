import CurveDivider from "@/component/common/Wave";
import Page2 from "@/component/home/Page2";
import QnA from "@/component/home/QnA";
import QNA2 from "@/component/home/QNA2";
import Recommendation from "@/component/home/Recommendation";

export default function Home() {
  return (
    <>
    <section className="h-screen"></section>
    <Recommendation/>    
    <QnA/>
    <Page2/>
    <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />
    <QNA2/>
    <CurveDivider color="#F3F4F6" className="bg-white" />
    <section className="h-screen ">

    </section>
    </>
  );
}
