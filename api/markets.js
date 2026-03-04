const https = require(“https”);

module.exports = async function handler(req, res) {
res.setHeader(“Access-Control-Allow-Origin”, “*”);

try {
const data = await new Promise(function(resolve, reject) {
const options = {
hostname: “trading-api.kalshi.com”,
path: “/trade-api/v2/markets?status=open&limit=100”,
method: “GET”,
headers: {
“Accept”: “application/json”,
“User-Agent”: “Mozilla/5.0”
}
};
const req2 = https.request(options, function(r) {
var body = “”;
r.on(“data”, function(chunk) { body += chunk; });
r.on(“end”, function() {
try { resolve({ status: r.statusCode, body: JSON.parse(body) }); }
catch(e) { resolve({ status: r.statusCode, body: body, parseError: e.message }); }
});
});
req2.on(“error”, function(e) { reject(e); });
req2.end();
});
res.status(200).json(data);
} catch(e) {
res.status(200).json({ error: e.message, stack: e.stack });
}
};
