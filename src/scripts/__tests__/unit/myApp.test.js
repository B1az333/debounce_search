import myApp from '../../myApp.js';
import {loadUser} from '../../loadUserActions.js';
import debounce from '../../debounce.js';

jest.mock('../../loadUserActions.js', () => ({
    loadUser: jest.fn(() => 'good')
}));

jest.mock('../../debounce.js', () => jest.fn((fn) => (e) => fn(e)));

describe('myApp', () => {
    const div = document.createElement('div');
    document.querySelector = jest.fn(() => div);

    test('myApp should be call need functions: ', () => {
        const result = myApp();

        const event = new Event('keyup');
        div.dispatchEvent(event)

        expect(result).toBeUndefined();
        expect(document.querySelector).toHaveBeenNthCalledWith(1, '.search__input');
        expect(document.querySelector).toHaveBeenCalledTimes(1);
        expect(debounce).toHaveBeenCalledTimes(1);
        expect(loadUser).toHaveBeenCalledTimes(1);
    });
})