//your app templates come here
const CONSTANT = require('../constants/appConstants');
module.exports = {
    client_code : {
        enum : {
            request : `{
                "enum" : "{{#? clean($root,'enum')}}"
            }`
        }
    }
}

