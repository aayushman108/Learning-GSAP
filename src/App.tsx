import "./App.css";
import {
  ComplexTextAnimation,
  ComplexTextAnimationTwo,
  Physics2D,
  PhysicsText,
} from "./components";

function App() {
  return (
    <div>
      <ComplexTextAnimation />
      <ComplexTextAnimationTwo />
      {/* <TextSplitting /> */}
      <Physics2D />
      <PhysicsText />
    </div>
  );
}

export default App;
