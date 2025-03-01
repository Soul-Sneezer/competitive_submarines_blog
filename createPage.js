export function createPage(content, other)
{
	var a = document.querySelectorAll("article")[0];
	var par = document.createElement("p");
	var jsonFile;
	var header;
	var tags;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://competitivesubmarines.com/posts_content/" + content);
	xhr.onload = function() {
		par.innerHTML = xhr.responseText;

	}
	xhr.send();

	header = document.createElement("h1");
	tags = document.createElement("h6");

	fetch("https://competitivesubmarines.com/posts_content/" + other)
		.then((response) => response.json())
		.then((json) => {
			header.innerHTML = json.title, 
				tags.innerHTML = "Tags: " + json.tags
		});

	a.appendChild(header);
	a.append(tags);
	a.appendChild(par);

}
