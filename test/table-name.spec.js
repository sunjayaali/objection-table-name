const { Model } = require('objection');
const TableNamer = require('../');

function getTableNameFromClass(cls) {
  return cls.tableName;
}

function upperFirst([c, ...rest]) {
  return [c.toUpperCase(), ...rest].join('');
}

function overrideClassName(cls, name) {
  Object.defineProperty(cls, 'name', { value: name });
}

describe('table name from class name', () => {
  describe('when using defaults', () => {
    it('should resolve \'tablename\' with snake_cased and plural', () => {
      class BaseModel extends TableNamer()(Model) { }
      const testClass = {
        Foo: 'foos',
        FooBar: 'foo_bars',
        fooBar: 'foo_bars',
        Person: 'people',
      };
      class TestModel extends BaseModel { }
      Object.entries(testClass).forEach(([className, tableName]) => {
        overrideClassName(TestModel, className);
        expect(getTableNameFromClass(TestModel)).toStrictEqual(tableName);
      });
    });
  });

  describe('when using customs', () => {
    it('should resolve \'tableName\'', () => {
      const mock = jest.fn(className => upperFirst(className));
      class BaseModel extends TableNamer({
        caseMapper: mock,
      })(Model) { }
      const testClass = {
        foo_bar: 'Foo_bar',
        fooBar: 'FooBar',
      };
      class TestModel extends BaseModel { }
      Object.entries(testClass).forEach(([className, tableName]) => {
        overrideClassName(TestModel, className);
        expect(getTableNameFromClass(TestModel)).toStrictEqual(tableName);
        expect(mock).toHaveBeenCalledWith(className);
      });
    });
  });
});
