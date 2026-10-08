import type {Metadata} from "next";
import {MotionDirector} from "@/components/motion-director";
import {Navbar} from "@/components/navbar";
import {InteractiveMenu} from "@/components/interactive-menu";
import {BrandStrip,FinalCTA,Footer,Hero,Signature,Story,WhyAkira} from "@/components/sections";
export const metadata:Metadata={title:"Akira Ramen Club — Tokyo Craft, Seoul Attitude",description:"Slow-braised broth. Ridiculous toppings. Japanese soul × Korean energy. Get your ramen bowl at Akira."};
export default function Home(){return <MotionDirector><Navbar/><main><Hero/><BrandStrip/><Signature/><WhyAkira/><InteractiveMenu/><Story/><FinalCTA/></main><Footer/></MotionDirector>}
