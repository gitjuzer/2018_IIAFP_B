import Register from '../pages/SRegister';
import { shallow, configure } from 'enzyme';
import React  from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Tests registration with inCorrect data', () => {
    let instance =  shallow(<Register />).instance();
    instance.register();
    expect(instance.state.sucessful).toBeNull();
})

test('Tests registration with correct data', () => {
    let instance =  shallow(<Register />).instance();
    instance.setState({
        "username": "fake",
        "email": "youareFakenews@gmail.com",
        "password": "howIamSupposedToRememberThis",
        "first_name": "ItsAme",
        "last_name": "Mario",
        "account_type": "STUDENT"
    });
    instance.register();
    console.log(instance.state.sucessful);
    expect(instance.state.sucessful).not.toEqual(false);
  })
