/** @format */
import bcrypt from "bcryptjs";


import user from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/models/User.js";

export const getAllUsers = async (req, res, next) => {
	user.find()
	.then((users) => res.json(users))
	.catch(err => res.json(err))
	// let users;
	// try {
	// 	users = await user.find({});
	// } catch (err) {
	// 	res.json("fail");
	// 	return console.log(err);
	// }
	// if (!users) {
	// 	return res.status(500).json({
	// 		message: "Unexpected error occured.",
	// 	});
	// }
	// return res.status(200).json({ users });
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
		return res.status(400).json({ message: "Invalid Inputs" });
	}
	const hashedPassword = bcrypt.hashSync(password);
	let users;
	try {
		users = new user({ name, email, password: hashedPassword });
		await users.save();
	} catch (err) {
		return res.json({ err });
	}

	if (!users) {
		return res.status(500).json({ message: "Unexpected Error Occurred" });
	}

	return res.status(201).json({ id: users._id });
};

export const updateUser = async (req, res, next) => {
	const id = req.params.id;
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

	// const hashedPassword = bcrypt.hashSync(password);
	let users;
	try {
		users = await user.findByIdAndUpdate(id, { name, email, password });
	} catch (err) {
		return res.send(err.message);
	}
	if (!users) {
		return res.status(500).json({ message: "Something went wrong" });
	}
	res.status(200).json({ message: "Updated successfully", user: users });
};

export const deleteUser = async (req, res, next) => {
	const id = req.params.id;
	let users;
	try {
		users = await user.findByIdAndDelete(id);
	} catch (err) {
		return res.send(err.message);
	}
	if (!users) {
		return res.status(500).json({ message: "Something went wrong" });
	}
	res.status(200).json({ message: "Deleted successfully", user: users });
};

export const logIn = async (req, res, next) => {
	const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful', user });
};
