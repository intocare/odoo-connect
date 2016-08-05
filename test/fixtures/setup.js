/* eslint-disable camelcase */
'use strict';
const got = require('got');
const sinon = require('sinon');
require('sinon-as-promised');

module.exports = test => {
	test.before(() => {
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};

		const body = {
			params: {
				db: 'foo',
				login: 'bar',
				password: 'baz'
			}
		};

		const gotPost = sinon.stub(got, 'post');

		gotPost
			.withArgs('foobar.com:80/web/session/authenticate', {
				json: true,
				headers,
				body: JSON.stringify(body)
			})
			.resolves({
				body: {
					jsonrpc: '2.0',
					id: null,
					result: {
						uid: 1,
						db: body.params.db,
						company_id: 1,
						session_id: '9dff9843ad54f342041f8e19451b8c4e4b25397c',
						username: body.params.login,
						user_context: {
							uid: 1,
							lang: 'nl_BE',
							tz: 'Europe/Brussels'
						}
					}
				},
				headers: {
					'server': 'nginx/1.4.6 (Ubuntu)',
					'date': 'Fri, 05 Aug 2016 10:12:53 GMT',
					'content-type': 'application/json',
					'content-length': '244',
					'connection': 'close',
					'set-cookie': [
						'session_id=2ad18d37785fab31c8e9e3cb8c21f8917f48b63b; Expires=Thu, 03-Nov-2016 10:12:53 GMT; Max-Age=7776000; Path=/'
					]
				}
			});
	});
};
