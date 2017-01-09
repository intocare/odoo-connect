'use strict';
const jayson = require('jayson');
const pify = require('pify');

module.exports = (connection, path, params) => {
	if (typeof path === 'object') {
		params = path;
		path = '/web/dataset/call_kw';
	}

	const client = jayson.client.http({
		host: connection.host,
		port: connection.port,
		path: path || '',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Cookie: `${connection.sid};`
		}
	});

	return pify(client.request.bind(client))('call', params || {});
};
