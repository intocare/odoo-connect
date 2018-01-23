'use strict';
const jayson = require('jayson');
const pify = require('pify');

module.exports = (connection, path, params) => {
	if (typeof path === 'object') {
		params = path;
		path = '/web/dataset/call_kw';
	}

	const config = {
		host: connection.host,
		port: connection.port,
		path: path || '',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Cookie: `session_id=${connection.sid};`
		}
	};

	const client = connection.protocol === 'https' ? jayson.client.https(config) : jayson.client.http(config);

	return pify(client.request.bind(client))('call', params || {});
};
