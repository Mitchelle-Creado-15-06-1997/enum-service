const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const QUERY = require('../constants/queryRepo');
const QueryBuilderBiz = require('./helpers/query-builder.biz');
const SqlBiz = require('./helpers/sql.biz')
class EnumBiz {
	constructor() {
		this.sqlBiz = new SqlBiz();
		this.queryBuilderBiz = new QueryBuilderBiz();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = {};
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
	update(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = {};
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
	fetch(data) {
		return new Promise(async (resolve, reject) => {
			try {
				let result = [];
				let query_data = '';

				if(data.vendor) query_data = (query_data ? query_data + ' and ' : '') + `v.name = '${data.vendor}'`;
				if(data.mapping_key) query_data = (query_data ? query_data + ' and ' : '') + `evm.mapping_key = '${data.mapping_key}'`;
				if(data.mapping_name) query_data = (query_data ? query_data + ' and ' : '') + `evm.mapping_name = '${data.mapping_name}'`; 
				if(data.type_key) query_data = (query_data ? query_data + ' and ' : '') + `eoe.type_key = '${data.type_key}'`; 
				query_data = (query_data ? query_data + ' and ' : '') + `evm.is_active = 1 and ev.is_active = 1`;
				// result = await this.sqlBiz.get_one(null, QUERY.SQL.SELECT['enum'] + query_data);
				result = await prisma.$queryRawUnsafe(QUERY.SQL.SELECT['enum'] + query_data)
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = EnumBiz;
