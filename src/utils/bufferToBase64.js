export function bufferToBase64(buffer) {
	const binary = [];
	const bytes = new Uint8Array(buffer);
	bytes.forEach(byte => binary.push(String.fromCharCode(byte)));
	return btoa(binary.join(''));
}
