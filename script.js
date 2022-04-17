const api_url = "https://eaglefang.herokuapp.com/students"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;

		table_data += `<td>${records[i][0]}</td>`;
		table_data += `<td>${records[i][1]}</td>`;
		table_data += `<td>${records[i][2]}</td>`;
		table_data += `<td>${records[i][3]}</td>`;
		

		
		table_data += `<td>`;
		table_data += `<a href="edit2.html?id=${records[i][0]}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i][0]}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	//alert("Hello World");
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => {

		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	console.log(id)
	fetch(`${api_url}?id=${id}`)
	.then((response) => response.json())
	.then((data) => { 
		
		console.log(data);
		// console.log(data[0][2]);
		// document.getElementById("Roll_no").value = data[0][0];
		// document.getElementById("First_Name").value = data[0][1];
		// document.getElementById("Last_Name").value = data[0][2];
		// document.getElementById("Branch").value = data[0][3];
		

	
	})

}


function postData() {
	alert("add form submitted");
	var Roll_no = document.getElementById("Roll_no").value;
	var First_Name = document.getElementById("First_Name").value;
	var Last_Name = document.getElementById("Last_Name").value;
	var Branch = document.getElementById("Branch").value;
	
	
	data = {Roll_no:Roll_no, First_Name:First_Name, Last_Name:Last_Name, Branch:Branch};
	
	console.log(data)
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		window.location.href = "studentdetail.html";
	})
}	


function putData() {
	var Roll_no = document.getElementById("Roll_no").value;
	var First_Name = document.getElementById("First_Name").value;
	var Last_Name = document.getElementById("Last_Name").value;
	var Branch = document.getElementById("Branch").value;
	

    data = {Roll_no:Roll_no, First_Name:First_Name, Last_Name:Last_Name, Branch:Branch};
	console.log(data)

	fetch(api_url, {
 	method: "PUT",
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "studentdetail.html";
	})


}
	

function deleteData(id) {
	user_input = confirm(`Are you sure you want to delete Roll_no ${id} record?`);
	if(user_input) {
		fetch(`${api_url}?id=${id}`, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({id : id})
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data); 
			window.location.href = "studentdetail.html";
		})
	}
 		// window.location.href = "studentdetail.html";	
}
