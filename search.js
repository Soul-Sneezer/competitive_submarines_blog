function sendFormularData()
{
	var formular = document.querySelectorAll("#search input")[0];
	console.log(formular.value);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://competitivesubmarines.com/");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = () => {
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
		{
		}
	}	

	xhr.send(formular.value);
}

window.onload = function ()
{
	var sub = document.querySelectorAll(".search_sub .submarine__body")[0];
	var propeller = document.querySelectorAll(".submarine__propeller")[0];
	var bubbles = document.querySelectorAll(".bubbles__container")[0];
	var formular = document.querySelectorAll("#search input")[0];
	var size = Math.max(formular.textLength * 20, 250);
	
	sub.style.width = size + "px";
	formular.style.width = size - 50 + "px";
	propeller.style.left = 320 + (size - 250) / 2 + "px";
	bubbles.style.left = 255 + (size - 250) / 2 + "px";

	document.addEventListener('keypress', function(event) {
		if(event.keyCode == 13 || event.which == 13)
			sendFormularData();
		else
		{
			var size = Math.max(formular.textLength * 20, 250);
			sub.style.width = size + "px";
			formular.style.width = size - 50 + "px";
			propeller.style.left = 320 + (size - 250) / 2 + "px"
			bubbles.style.left = 255 + (size - 250) / 2 + "px";
		}
	}, true);

	document.addEventListener("keyup", function(event)
		{
			if(event.key === "Backspace")
			{
				var size = Math.max(formular.textLength * 20, 250);
				sub.style.width = size + "px";
				formular.style.width = size - 50 + "px";
				propeller.style.left = 320 + (size - 250) / 2 + "px"
				bubbles.style.left = 255 + (size - 250) / 2 + "px";
			}
		});
}
