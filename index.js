const memoize = require('lodash/memoize');
const { plural } = require('pluralize');
const { snakeCase } = require('objection/lib/utils/identifierMapping');

const pluralSnakeMemoized = memoize(str => plural(snakeCase(str)));

/**
 * @param {Object} options:
 * @param {Function} options.caseMapper
 */
function tableNamer({
  caseMapper = pluralSnakeMemoized,
} = {}) {
  return Model => class extends Model {
    static get tableName() {
      return caseMapper(this.name);
    }
  };
}

module.exports = tableNamer;
