import Login from '../pages/SLogin';
import { shallow, configure } from 'enzyme';
import React  from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Tests token after login with incorrect data', () => {
    let instance =  shallow(<Login />).instance();
    instance.login();
    expect(instance.state.token).toBeNull();
})

test('Tests token after login with correct data', () => {
    let instance =  shallow(<Login />).instance();
    instance.setState({username: "upsi",  password: "1234", accountType: "STUDENT"});
    instance.login();
    console.log(instance.state.accountType);
    expect(instance.state.token).not.toEqual(null);
    console.log(instance.state.token);
  })