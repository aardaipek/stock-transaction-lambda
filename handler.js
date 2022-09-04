const Response = require("./src/utils/Response");
const StockService = require("./src/services/StockService");

module.exports.handler = async (event) => {
    const stockService = new StockService();

    return await stockService.getSKU(JSON.parse(event.body));
}