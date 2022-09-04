const Response = require("../utils/Response");
const stocks = require("../data/stock");
const transactions = require("../data/transactions");

class StockService {
    async getSKU(body) {
        if(!body || !body.sku || body.sku.length < 0){
            return new Response({},"Missing Parameters!");
        }
        const sku = body.sku.toString();

        const item = stocks.filter((stock) => stock.sku === sku);
        const transactionsBySku = transactions.filter((tx) => tx.sku === sku);

        if((item.length || transactionsBySku.length) == 0){
            return new Response({},"Unit not found!");
        }

        const selectedUnit = item[0];

        transactionsBySku.map((tx) => {
            if(tx.type == "order"){
                selectedUnit.stock -= parseInt(tx.qty);
            }
            if(tx.type == "refund"){
                selectedUnit.stock += parseInt(tx.qty);
            }
        });

        return new Response(selectedUnit);
    }
};

module.exports = StockService;