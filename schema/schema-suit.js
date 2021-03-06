const Constants = require('../constants/appConstants');
const STRING = 'string';
const INT = 'int';
const DOUBLE = 'double';
const OBJECT = 'object';
const ARRAY = 'array';

const AnyOfStringNull = [
	{ type: STRING },
	{ type: null },
];

const AnyOfDoubleNull = [
	{ type: DOUBLE },
	{ type: null },
];

const AnyOfIntNull = [
	{ type: INT },
	{ type: null },
];

const AnyOfArrayNull = [
	{ type: ARRAY },
	{ type: null },
];
module.exports = {
	enumSchema: {
		id: '/enumSchema',
		type: 'object',
		required: [],
		properties: {
		},
	},
	fuzzySchema: {
		id: '/fuzzySchema',
		type: 'object',
		required: ['full_name', 'match_name'],
		properties: {
			full_name: { type: 'string' },
			match_name: { type: 'string' }
		},
	},
	header: {
		id: '/header',
		type: 'object',
		required: ['client_code'],
		properties: {
			client_code: { type: 'string', enum: Constants.CLIENT_CODES },
		},
	},
	fetchUserById: {
		id: '/fetchUserById',
		type: 'object',
		additionalProperties: true,
		required: ["user_id"],
		properties: {
			"user_id": { "type": "string" }
		},
	},
	fetchServiceTypeById: {
		id: '/serviceType',
		type: 'object',
		additionalProperties: true,
		required: ["servicetype_id"],
		properties: {
			"servicetype_id": { "type": "string" }
		},
	}
};
