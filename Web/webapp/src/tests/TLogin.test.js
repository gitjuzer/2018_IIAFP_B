import Login from '../pages/TLogin';
import { shallow, configure } from 'enzyme';
import React  from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Teszt sikertelen bejelentkezés után', () => {
    let instance =  shallow(<Login />).instance();
    instance.login();
    expect(instance.state.token).toBeNull();
})

test('Teszt mikor a felhasználó Tanár és a felhasználónév és a jelszó jó', () => {
    let instance =  shallow(<Login />).instance();
    instance.setState({username: "teszt",  password: "teszt", accountType: "TEACHER"});
    instance.login();
    console.log(instance.state.accountType);
    expect(instance.state.token).not.toEqual(null);
    console.log(instance.state.token);
  })

  test('Teszt mikor a felhasználó undefined', () => {
    let instance =  shallow(<Login />).instance();
    instance.setState({username: "teszt",  password: "teszt", accountType: "UNDEFINED"});
    instance.login();
    console.log(instance.state.accountType);
    expect(instance.state.token).not.toEqual(null);
    console.log(instance.state.token);
  })