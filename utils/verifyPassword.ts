const bcrypt = require("bcrypt");

const VerifyPassword = async (inputPw: string) => {
	const correctPassword = await bcrypt.hash(process.env.PASSWORD, 10);

	if (correctPassword === undefined) {
		console.error("No password set in environment variables.");
		return false;
	}

	console.log("inputPw: ", inputPw);

	const success = await bcrypt.compare(inputPw.toLowerCase(), correctPassword);
	return success;
};

export default VerifyPassword;
