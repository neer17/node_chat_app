const expect = require('expect');

const {generateMessage, generateLocationDetails} = require('./message')

describe('generateMessage method would be checked', () => {
    it('should generate a message object that has from and text keys', (done) => {
        
        var from = 'Neeraj';
        var message = 'Is the method working';
        var output = generateMessage(from, message);

        expect(output.from).toBe(from);
        expect(output.message).toBe(message);
        done();
    });
});

describe('generateLocationDetails', () => {
    it('should create a new location message containing from, latitude and longitude', () => {
        
        var locationMessage = generateLocationDetails('Admin', 30, 30);
        
        expect(locationMessage.from).toBe('Admin');
        expect(locationMessage).toBeTruthy();
        expect(locationMessage.url).toBeTruthy();
    });
});