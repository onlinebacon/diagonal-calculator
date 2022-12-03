import { getSecondDiagonalFlat, getSecondDiagonalSphere } from './math.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const drawSpot = (x, y) => {
	ctx.beginPath();
	ctx.arc(x, y, 4, 0, Math.PI*2);
	ctx.fill();
};

const drawLine = (ax, ay, bx, by) => {
	ctx.beginPath();
	ctx.moveTo(ax, ay);
	ctx.lineTo(bx, by);
	ctx.stroke();
};

const drawPreview = () => {
	ctx.fillStyle = '#272727';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	const size = Math.min(canvas.width, canvas.height);
	const margin = size*0.1;
	const inner = size - margin*2;
	const x0 = (canvas.width - inner)*0.5;
	const y0 = (canvas.height - inner)*0.5;
	const x1 = canvas.width - x0;
	const y1 = canvas.height - y0;
	ctx.fillStyle = '#ccc';
	ctx.strokeStyle = '#ccc';
	drawSpot(x0, y0);
	drawSpot(x1, y0);
	drawSpot(x0, y1);
	drawSpot(x1, y1);
	drawLine(x0, y0, x1, y0);
	drawLine(x1, y0, x1, y1);
	drawLine(x0, y0, x0, y0);
	drawLine(x0, y0, x0, y1);
	drawLine(x0, y1, x1, y1);
	drawLine(x0, y0, x1, y1);
	drawLine(x1, y0, x0, y1);
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';
	ctx.fillText('A', (x0 + x1)*0.5, y0 + 5);
	ctx.textBaseline = 'bottom';
	ctx.fillText('D', (x0 + x1)*0.5, y1 - 5);
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'left';
	ctx.fillText('C', x0 + 5, (y0 + y1)*0.5);
	ctx.textAlign = 'right';
	ctx.fillText('B', x1 - 5, (y0 + y1)*0.5);
	ctx.textAlign = 'left';
	ctx.textBaseline = 'bottom';
	ctx.fillText('E', x0*0.75 + x1*0.25 + 5, y0*0.75 + y1*0.25 - 5);
	ctx.textAlign = 'top';
	ctx.fillText('F', x0*0.75 + x1*0.25 + 5, y1*0.75 + y0*0.25 + 5);
};

drawPreview();

const getVal = (name) => {
	return document.querySelector(`[name="${name}"]`).value;
};

const setVal = (name, value) => {
	document.querySelector(`[name="${name}"]`).value = value;
};

const validNumber = (val) => {
	val = val.trim();
	if (val === '') return false;
	return !isNaN(Number(val));
};

const update = () => {
	const lengths = 'abcde'.split('').map(getVal);
	const invalid = lengths.find(val => !validNumber(val));
	if (invalid != null) {
		setVal('f', 'Invalid');
		return;
	}
	let [ a, b, c, d, d1 ] = lengths.map(Number);
	const surface = getVal('surface');
	let res;
	if (surface === 'flat') {
		res = getSecondDiagonalFlat(a, b, c, d, d1);
	} else {
		const radius = getVal('radius');
		if (!validNumber(radius)) {
			setVal('f', 'Invalid');
			return;
		}
		res = getSecondDiagonalSphere(...lengths.map(val => val/radius))*radius;
	}
	if (isNaN(res)) {
		setVal('f', 'Invalid');
	} else {
		setVal('f', res);
	}
};

[ ...document.querySelectorAll('input, select') ].forEach(input => {
	input.oninput = update;
});
