/* eslint-disable camelcase */
import test from 'ava';
import Odoo from '../';
import setup from './fixtures/setup';

setup(test);

test('construct', t => {
	t.throws(() => new Odoo(), 'Expected `host` to be a `string`, got `undefined`');
	t.deepEqual((new Odoo({host: 'foobar.com'}))._config, {host: 'foobar.com', port: 80});
	t.deepEqual((new Odoo({host: 'foobar.com', port: 9999}))._config, {host: 'foobar.com', port: 9999});
});

test('connect', async t => {
	const odoo = new Odoo({host: 'foobar.com'});
	const client = await odoo.connect({database: 'foo', username: 'bar', password: 'baz'});

	t.deepEqual(client._connection, {
		uid: 1,
		db: 'foo',
		company_id: 1,
		session_id: '9dff9843ad54f342041f8e19451b8c4e4b25397c',
		username: 'bar',
		user_context: {
			uid: 1, lang: 'nl_BE',
			tz: 'Europe/Brussels'
		}
	});
});

test('connect failure', async t => {
	const odoo = new Odoo({host: 'foobar.com'});
	const error = await t.throws(odoo.connect({
		database: 'fail',
		username: 'fail',
		password: 'fail'
	}), Error, 'Odoo Server Error');
	t.is(error.code, 200);
	t.deepEqual(error.data, {
		debug: 'Traceback ...'
	});
});
