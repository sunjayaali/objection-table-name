const tableName = require("./index")();
const { Model } = require(`objection`);

class UserBangke extends tableName(Model) {

}

console.log(UserBangke.tableName);
