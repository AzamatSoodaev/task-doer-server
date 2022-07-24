exports.getLoggerEnv = (env) => {
	return env === "development" ? "dev" : "combined";
};