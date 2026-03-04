module.exports = function(req, res) {
res.setHeader(“Access-Control-Allow-Origin”, “*”);
res.status(200).json({ ok: true, message: “Vercel function is working” });
};
