import clearUser from '../../clearUser.js'

describe('clearUser', () => {
    const userBlock = document.createElement('div');
    userBlock.innerHTML = 'Some text';

    document.querySelector = jest.fn(() => userBlock);

    const result = clearUser();

    test('Should be return undefined: ', () => {
        expect(result).toBeUndefined();
    });

    test('Should be called "querySelector" with parameter ".user": ', () => {
        expect(document.querySelector).toHaveBeenNthCalledWith(1, '.user');
        expect(document.querySelector).toHaveBeenCalledTimes(1);
    });

    test('Should clear the contents of the block: ', () => {
        expect(userBlock.innerHTML).toBe('');
    });
})