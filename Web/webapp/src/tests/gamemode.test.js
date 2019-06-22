import { shallow, configure } from 'enzyme';
import React from 'react';
import Learning from '../loginedDashboard/containers/Learning';
import Gamemode from '../loginedDashboard/components/gamemode';
import Dropdown from '../loginedDashboard/components/dropdown';
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