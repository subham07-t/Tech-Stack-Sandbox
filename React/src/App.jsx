import React from "react";
import {
  UseStateHook_1,
  UseStateHook_2,
  UseStateHook_3,
  UseStateHook_4,
} from "../components/useStateHook";
import { UseEffectHook_1, UseEffectHook_2 } from "../components/useEffectHook";
import UseEffectHook_3 from "../components/useEffectHook/UseEffectHook_3";
import Root from "../components/useContextHook/Root";
import ParentComponent from "../components/useCallbackHook/ParentComponent";
import FocusInput from "../components/useRefHook/FocusInput";
import HookTimer from "../components/useRefHook/HookTimer";

const App = () => {
  return (
    <div>
      {/* <UseStateHook_1 />s */}
      {/* <UseStateHook_2 /> */}
      {/* <UseStateHook_3 /> */}
      {/* <UseStateHook_4 /> */}
      {/* <UseEffectHook_1 /> */}
      {/* <UseEffectHook_2 /> */}
      {/* <UseEffectHook_3 /> */}
      {/* <Root /> */}
      {/* <ParentComponent /> */}
      {/* <FocusInput /> */}
      <HookTimer />
    </div>
  );
};

export default App;
