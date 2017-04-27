import delay from './delay';
import groups from './mock-data/groups.json';

// This file mocks Group web API

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (group) => {
  return replaceAll(group.name, ' ', '-').toLowerCase();
};

class GroupApi {

  static getAllGroups() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], groups));
      }, delay);
    });
  }

  static saveGroup(group) {
    group = Object.assign({}, group); // keep passed in object immutable
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        /*const minGroupNameLength = 3;
        if (group.name.length < minGroupNameLength) {
          reject(`Group name must be at least ${minGroupNameLength} characters.`);
        }*/

        if (group.id) {
          const existingGroupIndex = groups.findIndex(a => a.id === group.id);
          groups.splice(existingGroupIndex, 1, group);
        } else {
          //Simulating creation here.
          group.id = generateId(group);
          groups.push(group);
        }

        resolve(group);
      }, delay);
    });
  }

  static deleteGroup(groupId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfGroupToDelete = groups.findIndex(group => group.id === groupId);
        groups.splice(indexOfGroupToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default GroupApi;
