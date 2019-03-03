const memoize = require('lodash/memoize');
const { plural } = require('pluralize');
const { snakeCase } = require('objection/lib/utils/identifierMapping');

/**
 * @param {Object} options:
 * @param {Function} options.caseMapper
 */
function tableNamer({
  caseMapper = snakeCase,
} = {}) {
  const mapper = memoize(str => plural(caseMapper(str)));

  return Model => class extends Model {
    static get tableName() {
      return mapper(this.name);
    }
  };
}

module.exports = tableNamer;
