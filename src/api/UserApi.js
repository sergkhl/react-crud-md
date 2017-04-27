import delay from './delay';
import users from './mock-data/users.json';

// This file mocks Users web API

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (user) => {
  return replaceAll(user.firstName + '-' + user.lastName, ' ', '-');
};

class UserApi {
  static getAllUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], users));
      }, delay);
    });
  }

  static saveUser(user) {
    user = Object.assign({}, user); // keep passed in object immutable
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minUserNameLength = 3;
        if (user.firstName.length < minUserNameLength) {
          reject(`User name must be at least ${minUserNameLength} characters.`);
        }

        if (user.lastName.length < minUserNameLength) {
          reject(`User name must be at least ${minUserNameLength} characters.`);
        }

        if (user.id) {
          const existingUserIndex = users.findIndex(a => a.id === user.id);
          users.splice(existingUserIndex, 1, user);
        } else {
          //Simulating creation here.
          user.id = generateId(user);
          users.unshift(user);
        }

        resolve(user);
      }, delay);
    });
  }

  static deleteUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfUserToDelete = users.findIndex(user => user.id === userId);
        users.splice(indexOfUserToDelete, 1);
        resolve();
      }, delay);
    });
  }


  static getUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUserIndex = users.findIndex(user => user.id === userId);

        const userFound = Object.assign({}, users[existingUserIndex]);

        resolve(userFound);

      }, delay);
    });
  }

}

export default UserApi;
