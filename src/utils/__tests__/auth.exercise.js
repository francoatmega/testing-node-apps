import { isPasswordAllowed } from '../auth'

describe('Tests of is isPasswordAllowed', () => {
    it('Should be a valid password.', () => {
        const return1 = isPasswordAllowed('!aBc123');
        expect(return1).toBeTruthy()
    })
    
    it('Should be a invalid password because of length minor than six.', () => {
        const return1 = isPasswordAllowed('a2c!');
        expect(return1).toBeFalsy()
    })
    
    it('Should be a invalid password because has not letter.', () => {
        const return1 = isPasswordAllowed('123456!');
        expect(return1).toBeFalsy()
    })
    
    it('Should be a invalid password because has no digit in it.', () => {
        const return1 = isPasswordAllowed('ABCdef!');
        expect(return1).toBeFalsy()
    })
    
    it('Should be a invalid password because has no capital letter in it.', () => {
        const return1 = isPasswordAllowed('abc123!');
        expect(return1).toBeFalsy()
    })
    
    it('Should be a invalid password because has no lowercase letter in it.', () => {
        const return1 = isPasswordAllowed('ABC123!');
        expect(return1).toBeFalsy()
    })
    
    it('Should be a invalid password because has no symbol in it.', () => {
        const return1 = isPasswordAllowed('ABCdef123');
        expect(return1).toBeFalsy()
    })    
})
