import gsap from "gsap";
import "./App.css";
import {
  ComplexTextAnimation,
  ComplexTextAnimationTwo,
  ScrollTriggerMain,
  ScrollTriggerWithCardInflow,
} from "./components";
import {
  SplitText,
  ScrollSmoother,
  ScrollTrigger,
  Physics2DPlugin,
} from "gsap/all";

gsap.registerPlugin(SplitText, ScrollSmoother, ScrollTrigger, Physics2DPlugin);

function App() {
  return (
    <div>
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
