'use strict';
const request = require('./request');
const response = require('./response');

class OdooClient {

	constructor(connection, opts) {
		this._connection = connection;
		this._opts = opts;
	}

	search(model, args) {
		return this.call(model, 'create', [args]);
	}

	searchRead(model, args, params) {
		params = params || {};
		return this.call(model, 'search_read', [args], {
			offset: params.offset || 0,
			limit: params.limit || 5,
			order: params.order,
			fields: params.select
		});
	}

	create(model, args) {
		return this.call(model, 'create', [args]);
	}

	write(model, id, args) {
		return this.call(model, 'write', [[id], args]);
	}

	call(model, method, args, params) {
		if (!Array.isArray(args)) {
			args = [args];
		}
		const body = {
			model,
			method,
			args,
			kwargs: Object.assign({
				context: this._connection.user_context
			}, params)
		};

		return request(this._opts, body).then(response.parse);
	}
}

module.exports = OdooClient;
