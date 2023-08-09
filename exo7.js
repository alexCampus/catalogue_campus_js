const translate = { car: 'Voiture', house: 'Maison', game: 'Jeux', videoGame: 'Jeux Video', show: 'Pestacle' };
const newData = jsonDatas;
jsonDatas.forEach((el, key) => {
	newData[key].translate = translate[el.type];
});

function setStyleTable(table) {
	table.style.fontFamily = 'Arial, Helvetica, sans-serif';
	table.style.borderCollapse = 'collapse';
	table.style.width = '100%';
}

function setStyleTH(th) {
	th.style.border = '1px solid #ddd';
	th.style.padding = '8px';
	th.style.paddingTop = '12px';
	th.style.paddingBottom = '12px';
	th.style.textAlign = 'left';
	th.style.backgroundColor = '#04AA6D';
	th.style.color = 'white';
}

function setStyleTD(td) {
	td.style.padding = '8px';
	td.style.border = '1px solid #ddd';
}

function setCheckBox(data) {
	const checkBox = document.createElement('input');
	checkBox.type = 'checkbox';
	const body = document.getElementsByClassName('container')[0];
	checkBox.setAttribute('id', 'check');
	checkBox.addEventListener('change', displayStock);
	body.append(checkBox);
}

function displayStock() {
	let data = newData;
	if (this.checked) {

		data = newData.filter(obj => obj.quantity > 0);
		console.log('hello');
	}
	console.log(data);
	setTable(data);
}

function setTable(data) {
	if (document.getElementById('table') !== null) {
		document.getElementById('table').remove();
	}
	const table = document.createElement('table');
	table.setAttribute('id', 'table');
	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	const body = document.getElementsByClassName('container')[0];
	setTHead(tr, newData[0], data);
	setStyleTable(table);

	thead.appendChild(tr);
	table.appendChild(thead);
	body.appendChild(table);
	setTbody(table, data);
}

function setBtnAndText() {
	const body = document.getElementsByClassName('container')[0];
	const div = document.createElement('div');
	const text = document.createElement('input');
	const btn = document.createElement('button');
	btn.innerHTML = 'Submit';
	btn.addEventListener('click', clickBtn);
	text.setAttribute('id', 'submitText');
	div.append(text);
	div.append(btn);
	body.append(div);
}

function sortPrice(data) {
	let min = Math.min(...data.map(item => item.price));
	if (data[0].price === min) {
		setTable(data.sort((a, b) => b.price - a.price));
	} else {
		setTable(data.sort((a, b) => a.price - b.price));
	}
}

function sortName(data) {
	let firstElement = data[0].name;
	let lastElement = data[data.length - 1].name;
	const dataSorted = data.sort((a, b) => {
		if (firstElement > lastElement) {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
		} else {
			if (a.name < b.name) {
				return 1;
			}
			if (a.name > b.name) {
				return -1;
			}
		}
		// names must be equal
		return 0;
	});
	setTable(dataSorted);
}

function clickBtn() {
	const value = document.getElementById('submitText').value;
	let data = newData;
	if (value.trim() !== '') {
		data = newData.filter((el) => el.type.includes(value.trim()));
	}

	setTable(data);
}

function setTbody(table, data) {
	const tBody = document.createElement('tbody');
	setTr(tBody, data);

	table.appendChild(tBody);
}

function setTr(tBody, data) {
	data.forEach((el) => {
		const tr = document.createElement('tr');
		// tr.style.border = '1px solid #333';
		// tr.style.borderBottom = '1px solid #333';

		Object.values(el).forEach((value) => {
			const td = document.createElement('td');
			setStyleTD(td);
			td.innerHTML = value;
			tr.appendChild(td);
		});
		tBody.appendChild(tr);
	});
}

function setTHead(tr, obj, data) {
	Object.keys(obj).forEach((el, key) => {
		const th = document.createElement('th');
		setStyleTH(th);
		if (el === 'price') {
			th.addEventListener('click', function () {
				sortPrice(data);
			});
		}
		if (el === 'name') {
			th.addEventListener('click', function () {
				sortName(data);
			});
		}
		th.innerHTML = el;
		tr.appendChild(th);
	});
}

setCheckBox(newData);
setBtnAndText();
setTable(newData);
