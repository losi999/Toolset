import { shallow } from 'enzyme';
import React from 'react';
import App from 'src/components/app/app';

describe('App component', () => {
    it('should create component', () => {
        const wrapper: any = shallow(<App />);
        expect(wrapper).toBeDefined();
    });
});
