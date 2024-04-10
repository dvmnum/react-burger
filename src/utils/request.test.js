import { checkReponse } from "./request";


describe('checkReponse', () => {
    test('should return success', () => {

        const testRes = {
            ok: true,
            json: () => ({ result: 'OK' })
        }

        const result = checkReponse(testRes)
        expect(result).toEqual({ result: 'OK' })
    })

    test('should return fail', () => {

        const testRes = {
            ok: false,
            json: () => ({ result: 'OK' }),
            status: '400'
        }

        const result = checkReponse(testRes)
        return expect(result).rejects.toBe('Ошибка: 400')

    })
})