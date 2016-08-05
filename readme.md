# odoo-connect [![Build Status](https://travis-ci.org/pridiktiv/odoo-connect.svg?branch=master)](https://travis-ci.org/pridiktiv/odoo-connect)

> [Odoo](https://www.odoo.com) JSON-RPC client


## Install

```
$ npm install --save odoo-connect
```


## Usage

```js
const Odoo = require('odoo-connect');

const odoo = new Odoo({
	host: 'foobar.com',
	port: 9999
});

odoo
	.connect({
		database: 'unicorn',
		username: 'foo',
		password: 'bar'
	})
	.then(client => {
		return client.searchRead('product.product', [['list_price', '>', '50']], {limit: 1});
	})
	.then(products => {
		console.log(products);
		//=> [{list_price: 52, name: 'Unicorn'}]
	});
```


## API

### Odoo(options)

#### options

Any of the [connect](#odooconnectoptions) options and the following options.

##### host

Type: `string`

Host of the Odoo server.

##### port

Type: `number`<br>
Default: `80`

Port of the Odoo service.

### odoo.connect([options])

Returns a `Promise` for a [client](#client) object.

#### options

##### database

Type: `string`

Name of the database.

##### username

Type: `string`

Username to connect with.

##### password

Type: `string`

Password to connect with.

### Client

### client.search(model, args)

#### model

Type: `string`

Model to perform the action on.

#### args

Type: `Array`

List of parameters.

### client.searchRead(model, args, [params])

#### model

Type: `string`

Model to perform the action on.

#### args

Type: `Array`

List of parameters.

#### params

##### offset

Type: `number`<br>
Default: `0`

Result offset.

##### limit

Type: `number`<br>
Default: `5`

Maximum number of results.

##### order

Type: `string`<br>
Default: `id`

Name of the fields used to sort the results.

##### select

Type: `string[]`

Fields that should be selected.

### client.create(model, args)

#### model

Type: `string`

Model to perform the action on.

#### args

Type: `Array`

List of parameters.

### client.call(model, method, args, [params])

#### model

Type: `string`

Model to perform the action on.

#### method

Type: `string`

Odoo RPC method.

#### args

Type: `Array`

List of parameters.

#### params

Type: `Object`

Custom `kwargs` properties.


## License

MIT © [Pridiktiv](http://pridiktiv.care)
