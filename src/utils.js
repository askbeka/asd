export function isEqual(a, b) {
	return lower(a) === lower(b);
}

export function lower(text) {
	return text.toLowerCase();
}

export function btoa(text) {
	return new Buffer(text).toString('base64');
}