'use strict';
exports.parse = res => {
	if (res.error) {
		const err = new Error(res.error.message);
		err.code = res.error.code;
		err.data = res.error.data;

		throw err;
	}

	return res.result;
};
