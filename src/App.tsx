import "./App.css";
import {
  ComplexTextAnimation,
  ComplexTextAnimationTwo,
  Physics2D,
  PhysicsText,
  ScrollTriggerDemo,
} from "./components";

function App() {
  return (
    <div>
      <ComplexTextAnimation />
      <ComplexTextAnimationTwo />
      {/* <TextSplitting /> */}
      <Physics2D />
      <PhysicsText />
      <ScrollTriggerDemo />
    </div>
  );
}

export default App;
