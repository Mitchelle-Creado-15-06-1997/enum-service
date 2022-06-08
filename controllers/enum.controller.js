const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { enumSchema } = require('../schema/schema-suit');
const EnumBiz = require('../biz/enum.biz');

class EnumController {
	register(app) {
		/**
		 * @api {get} v1/data/ Get enum
		 * @apiVersion 1.0.0
		 * @apiName GetEnum
		 * @apiGroup Enum
		 * @apiPermission admin
		 *
		 * @apiDescription This endpoint will get a enum depending on vendor!
		 *
		 * @apiHeader {String} client_code will be shared to you .
		 * @apiHeaderExample {Header} Header-Example
		 *     "client_code: client_code"
		 *
		 * @apiExample {bash} Curl example
		 * curl -X GET -H "client_code: client_code" -i https://console.neo.com/v1/data
		 *
		 * @apiSuccess {String} result <code>Fetched</code> if everything went fine.
		 * @apiSuccessExample {json} Success-Example
		 *     HTTP/1.1 201 FETCHED
		 *      {
		 *			"success": true,
		 *			"event": "ENUM_FETCHED",
		 *			"message": "fetched enum successfully.",
		 *			"uuid": "e043e090-758f-11eb-833e-1b36d8ab14c1",
		 *			"data": {}
		 *		}
		 *
		 * @apiError NoAccessRight Only authenticated Admins can access the data.
		 * @apiError UserNotFound   The <code>id</code> of the User was not found.
		 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
		 *
		 * @apiErrorExample Response (example):
		 *     HTTP/1.1 401 Not Authenticated
		 *     {
		 *       "error": "NoAccessRight"
		 *     }
		 */
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
