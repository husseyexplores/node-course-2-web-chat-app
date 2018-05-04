const expect = require('expect');

const {Users} = require('./users');

describe('Users Class', () => {
   var users;
   beforeEach(() => {
      users = new Users();
      users.allUsers.push({
         id: 1,
         name:'Hussey',
         room: 'Cats'
      },{
         id: 2,
         name:'Andrew',
         room: 'NodeJS'
      },{
         id: 3,
         name:'Hassan',
         room: 'Cats'
      });
   });

   it('should add new user', () => {
      const users = new Users();

      const user = {id: 123, name: 'Hussey', room: 'Cats'}
      const resUser =  users.addUser(user.id, user.name, user.room);
      expect(users.allUsers).toMatchObject([user]);

   });

   it('should remove a user', () => {
      var userID = 1;
      var user = users.removeUser(userID);
      console.log(users.allUsers)
      expect(user.id).toBe(userID);
      expect(users.allUsers.length).toBe(2);
   });

   it('should not remove a user', () => {
      var userID = 4;
      var user = users.removeUser(userID);

      expect(user).toBeFalsy();
      expect(users.allUsers.length).toBe(3);
   });

   it('should find a user', () => {
      var userID = 1;
      var user = users.getUser(userID);
      expect(user.id).toBe(userID);
   });

   it('should not find a user', () => {
      var userID = 4;
      var user = users.getUser(userID);
      expect(user).toBeFalsy();
   });

   it('should return names for Cats (Room)', () => {
      var userList = users.getUserList('Cats');

      expect(userList).toEqual(['Hussey', 'Hassan']);
   }); 

   it('should return names for NodeJS (Room)', () => {
      var userList = users.getUserList('NodeJS');

      expect(userList).toEqual(['Andrew']);
   });  
});