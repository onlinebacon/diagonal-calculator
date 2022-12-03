const { sqrt, sin, cos, asin } = Math;
const sqr = (x) => x*x;

export const getSecondDiagonalFlat = (a, b, c, d, d1) => {
	const y1 = (a*a - b*b + d1*d1)/(2*d1);
	const x1 = sqrt(a*a - y1*y1);
	const y2 = (c*c - d*d + d1*d1)/(2*d1);
	const x2 = sqrt(c*c - y2*y2);
	const dx = x1 + x2;
	const dy = y1 - y2;
	return sqrt(dx*dx + dy*dy);
};

export const getSecondDiagonalSphere = (a, b, c, d, d1) => {
	const getPoint = (a, b, d) => {
		const cosB = cos(b);
		const py = sin(d)*cosB;
		const pz = cos(d)*cosB;
		const z = cos(a);
		const y = (pz - z)*pz/py + py;
		const x = sqrt(sqr(sin(a)) - y*y);
		return [ x, y, z ];
	};
	const [ ax, ay, az ] = getPoint(a, b, d1);
	const [ bx, by, bz ] = getPoint(c, d, d1);
	const dx = bx + ax;
	const dy = by - ay;
	const dz = bz - az;
	return asin(sqrt(dx*dx + dy*dy + dz*dz)*0.5)*2;
};

export const calcWithMargin = (a, b, c, d, d1, e, fn) => {
	const calc = (args, i) => {
		if (i === 5) {
			const val = fn(...args);
			return [ val, val ];
		}
		const args1 = args.slice();
		const args2 = args.slice();
		args1[i] += e;
		args2[i] -= e;
		const [ min1, max1 ] = calc(args1, i + 1);
		const [ min2, max2 ] = calc(args2, i + 1);
		return [ Math.min(min1, min2), Math.max(max1, max2) ];
	};
	return calc([ a, b, c, d, d1 ], 0);
};
