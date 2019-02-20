const tableName = require(`../`);
const { Model } = require(`objection`);

describe(`table name from class name`, () => {
  describe(`when defaults`, () => {
    let tableNamer;

    beforeAll(() => {
      tableNamer = tableName();
    });

    it(`should resolve 'tableName' with snake_cased`, () => {
      class Foo extends tableNamer(Model) { }
      class FooBar extends tableNamer(Model) { }
      class fooBar extends tableNamer(Model) { }
      class _fooBar extends tableNamer(Model) { }
      class _fooBar_ extends tableNamer(Model) { }
      expect(Foo.tableName).toStrictEqual(`foo`);
      expect(FooBar.tableName).toStrictEqual(`foo_bar`);
      expect(fooBar.tableName).toStrictEqual(`foo_bar`);
      expect(_fooBar.tableName).toStrictEqual(`foo_bar`);
      expect(_fooBar_.tableName).toStrictEqual(`foo_bar`);
    });
  });

  describe(`when customs`, () => {
    let tableNamer;

    beforeAll(() => {
      tableNamer = tableName();
    });
  });
});
