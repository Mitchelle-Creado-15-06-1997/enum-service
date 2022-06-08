//your app constants come here
const config = require('config');
module.exports = {
	CLIENT_CODES : config.get('app_config.client_code'),
	APPLICATION_JSON: 'application/json',
	JSON : 'json',
	TEXT_XML : 'text/xml',
	FORM_DATA: 'multipart/form-data',
	X_WWW_FORM_URLENCODED : 'application/x-www-form-urlencoded',
	LOGGING: 'LOGGING',
	EVENT_EMIT: 'EVENT_EMIT',
	DOC_DIRECTORY: 'storage/tmp',
	DOC_ZIP_DIRECTORY: 'storage/tmp/zip',
	DOCUMENT_TYPE : '',
	DOCUMENT_CATEGORY : '',
	DOCUMENT_SOURCE : 'LOS',
	REQUEST_ID_PREFIX : 'OFFER',
	DOCUMENT_SECTION : '',
	VENDOR: 'vendor',
	MAPPING_KEY: 'mapping_key',
	MAPPING_NAME: 'mapping_name',
	TYPE_KEY: 'type_key',
	CURRENT_TIMESTAMP : 'CURRENT_TIMESTAMP',
	DEFAULT_DATE_FORMAT : 'YYYY-MM-DD HH:mm:ss',
	CSV : 'CSV',
	EXCEL : 'XLSL',
	CSV_EXTENSION : '.csv',
	EXCEL_EXTENSION : '.xlsx',
	EMIT_QUICKWORKS_EVENTS : [],
	EMIT_EVENTBRIDGE_EVENTS : [],
	HEADER_VALIDATOR_EXCEPTOR : ['CHECK_APPLICATION_HEALTH','API_DOCUMENTATION'],
	ACTION: {
		CHECK_APPLICATION_HEALTH : 'CHECK_APPLICATION_HEALTH',
		ENUM_FETCHED : 'ENUM_FETCHED'

	},
	SEARCH_LIST : ["loan_code", "loanCode", "code"],
	EVENT : {
		'/' : {
			GET : 'API_DOCUMENTATION'
		},
		'/init' : {
			GET : 'CHECK_APPLICATION_HEALTH'
		},
		'/v1/data' : {
			POST : 'ENUM_CREATED',
			PUT : 'ENUM_UPDATED',
			GET : 'ENUM_UPDATED'
		}
	}
};