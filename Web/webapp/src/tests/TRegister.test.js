import Register from '../pages/SRegister';
import { shallow, configure } from 'enzyme';
import React  from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Olyan adatokkal való regisztráció amely az adatbázis nem tud elfogadni', () => {
    let instance =  shallow(<Register />).instance();
    instance.register();
    expect(instance.state.sucessful).toBeNull();
})

test('Olyan adatokkal való regisztráció amely az adatbázis el tud fogadni', () => {
    let instance =  shallow(<Register />).instance();
    instance.setState({
        "username": "mekater",
        "email": "makenameter@gmail.com",
        "password": "Metaker",
        "first_name": "Meka",
        "last_name": "Mater",
        "account_type": "TEACHER"
    });
    instance.register();
    console.log(instance.state.sucessful);
    expect(instance.state.sucessful).not.toEqual(false);
  })

  test('Valós adatokkal való tesztelés (regisztráció) UNDEFINED account type', () => {
    let instance =  shallow(<Register />).instance();
    instance.setState({
        "username": "mekater",
        "email": "makenameter@gmail.com",
        "password": "Metaker",
        "first_name": "Meka",
        "last_name": "Mater",
        "account_type": ""
    });
    instance.register();
    console.log(instance.state.sucessful);
    expect(instance.state.sucessful).not.toEqual(true);
  })
