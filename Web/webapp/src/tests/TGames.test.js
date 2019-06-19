import Games from "../LoginedTeacherDash/containers/Games.js";
import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("Test conponent successfully appearing", () => {
  let instance = shallow(<Games />).instance();
  // instance.createGameSession();
  expect(instance.exists()).toBe(true);
});

//getDataFromServer

test("Test function successfully fetching data from server", () => {
  let instance = shallow(<Games />).instance();
  instance.getDataFromServer();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    "https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession"
  );
  console.log(instance.state.response);
});

test("Test server returning data", () => {
  let instance = shallow(<Games />).instance();
  //returns with json
  instance.getDataFromServer();
  expect(instance.state.games).not.toEqual(null);
  console.log(instance.state.games);
});

//createGameSession

test("Test function successfully fetching data from server", () => {
  let instance = shallow(<Games />).instance();
  instance.createGameSession();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    "https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession"
  );
  console.log(instance.state.response);
});

//updateGameSession

test("Test function successfully fetching data from server", () => {
  let instance = shallow(<Games />).instance();
  instance.updateGameSession();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    "https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession"
  );
  console.log(instance.state.response);
});

//deleteGameSession

test("Test function successfully fetching data from server", () => {
  let instance = shallow(<Games />).instance();
  instance.deleteGameSession();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    "https://oktatoappapi.herokuapp.com/OktatoAppAPI/gamesession"
  );
  console.log(instance.state.response);
});
