const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { enumSchema } = require('../schema/schema-suit');
const EnumBiz = require('../biz/enum.biz');

class EnumController {
	register(app) {
		app.route('/v1/data')
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				const validator = new RequestValidator(enumSchema);
				validator.create({...request.params,...request.query});

				const enumBiz = new EnumBiz();
				const _result = await enumBiz.fetch({...request.params,...request.query,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched enum successfully.`, {
					services: [
						CONSTANTS.LOGGING
					],
					data: { 
						action : CONSTANTS.ACTION.ENUM_FETCHED,
						request: {...request.params,...request.query,client_code},
						response: result
					}
				});
			} catch (error) {
				next(error);
			}
		})
	}
}

module.exports = EnumController;
