import {loadUser, loadUserRepositories, loadUserFollowers } from '../../loadUserActions.js';
import request from '../../request.js';
import updateUser from '../../updateUser.js';
import clearUser from '../../clearUser.js';

jest.mock('../../request.js', () => jest.fn());
jest.mock('../../updateUser.js', () => jest.fn());
jest.mock('../../clearUser.js', () => jest.fn());


describe('loadUserActions', () => {
    const name = 'marina57678';

    describe('loadUser', () => {
        const user = {};

        beforeEach(() => {
            jest.clearAllMocks();
            request.mockReturnValue(user);
        })

        test('Should be call clearUser: ', async () => {
            const emptyName = '';
            const result = await loadUser(emptyName);

            expect(result).toBeUndefined();
            expect(clearUser).toHaveBeenCalledTimes(1);
        });

        test('Should be tаке request and call updateUser: ', async () => {
            const reqParam = { path: `/users/${name}` };
            const result = await loadUser('marina57678');
            
            expect(result).toBeUndefined();
            
            expect(request).toHaveBeenNthCalledWith(1, reqParam);
            expect(request).toHaveBeenCalledTimes(1);

            expect(updateUser).toHaveBeenNthCalledWith(1, user);
            expect(updateUser).toHaveBeenCalledTimes(1);
        });
    })

    describe('loadUserRepositories & loadUserFollowers', () => {
        const array = []; 
        
        beforeEach(() => {
            jest.clearAllMocks();
            request.mockReturnValue(array);
        })

        test('loadUserRepositories should be return array: ', async () => {
            const reqParam = { path: `/users/${name}/repos` };
            const result = await loadUserRepositories(name);

            expect(result).toBe(array);
            expect(request).toHaveBeenNthCalledWith(1, reqParam);
            expect(request).toHaveBeenCalledTimes(1);
        });

        test('loadUserFollowers should be return array: ', async () => {
            const reqParam = { path: `/users/${name}/followers` };
            const result = await loadUserFollowers(name);

            expect(result).toBe(array);
            expect(request).toHaveBeenNthCalledWith(1, reqParam);
            expect(request).toHaveBeenCalledTimes(1);
        });   
    })
})