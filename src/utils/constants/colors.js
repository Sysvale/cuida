export const colors = [
	{
		name: 'turquoise',
		hex: '#3CACDD', // $ts-400
		lighterHex: '#C2EDFF', // $ts-200
	},
	{
		name: 'teal',
		hex: '#3CACDD', // $ts-400
		lighterHex: '#C2EDFF', // $ts-200
	},
	{
		name: 'green',
		hex: '#2AC092', // $gp-400
		lighterHex: '#ABEDD9', // $gp-200
	},
	{
		name: 'blue',
		hex: '#377EE1', // $bn-400
		lighterHex: '#B6D1F7', // $bn-200
	},
	{
		name: 'indigo',
		hex: '#6174D1', // $in-400
		lighterHex: '#CED6FD', // $in-200
	},
	{
		name: 'violet',
		hex: '#A169D3', // $vr-400
		lighterHex: '#E6D2F9', // $vr-200
	},
	{
		name: 'pink',
		hex: '#DD5A9C', // $pp-400
		lighterHex: '#F9C8E2', // $pp-200
	},
	{
		name: 'red',
		hex: '#F95367', // $rc-400
		lighterHex: '#FBD0D6', // $rc-200
	},
	{
		name: 'orange',
		hex: '#FF8567', // $og-400
		lighterHex: '#FFD6CC', // $og-200
	},
	{
		name: 'amber',
		hex: '#FFB952', // $al-400
		lighterHex: '#FFE2B8', // $al-200
	},
	{
		name: 'gray',
		hex: '#9AA8B6', // $n-200
		lighterHex: '#ABB8C4', // $n-100
	},
];

export const colorOptions = colors.map((color) => color.name);

export const colorHexCode = (value) => {
	const foundColor = colors.filter((color) => color.name === value)[0];
	return foundColor ? foundColor.hex : '';
};

export const colorLighterHexCode = (value) => {
	const foundColor = colors.filter((color) => color.name === value)[0];
	return foundColor ? foundColor.lighterHex : '';
};
