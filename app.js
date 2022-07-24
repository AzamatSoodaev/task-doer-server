const sequelizeModule = require("./src/models/index");
const expressModule = require("./src/api");

process.on("uncaughtException", uncaughtHandler);
process.on("SIGINT", cleanup);
process.on("SIGUSR1", cleanup);
process.on("SIGUSR2", cleanup);


(async () => {
	try {
		await sequelizeModule.init();
		await expressModule.init();
	} catch (err) {
		console.log(err);
	}
})();

function uncaughtHandler(err) {
	console.log("\nUnhandled error", err.stack || err);
}

async function cleanup() {
	console.log("\nStopping the microservice...");

	setTimeout(function () {
		process.exit(1);
	}, 3000);
}