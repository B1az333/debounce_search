import {loadUser, loadUserRepositories, loadUserFollowers, clearUser} from '../../loadUserActions.js';
import request from '../../request.js';
import updateUser from '../../updateUser.js';

jest.mock('../../request.js', () => jest.fn());
jest.mock('../../updateUser.js', () => jest.fn());

jest.mock('../../updateUser.js');
// jest.mock('../../loadUserActions.js', () => ({
//     clearUser: jest.fn()
// }));

describe('loadUserActions', () => {
    // beforeEach(() => {    
    //     jest.clearAllMocks();
    //   });

    describe('Checking function "loadUser"', () => {
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

    describe('Checking function "loadUserRepositories"', () => {
        const array = []; 
        const name = 'Example';
        const requestParametr = { path: `/users/${name}/repos` };

        request.mockReturnValueOnce(array);

        test('Should be return array: ', async () => {
            const result = await loadUserRepositories(name);
            expect(result).toBe(array);
        });

        test('Should be done request with parameter: ', () => {
            expect(request).toHaveBeenNthCalledWith(1, requestParametr);
            expect(request).toHaveBeenCalledTimes(1);
         });
    })

    // describe('Checking function "loadUserRepositories"', () => {
    //     const array = []; 
    //     const name = 'Example';
    //     const requestParametr = { path: `/users/${name}/repos` };

    //     request.mockReturnValueOnce(array);

    //     test('Should be return array: ', async () => {
    //         const result = await loadUserRepositories(name);
    //         expect(result).toBe(array);
    //     });

    //     test('Should be done request with parameter: ', () => {
    //         expect(request).toHaveBeenNthCalledWith(1, requestParametr);
    //         expect(request).toHaveBeenCalledTimes(1);
    //      });
    // })

    // describe('Checking function "loadUserFollowers"', () => {
    //     jest.resetAllMocks();

    //     const array = []; 
    //     const name = 'Example';
    //     const requestParametr = { path: `/users/${name}/followers` };

    //     request.mockReturnValueOnce(array);

    //     test('Should be return array: ', async () => {
    //         const result = await loadUserFollowers(name);
    //         expect(result).toBe(array);
    //     });

    //     test('Should be done request with parameter: ', () => {
    //         // expect(request).toHaveBeenNthCalledWith(1, requestParametr);
    //         expect(request).toHaveBeenCalledTimes(1);
    //      });
    // })

    describe('Checking function "clearUser"', () => {
        
    })
})


