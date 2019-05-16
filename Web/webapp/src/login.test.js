import Login from './pages/SLogin';
import { shallow, configure } from 'enzyme';
import React, { Component } from 'react';
import Header from './elements/header';
import Learning from './loginedDashboard/containers/Learning';
import Gamemode from './loginedDashboard/components/gamemode';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Check token recived on login', () => {
  const wrapper = shallow(<Learning />);
  expect(wrapper.contains(<Gamemode />)).toEqual(false);
})