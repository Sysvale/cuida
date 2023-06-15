export default (slots, slotName) => {
	return Object.keys(slots).some((slot) => slot === slotName);
};
