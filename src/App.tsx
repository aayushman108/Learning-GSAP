import gsap from "gsap";
import "./App.css";
import {
  ComplexTextAnimation,
  ComplexTextAnimationTwo,
  HeroSection,
  ScrollTriggerMain,
  ScrollTriggerWithCardInflow,
} from "./components";
import {
  SplitText,
  ScrollSmoother,
  ScrollTrigger,
  Physics2DPlugin,
  Flip,
} from "gsap/all";
import { FlipAnimationTwo } from "./components/flipAnimationTwo/flipAnimationTwo.component";
import { FlipAnimationThree } from "./components/flipAnimationThree/flipAnimationThree.component";

gsap.registerPlugin(
  SplitText,
  ScrollSmoother,
  ScrollTrigger,
  Physics2DPlugin,
  Flip
);

function App() {
  return (
    <div>
      <HeroSection />
      {/* <FlipAnimation /> */}
      <FlipAnimationTwo />
      <FlipAnimationThree />
      <ComplexTextAnimation />
      <ComplexTextAnimationTwo />
      {/* <TextSplitting /> */}
      {/* <Physics2D />
      <PhysicsText />
      <ScrollTriggerDemo /> */}
      <ScrollTriggerMain />
      <ScrollTriggerWithCardInflow />
    </div>
  );
}

export default App;
