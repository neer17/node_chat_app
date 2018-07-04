const moment = require('moment');

var generateMessage = (from, message) => {
    return {
        from,
        message,
        createdAt: moment().valueOf()
    };
};

var generateLocationDetails = (from, latitude, longitude) => {
    return{
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationDetails};