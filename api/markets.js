const https = require(“https”);

module.exports = async function handler(req, res) {
res.setHeader(“Access-Control-Allow-Origin”, “*”);
res.setHeader(“Access-Control-Allow-Methods”, “GET”);

const data = await new Promise(function(resolve, reject) {
https.get(
“https://trading-api.kalshi.com/trade-api/v2/markets?status=open&limit=100”,
{ headers: { “Content-Type”: “application/json” } },
function(r) {
var body = “”;
r.on(“data”, function(chunk) { body += chunk; });
r.on(“end”, function() {
try { resolve(JSON.parse(body)); }
catch(e) { reject(e); }
});
}
).on(“error”, reject);
});

res.status(200).json(data);
};
