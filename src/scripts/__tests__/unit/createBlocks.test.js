import imgCrystalBall from '../../../assets/images/crystal-ball.png';
import {
    createErrorBlock,
    createUserBlock,
    createRepositoriesBlock,
    createFollowersBlock,
} from '../../createBlocks.js';

jest.mock('../../../assets/images/crystal-ball.png', () => 'img');

describe('createBlocks', () => {
    const falseArray = {};
    const arrayObj = [
        {
            html_url: 'html1',
            name: 'name1',
            login: 'name1',
        },
        {
            html_url: 'html2',
            name: 'name2',
            login: 'name2',
        },
    ];

    describe('createErrorBlock', () => {
        const status = 404;
        const expectedString = `
    <div class="user">
        <figure class="user__image">
            <img src="${imgCrystalBall}" alt="img">
            <figcaption class="user__name">🔮${status}🔮</figcaption>
        </figure>
    </div>`;

        test('Should be return right string: ', () => {
            const result = createErrorBlock(status);
            expect(result).toBe(expectedString);
        });
    });

    describe('createRepositoriesBlock', () => {
        const expectedString = `
    <div class="user__repos">
        <div class="title title__repo">Repositories (${arrayObj.length})</div>
        <div class="user__link-container">
            <a target="_blank" href="${arrayObj[0].html_url}">${arrayObj[0].login}</a><a target="_blank" href="${arrayObj[1].html_url}">${arrayObj[1].login}</a>
        </div>
    </div>
    `;
        test('Should be return right string: ', () => {
            const result = createRepositoriesBlock(arrayObj);
            expect(result).toBe(expectedString);
        });

        test('Should be TypeError: ', () => {
            expect(() => createRepositoriesBlock(falseArray)).toThrow(TypeError);
            expect(() => createRepositoriesBlock(falseArray)).toThrow('An array is expected in the parameter ');
        });
    });

    describe('createFollowersBlock', () => {
        const expectedString = `
    <div class="user__link">
        <div class="title title__folowers">Followers (${arrayObj.length})</div>
        <div class="user__link-container">
            <a target="_blank" href="${arrayObj[0].html_url}">${arrayObj[0].login}</a><a target="_blank" href="${arrayObj[1].html_url}">${arrayObj[1].login}</a>
        </div>
    </div>
    `;
        test('Should be return right string: ', () => {
            const result = createFollowersBlock(arrayObj);
            expect(result).toBe(expectedString);
        });

        test('Should be TypeError: ', () => {
            expect(() => createFollowersBlock(falseArray)).toThrow(TypeError);
            expect(() => createFollowersBlock(falseArray)).toThrow('An array is expected in the parameter ');
        });
    });

    describe('createUserBlock', () => {
        const params = {
            name: '', 
            photo: '', 
            repositories: arrayObj,
            followers: arrayObj
        };

        const repositories = createRepositoriesBlock(params.repositories);
        const followers = createFollowersBlock(params.followers);

        const expectedString = `
    <div class="user">
        <figure class="user__image"><img src="${params.photo}}" alt="img">
        <figcaption class="user__name">${params.name}</figcaption>
        </figure>
        ${repositories}
        ${followers}
    </div>
    `;

        test('Should be return right string: ', () => {
            const result = createUserBlock(params);
            expect(result).toBe(expectedString);
        });
    });
});
