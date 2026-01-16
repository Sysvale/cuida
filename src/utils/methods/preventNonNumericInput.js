export default function preventNonNumericInput(keyEvent) {
	if (keyEvent.ctrlKey || keyEvent.metaKey) {
		return true;
	}

	const allowedKeys = [
		'Backspace',
		'Delete',
		'Tab',
		'Escape',
		'Enter',
		'ArrowLeft',
		'ArrowRight',
		'Home',
		'End',
	];
	const pressedKey = keyEvent.key;

	if (
		!allowedKeys.includes(pressedKey) &&
		!(pressedKey >= '0' && pressedKey <= '9')
	) {
		keyEvent.preventDefault();
		return true;
	}
}
