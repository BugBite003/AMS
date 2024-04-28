/** @format */

//import express from "express";
//import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";
import cors from "cors";

import user from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/models2/User.js";

dotenv.config();

mongoose.connect(
	"mongodb+srv://avishkartech8:STa00Rn7JNPeKJ6S@cluster0.hebea3r.mongodb.net/"
);
//const  collection = mongoose.model("collection",)

const app = express();
const PORT = process.env.PORT || 4000;

//middelwares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	user
		.find({})
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});

app.get("/getStudent/:id", (req, res) => {
	const id = req.params.id;
	user
		.findById({ _id: id })
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});

app.put("/updateStudent/:id", (req, res) => {
	const id = req.params.id;
	user
		.findByIdAndUpdate(
			{ _id: id },
			{
				name: req.body.name,
				className: req.body.className,
				rollno: req.body.rollno,
				attendance: req.body.attendance,
			}
		)
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});

app.put("/updateStudentF/:id", (req, res) => {
	const id = req.params.id;
	user
		.findByIdAndUpdate(
			{ _id: id },
			{
				attendance: req.body.attendance,
			}
		)
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});


app.post("/addStudent", (req, res) => {
	user
		.create(req.body)
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});

app.delete("/deleteStudent/:id", (req, res) => {
	const id = req.params.id;
	user
		.findByIdAndDelete({ _id: id })
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});

app.listen(PORT, () => {
	console.log(`conneted to ${PORT}`);
});

//Ardunio uno
//const express = require("express");
import http from "http";
import path from "path";
import { Server as SocketIO } from "socket.io";
import { SerialPort, ReadlineParser } from "serialport";
const server = http.createServer(app);
const io = new SocketIO(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const port = new SerialPort({
	path: "COM6",
	baudRate: 9600,
});

// Create a parser instance

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

let tagID = "";

parser.on("data", (data) => {
	tagID = data;
	console.log(`Tag ID: ${tagID}`);
	io.emit("tagID", tagID);
});

app.get("/tagID", (req, res) => {
	res.json({ tagID });
});

io.on("connection", (socket) => {
	console.log("User connected");

	if (tagID !== "") {
		socket.emit("tagID", tagID);
	}

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

export default app;
