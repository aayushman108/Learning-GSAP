import "./App.css";
import {
  ComplexTextAnimation,
  ComplexTextAnimationTwo,
  ScrollTriggerMain,
} from "./components";

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
