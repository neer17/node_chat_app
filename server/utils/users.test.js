const expect = require('expect');

const {User} = require('./users');

describe('checking for the Person class', () => {

   
    var users;
    beforeEach(() => {
        users = new User();
        users.users = [{
            id: '1',
            name: 'Neeraj',
            room: 'Node'
        }, {
            id: '2',
            name: 'Parth',
            room: 'React'
        },{
            id: '3',
            name: 'Ritum',
            room: 'Node'
        }]
    });

    it('should check the users array in the Person class', () => {
        
        var  newUser = new User();

        var user = {
            id: 10,
            name: 'Neeraj',
            room: 'Group A'
        };

        var value = newUser.generateUser(10, 'Neeraj', 'Group A');

        expect(value).toEqual(user);
        expect(newUser.users).toEqual([value]);
    });

    it('should return names of persons in a particular room', () => {
        var namesArray = users.generateList('Node');

        expect(namesArray).toEqual(['Neeraj', 'Ritum']);
    });

    it('should delete a user from users array on the basis of id', () => {
        var user = users.removeUser('1');

        expect(user).toEqual({id: '1', name: 'Neeraj', room: 'Node'});
    });
});