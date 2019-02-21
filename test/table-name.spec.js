const tableNamer = require(`../`);
const { Model } = require(`objection`);

function getTableNameFromClass(cls) {
  return cls.tableName;
}

function upperFirst([c, ...rest]) {
  return [c.toUpperCase(), ...rest].join(``);
}

function overrideClassName(cls, name) {
  Object.defineProperty(cls, `name`, { value: name });
}

describe(`table name from class name`, () => {
  describe(`when using defaults`, () => {
    it(`should resolve 'tablename' with snake_cased`, () => {
      class BaseModel extends tableNamer()(Model) { }
      const testClass = {
        Foo: `foo`,
        FooBar: `foo_bar`,
        fooBar: `foo_bar`,
        _fooBar: `foo_bar`,
        _fooBar_: `foo_bar`,
      };
      class TestModel extends BaseModel { }
      Object.entries(testClass).forEach(([className, tableName]) => {
        overrideClassName(TestModel, className);
        expect(getTableNameFromClass(TestModel)).toStrictEqual(tableName);
      });
    });
  });

  describe(`when using customs`, () => {
    it(`should resolve 'tableName'`, () => {
      const mock = jest.fn(className => upperFirst(className));
      class BaseModel extends tableNamer({
        caseMapper: mock,
      })(Model) { }
      const testClass = {
        foo_bar: `Foo_bar`,
        fooBar: `FooBar`,
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
