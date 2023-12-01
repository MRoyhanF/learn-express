const response = (statusCode, data, message, res) => {
    res.json(statusCode, [
        {
            data: data,
            message: message,
            metadata:{
                prev:"",
                next:"",
                current:""
            }
        }
    ])
}

module.exports = response