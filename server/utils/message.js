var generateMessage = (from, message) => {
    return {
        from,
        message,
        createdAt: new Date().getTime()
    };
};

var generateLocationDetails = (from, latitude, longitude) => {
    return{
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationDetails};