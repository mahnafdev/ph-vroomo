import express from "express";

const app = express();
const port = 8080;

//* Global Middlewares
app.use(express.json());

//* Listen server
app.listen(port, () => {
	console.log(`> Server running on Port <${port}>`);
});
