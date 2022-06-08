const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { enumSchema } = require('../schema/schema-suit');
const EnumBiz = require('../biz/enum.biz');

class EnumController {
	register(app) {
		/**
		 * @api {post} v1/enum/ Create enum
		 * @apiVersion 1.0.0
		 * @apiName CreateEnum
		 * @apiGroup Enum
		 * @apiPermission admin
		 *
		 * @apiDescription This endpoint will create a enum!
		 *
		 * @apiHeader {String} client_code will be shared to you .
		 * @apiHeaderExample {Header} Header-Example
		 *     "client_code: client_code"
		 *
		 * @apiExample {bash} Curl example
		 * curl -X POST -H "client_code: client_code" -i https://console.flexiloans.com/v1/enum
		 *
		 * @apiSuccess {String} result <code>created</code> if everything went fine.
		 * @apiSuccessExample {json} Success-Example
		 *     HTTP/1.1 201 CREATED
		 *      {
		 *			"success": true,
		 *			"event": "ENUM_CREATED",
		 *			"message": "created enum successfully.",
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
		app.route('/v1/enum')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				const validator = new RequestValidator(enumSchema);
				validator.create({...request.params,...request.body});

				const enumBiz = new EnumBiz();
				const _result = await enumBiz.create({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `created enum successfully.`, {
					services: [
						CONSTANTS.LOGGING
					],
					data: { 
							action : CONSTANTS.ACTION.ENUM_CREATED,
							headers : { ...request.headers},
							request: {...request.params,...request.body},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		})
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				const validator = new RequestValidator(enumSchema);
				validator.create({...request.params,...request.query});

				const enumBiz = new EnumBiz();
				const _result = await enumBiz.fetch({...request.params,...request.query});
				
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
		.put(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				
				const validator = new RequestValidator(enumSchema);
				validator.create({...request.params,...request.body,...request.query});

				const enumBiz = new EnumBiz();
				const _result = await enumBiz.update({...request.params,...request.body,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `updated enum successfully.`, {
					services: [
						CONSTANTS.LOGGING
					],
					data: { 
							action : CONSTANTS.ACTION.ENUM_UPDATED,
							request: {...request.params,...request.body,...request.query,client_code},
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
