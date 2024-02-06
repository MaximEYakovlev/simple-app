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
    const { cause, message, status } = response;

    if (status) {
        res.status(200).json({
            message,
        });
    } else {
        res.status(404).json({
            message,
            cause,
        });
    }
};

module.exports = { sendResponse };
