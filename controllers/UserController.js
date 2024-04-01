/** @format */

export const getAllUsers = async (req, res, next) => {
	let user;
	try {
		users = User.Users.find();
	} catch (err) {
		return next(err);
	}
	if (!users) {
		return res.status(500).json({ message: "unexpexted error" });
	}
	return res.status(200).json({ users: user });
};

export const signUp = async (req, res, next) => {
	const { name, email, password } = req.body;
	if (
		!name &&
		name.trim() === "" &&
		!email &&
		email.trim() === "" &&
		!password &&
		password.trim() === ""
	) {
		return res.status(422).json({ message: "Invalid Inputs" });
	}
	const hashedPassword = bcrypt.hashSync(password);
	let users;
	try {
		users = new user({ name, email, password: hashedPassword});
		await users.save();
	} catch (err) {
		return res.json({ err });
	}

	if (!users) {
		return res.status(500).json({ message: "Unexpected Error Occurred" });
	}

	return res.status(201).json({ users });
};
