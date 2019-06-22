import { shallow, configure } from 'enzyme';
import React from 'react';
import Learning from '../loginedDashboard/containers/Learning';
import Gamemode from '../loginedDashboard/components/gamemode';
import Gamesession from '../loginedDashboard/components/gamesession';
import Dropdown from '../loginedDashboard/components/dropdown';
import QandA from '../loginedDashboard/games/QandA';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Test gamemmode', () => {
  const wrapper = shallow(<Learning />);
  expect(wrapper.contains(<Gamemode />)).toEqual(false);
})

test('Test gamemmode2', () => {
  const wrapper = shallow(<Learning />);
  expect(wrapper.contains(<Dropdown />)).toEqual(false);
})

test('Test gamemmode3', () => {
  const wrapper = shallow(<Learning />);
  expect(wrapper.contains(<QandA />)).toEqual(false);
})