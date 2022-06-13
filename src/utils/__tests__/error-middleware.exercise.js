import { UnauthorizedError } from 'express-jwt'
import errorMiddleware from '../error-middleware'


describe('Test of errorMiddleware function', () => {
    it('Should return 401 when UnauthorizedError happens', () => {
        const error = new UnauthorizedError('Error', {message: 'Some error message'})
        const req = { }
        const res = { json: jest.fn(() => res), status: jest.fn(() => res) }
        const next = jest.fn()
        errorMiddleware(error, req, res, next)
        expect(res.json).toHaveBeenCalledWith({ "code": "Error", "message": "Some error message" })
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(1)
    })

    it('Should pass middleware to next when headers already been sent', () => {
        const next = jest.fn()
        const req = { }
        const res = { headersSent: true }
        errorMiddleware(null, req, res, next)
        expect(next).toHaveBeenCalledTimes(1)
    })

    it('Should fall in fallback', () => {
        const error = {
            message: 'Internal server error',
            stack: new Error().stack
        }
        const req = { }
        const res = { headersSent: false, status: jest.fn(), json: jest.fn() }
        const next = jest.fn()
        errorMiddleware(error, req, res, next)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status).toHaveBeenCalledTimes(1)
    })
})
