// const CONSTANTS = require('../constants/appConstants');

class HealthController {
	register(app) {
		app.route('/init')
			.get(async (request, response, next) => {
				try {
					const result = {};
					
					response.json({
						result,
					}, 'Application is running...', {
						services: [
							// CONSTANTS.LOGGING
						],
						data: { 
								// action : Constants.ACTION.CHECK_APPLICATION_HEALTH,
								headers : { ...request.headers},
							    request: {...request.params},
								response: {}
					}
					});
				} catch (error) {
					next(error);
				}
			});
	}
}

module.exports = HealthController;
