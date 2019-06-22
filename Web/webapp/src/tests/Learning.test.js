import Statics from "../LoginedTeacherDash/containers/Statics.js";
import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Learning from '../loginedDashboard/containers/Learning';

//Conponent exists

test("Test conponent successfully appearing", () => {
    let instance = shallow(<Learning />).instance();
    expect(instance.exists()).toBe(true);
  });
  