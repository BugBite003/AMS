/** @format */

document.querySelector("#form").addEventListener("submit", submitFun);

function submitFun(elme) {
	elme.preventDefault();
	username = document.querySelector("#name").value;
	password = document.querySelector("#password").value;
	var option1 = document.getElementById("agree1");
	var option2 = document.getElementById("agree2");

	if (username == "Avishkar" && password == "123" && option2.checked) {
		window.location.href = "admin.html";
	} else {
		alert("Invalid username or password");
		document.querySelector("#form").reset();
	}
}
