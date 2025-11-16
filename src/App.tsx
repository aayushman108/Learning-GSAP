import gsap from "gsap";
import "./App.css";
import {
  ComplexTextAnimation,
  ComplexTextAnimationTwo,
  ScrollTriggerMain,
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
    </div>
  );
}

export default App;
