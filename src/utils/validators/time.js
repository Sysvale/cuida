import { DateTime } from 'luxon';

export const hourFormat = (time) => {
	return /[0-2][0-9]:[0-5][0-9]/.test(time);
};

export const isAfter = (finalTime, initialTime) => {
	if (!(hourFormat(finalTime) && hourFormat(initialTime))) {
		return false;
	}

	return (
		DateTime.fromFormat(finalTime, 'HH:mm').diff(
			DateTime.fromFormat(initialTime, 'HH:mm')
		) > 0
	);
};
