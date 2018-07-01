const expect = require('expect');

const {generateMessage} = require('./message')

describe('generateMessage method would be checked', () => {
    it('should generate a message object that has from and text keys', () => {
        
        var message = generateMessage('Neeraj', 'Is the method working');

        var from = 'Neeraj';
        var text = 'Is the method working';

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
    });
});