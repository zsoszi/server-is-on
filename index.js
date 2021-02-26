const express = require('express');
const app = express();
const fs = require('fs');

function loadJSON(filename = '') {
	return JSON.parse(
		fs.existsSync(filename)
			? fs.readFileSync(filename).toString()
			: "null"
	);
}

const data = loadJSON('./data/students.json');

app.get('/', (req, res) => {
	res.send("<h1>Hello World! It's Codecool</h1>");
});

app.get('/api/students', (req, res) => {
	res.send(data);
});



app.get('/api/students/active', (req, res) =>
	res.json(data.filter((data) => data.status)),
);

app.get('/api/students/finished', (req, res) =>
	res.json(data.filter((data) => !data.status)),
);

app.get('/api/students/:studentId', (req, res) => {
	const id = parseInt(req.params.studentId);
	const fs = require('fs')
	const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
	const student = students.filter(student => student.id === id);
	res.send(student)
});



app.listen(5000, () => console.log('server started on port 5000'));
