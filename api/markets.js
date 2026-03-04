const https = require(“https”);

module.exports = async function handler(req, res) {
res.setHeader(“Access-Control-Allow-Origin”, “*”);
res.setHeader(“Access-Control-Allow-Methods”, “GET”);

try {
const data = await new Promise(function(resolve, reject) {
const options = {
hostname: “api.elections.kalshi.com”,
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
try { resolve(JSON.parse(body)); }
catch(e) { reject(new Error(“Parse error: “ + e.message + “ body: “ + body.slice(0,200))); }
});
});
req2.on(“error”, reject);
req2.end();
});
res.status(200).json(data);
} catch(e) {
res.status(200).json({ error: e.message });
}
};
