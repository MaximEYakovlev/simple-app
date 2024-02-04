const sendResponse = (res, response, action) => {
    switch (action.type) {
        case 'replenish':
            resObject(res, response);
            break;
        case 'withdraw':
            resObject(res, response);
            break;
        case 'transfer':
            resObject(res, response);
            break;
        default:
            res.json({
                message: 'there is no such action type',
            });
    }
};

const resObject = (res, response) => {
    if (response.status) {
        res.status(200).json({
            message: response.message,
        });
    } else {
        res.json({
            message: response.message,
            cause: response.cause,
        });
    }
};

module.exports = { sendResponse };
