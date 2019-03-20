import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Login from 'src/auth/login/login';

configure({ adapter: new Adapter() });

describe('Login component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Login />);
    });

    it('should create component', () => {
        expect(wrapper).toBeDefined();
    });
});
