class User{
    constructor(){
         this.users = [];
    }

    generateUser(id, name, room){
        this.id = id;
        this.name = name;
        this.room = room;

        var user = {
            id: this.id,
            name: this.name,
            room: this.room
        }

        this.users.push(user);

        return user;
    }

    generateList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

    getUser(id){
        var user = this.users.filter((user) => user.id === id)[0];

        return user;
    }

    removeUser(id){
        var user = this.getUser(id);
        this.users = this.users.filter((user) => user.id !== id);

        return user;
    }

    
}

module.exports = {User}