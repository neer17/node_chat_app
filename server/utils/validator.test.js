const expect = require('expect');

const {isRealString} = require('./validator');

describe('Validation on name and room', () => {
    it('should validate name type', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should check the name ', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });
});