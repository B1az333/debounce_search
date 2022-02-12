import debounce from '../../debounce.js';
 
describe('debounce', () => {
    jest.spyOn(window, 'setTimeout');
    jest.spyOn(window, 'clearTimeout');

    test('debounce should be return function: ', done => {
        const someData = 'data';

        const fnDebounce = debounce(callback, 5);
        fnDebounce(someData);

        function callback(data) {
            expect(data).toBe(someData);
            expect(typeof fnDebounce).toBe('function');
            expect(setTimeout).toHaveBeenCalled();
            expect(clearTimeout).toHaveBeenCalled();
            done();
        }
     });
})