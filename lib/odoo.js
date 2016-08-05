'use strict';
const got = require('got');
const OdooClient = require('./client');

class Odoo {

	constructor(config) {
		config = config || {};

		if (typeof config.host !== 'string') {
			throw new TypeError(`Expected \`host\` to be a \`string\`, got \`${typeof config.host}\``);
		}

		this._config = Object.assign({
			port: 80
		}, config);
	}

	connect(opts) {
		const config = Object.assign({}, this._config, opts);

		const params = {
			db: config.database,
			login: config.username,
			password: config.password
		};

		// Throw them away
		delete config.database;
		delete config.username;
		delete config.password;

		const body = JSON.stringify({params});

		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

		return got.post(`${config.host}:${config.port}/web/session/authenticate`, {json: true, headers, body})
			.then(res => new OdooClient(res.body.result, {
				host: config.host,
				port: config.port,
				sid: res.headers['set-cookie'][0].split(';')[0]
			}));
	}
}

module.exports = Odoo;
