import Statics from "../LoginedTeacherDash/containers/Statics.js";
import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

//Conponent exists

test("Test conponent successfully appearing", () => {
  let instance = shallow(<Statics />).instance();
  expect(instance.exists()).toBe(true);
});

//getDataFromServer

test("Test function successfully fetching data from server", () => {
  let instance = shallow(<Statics />).instance();
  instance.getDataFromServer();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    "https://oktatoappapi.herokuapp.com/OktatoAppAPI/statistics"
  );
  console.log(instance.state.response);
});
