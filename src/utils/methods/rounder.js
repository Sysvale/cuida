export default function rounder(elementWidth, limiter = 24) {
	let rawRadii = elementWidth / 8;
	let radiiMod4 = rawRadii % 4;
	let borderRadius = rawRadii > limiter ? limiter : rawRadii - radiiMod4 + 4;

	return `${borderRadius}px`;
}
