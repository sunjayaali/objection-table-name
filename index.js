const snakeCase = require(`lodash.snakecase`);

/**
 * @param {Object} options:
 * @param {Function} options.caseMapper
 */
function tableNamer({
  caseMapper = snakeCase,
} = {}) {
  return Model => class extends Model {
    static get tableName() {
      return caseMapper(this.name);
    }
  };
}

module.exports = tableNamer;
