import { createErrorBlock, createUserBlock } from '../../createBlocks.js';
import { loadUserRepositories, loadUserFollowers} from '../../loadUserActions.js';
import updateUser from '../../updateUser.js';

jest.mock('../../createBlocks.js', () => ({
    createErrorBlock: jest.fn(() => 'createErrorBlock'),
    createUserBlock: jest.fn(() => 'createUserBlock')
}));

jest.mock('../../loadUserActions.js', () => ({
    loadUserRepositories: jest.fn(),
    loadUserFollowers: jest.fn()
}));

window.open = jest.fn();

describe('updateUser', () => {
    let div = document.createElement('div');
    let parentDiv = document.createElement('div');

    beforeEach(() => {
        div = document.createElement('div');
        parentDiv = document.createElement('div');
        parentDiv.append(div);

        document.querySelector = jest.fn(() => div);
        jest.clearAllMocks();
    })
        
    test('Should be called "createErrorBlock" and "insertAdjacentHTML" in logic if', async () => {
        const notFoundUser = {
            message: true,
            status: 404
        }

        const result = await updateUser(notFoundUser);

        expect(result).toBeUndefined();
        expect(parentDiv.innerHTML).toBe('createErrorBlock');
        expect(createErrorBlock).toHaveBeenNthCalledWith(1, notFoundUser.status);
        expect(createErrorBlock).toHaveBeenCalledTimes(1);
        expect(document.querySelector).toHaveBeenNthCalledWith(1, '.user');
        expect(document.querySelector).toHaveBeenCalledTimes(1);
    });

    test('Should be called ignore first if and working normal', async () => {
        const foundUser = {
            login: 'login',
            avatar_url: 'photo',
            html_url: 'url',
            message: false
        }

        loadUserRepositories.mockResolvedValue('loadUserRepositories');
        loadUserFollowers.mockResolvedValue('loadUserRepositories');

        const result = await updateUser(foundUser);

        expect(result).toBeUndefined();
        expect(parentDiv.innerHTML).toBe('createUserBlock');
        expect(loadUserRepositories).toHaveBeenNthCalledWith(1, foundUser.login);
        expect(loadUserFollowers).toHaveBeenNthCalledWith(1, foundUser.login);
        expect(createUserBlock).toHaveBeenCalledTimes(1);

        const event = new Event('click');
        div.dispatchEvent(event);
        expect(window.open).toHaveBeenNthCalledWith(1, foundUser.html_url, '_blank');
    });
})