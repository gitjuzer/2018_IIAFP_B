import Login from './pages/SLogin';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Check token recived on login', () => {
  const login = shallow(<Login/>);
  Login.login();
  console.log("itt")
})


const sum = require('./sum');


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});