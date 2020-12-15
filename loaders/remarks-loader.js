const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

function loader(source) {

    const schame = {
        type: 'object',
        properties: {
            text: { type: 'string' }
        }
    }

    const cb = this.async();
    const options = getOptions(this);
    validate(schame, options, 'remarks-loader');

    const { text } = options;
    cb(null, `/**${text}**/ ${source}`);
}

module.exports = loader;