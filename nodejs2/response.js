const response = (statusCode, data, message, res) => {
    res.json(statusCode, [
        {
            payload: data,
                message: message,
            metadata:{
                prev:"",
                next:"",
                current:""
            },
        },
    ])
}

module.exports = response