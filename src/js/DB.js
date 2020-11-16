export default function DB() {
  const storageKey = "spellzyUser";
  const ls = localStorage;

  this.getUser = function () {
    const userList = [];
    if (ls.getItem(storageKey) === null) return userList;
    return JSON.parse(ls.getItem(storageKey));
  };

  this.saveUser = function (user) {
    if (!user)
      return console.error("We need a user to actually save please :)");

    const userList = this.getUser();
    userList.push(user);
    ls.setItem(storageKey, JSON.stringify(userList));

    return console.log(`${user.name} saved! :)`);
  };

  this.editUser = function (userObj) {
    const usersList = db.getUser();
    usersList.forEach(function(user, index){
        if(userObj.id === user.id) {
          usersList.splice(index, 1);
          usersList.push(userObj);
        }
    })
    ls.setItem(storageKey, JSON.stringify(usersList))
    return console.log(`${user.name} edited! :)`);
  };

  this.deleteUser = function (user) {};
}
