import { bufferToBase64 } from '../../utils/bufferToBase64.js';

export function getInputImage(imgSrc) {
	let imgInput = null;

	if (imgSrc !== null && imgSrc.buffer) {
		imgInput = bufferToBase64(imgSrc.buffer.data);
	}

	return imgInput;
}
