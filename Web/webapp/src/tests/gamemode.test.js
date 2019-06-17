import { shallow, configure } from 'enzyme';
import React from 'react';
import Learning from '../loginedDashboard/containers/Learning';
import Gamemode from '../loginedDashboard/components/gamemode';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Test gamemmode', () => {
  const wrapper = shallow(<Learning />);
  expect(wrapper.contains(<Gamemode />)).toEqual(false);
})