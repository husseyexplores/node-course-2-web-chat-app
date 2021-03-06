class Users {
   constructor () {
      this.allUsers = [];
   }

   addUser (id, name, room) {
      var newUser = {id, name, room};

      this.allUsers.push(newUser);
      return newUser;
   }
   removeUser (id) {
      var user = this.getUser(id)

      if (user) {
         this.allUsers = this.allUsers.filter(user => user.id !== id)
      }
      return user;
   }
   getUser (id) {
      return this.allUsers.filter((user) => user.id === id)[0];
   }
   getUserList (room) {
      var roomUsers = this.allUsers.filter((user) => user.room === room);
      var namesArray = roomUsers.map((user) => user.name );
      return namesArray;
   }
}

module.exports = {Users};