class Response {
    constructor(result,status = true) {
        this.statusCode = 200;
        this.headers = {
            "Content-Type": "application/json"
        };
        this.body = JSON.stringify({
            data: result,
            message: status,
            success: status == true,
        });
    }
}

module.exports = Response;