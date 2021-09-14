const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = 8000;
const { encrypt, decrypt } = require("./EncryptionHandler");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "amir13845",
	database: "passwordmanager",
});

app.post("/add", (req, res) => {
	console.log("rrerrrrr");
	const { password, title } = req.body;
	const hashedPassword = encrypt(password);
	console.log(password, title);
	db.query(
		"INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
		[hashedPassword.password, title, hashedPassword.iv],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Success");
			}
		}
	);
});

app.get("/show", (req, res) => {
	db.query("SELECT * FROM passwords;", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post("/decrypt", (req, res) => {
	res.send(decrypt(req.body));
});
app.listen(PORT, () => {
	console.log("Server is running");
});
