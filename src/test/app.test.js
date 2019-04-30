import React from 'react';
import {shallow} from 'enzyme';
import Profile from '../profile'

const wrapper = shallow(<Profile />)

test('app tests.. ', () => {
    expect(wrapper.find('profile-area')).toBe(1)
})