// import imgCrystalBall from '../../../assets/images/crystal-ball.png';

// console.log(imgCrystalBall);

jest.mock('../../../assets/images/crystal-ball.png')

// jest.mock('../../loadUserActions.js', () => ({
//     clearUser: jest.fn()
// }));
// const imgCrystalBall = '';

describe('createErrorBlock', () => {
    const status = 404;
    const expectedString = `
    <div class="user">
      <figure class="user__image">
        <img src="${imgCrystalBall}" alt="img">
        <figcaption class="user__name">🔮${status}🔮</figcaption>
      </figure>
    </div>
    `;

    test('Should be return right string: ', () => {
        // const result = createErrorBlock(status);
        // expect(result).toBe(expectedString);
    });
});
