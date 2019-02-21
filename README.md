# objection-table-name

## What To Solve

```js
class FooBar extends Model {
  static get tableName() {
    return `foo_bar`; // you type it on every model
  }
}
```

what about:

```js
class FooBar extends Model { }
console.log(FooBar.tableName);
// => foo_bar
```

## Installation

`$ npm install @xyluet/objection-table-name`

## Usage

```js
const { Model } = require(`objection`);
const { TableNamer } = require(`@xyluet/objection-table-name`);

// The common way is:
// - make this is as your base class

// BaseModel.js
class BaseModel extends TableNamer()(Model) { }

// TransactionDetail.js
class TransactionDetail extends BaseModel { }
console.log(TransactionDetail.tableName);
// => transaction_detail
```

You can define your own mapper

```js
function upperFirst([s, ...rest]) {
  return [s.toUpperCase(), ...rest].join(``);
}

class BaseModel extends TableNamer()(Model) {
  caseMapper: upperFirst,
}

class foo_Bar extends BaseModel { }
console.log(TransactionDetail.tableName);
// => Foo_Bar
```

[Lodash](https://lodash.com/docs/) provides some already defined caseMappers. You can use it too.

## License
MIT
