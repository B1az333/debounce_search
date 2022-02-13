import request from '../../request.js';

global.fetch = jest.fn();

describe('request', () => {
    const END_POINT = 'https://api.github.com';
    const requestParam = { path: 'path' };

    const url = `${END_POINT}${requestParam.path}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Should be return "good result1": ', async () => {
        const expectedResult = 'good result1';
        fetch.mockResolvedValueOnce(
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(expectedResult)
            })
        );

        const result = await request(requestParam);

        expect(result).toBe(expectedResult);
        expect(fetch).toHaveBeenLastCalledWith(url, options);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('Should be return "good result2" with status: ', async () => {
        const expectedResult = {value: 'good result2', status: true};
        fetch.mockResolvedValueOnce(
            Promise.resolve({
                ok: false,
                status: true,
                json: () => Promise.resolve({value: 'good result2'})
            })
        );

        const result = await request(requestParam);

        expect(result).toStrictEqual(expectedResult);
        expect(fetch).toHaveBeenLastCalledWith(url, options);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('Should be return Error: ', () => {
        fetch.mockImplementationOnce(() => new Error('💣'));
        
        request(requestParam).catch((error) => {
            expect(error instanceof Error).toBeTruthy();
            expect(error.message).toBe('Invalid API');
        })
    });
});