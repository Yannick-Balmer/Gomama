const configApp = require('../../api-screen/configAppCreateLogo.json');
const configCustomer = require('../../api-screen/configCustomerLogo.json');

const configContent = `
var app_version = '${configCustomer.version}';
var center_id = '${configCustomer.centre_id}';
var language = '${configCustomer.language}';
`;

module.exports = configContent;
