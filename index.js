const snakeCase = require(`lodash.snakecase`);

module.exports = ({
  caseMapper = snakeCase
} = {}) => {
  return (Model) => {
    return class extends Model {
      static get tableName() {
        return caseMapper(this.name);
      }
    };
  };
}
