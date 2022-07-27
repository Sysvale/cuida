export const colors = [
	{
		name: 'turquoise',
		hex: '#3CACDD', // $ts-400
	},
	{
		name: 'green',
		hex: '#2AC092', // $gp-400
	},
	{
		name: 'blue',
		hex: '#377EE1', // $bn-400
	},
	{
		name: 'indigo',
		hex: '#6174D1', // $in-400
	},
	{
		name: 'violet',
		hex: '#A169D3', // $vr-400
	},
	{
		name: 'pink',
		hex: '#DD5A9C', // $pp-400
	},
	{
		name: 'red',
		hex: '#F95367', // $rc-400
	},
	{
		name: 'orange',
		hex: '#FF8567', // $og-400
	},
	{
		name: 'amber',
		hex: '#FFB952', // $al-400
	},
	{
		name: 'gray',
		hex: '#9AA8B6', // $n-200
	},
];

export const colorOptions = colors.map((color) => color.name);

export const colorHexCode = (value) => {
	const foundColor = colors.filter((color) => color.name === value)[0];
	return foundColor ? foundColor.hex : '';
};
