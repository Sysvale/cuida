export const colors = [
	{
		name: 'turquoise',
		hex: '#3CACDD', // $ts-400
		lighterHex: '#C2EDFF', // $ts-200
		lightestHex: '#f5fbff', // $ts-50
	},
	{
		name: 'teal',
		hex: '#3CACDD', // $ta-400
		lighterHex: '#C2EDFF', // $ta-200
		lightestHex: '#eefcfa', // $ta-50
	},
	{
		name: 'green',
		hex: '#2AC092', // $gp-400
		lighterHex: '#ABEDD9', // $gp-200
		lightestHex: '#f3fcf8', // $gp-50
	},
	{
		name: 'blue',
		hex: '#377EE1', // $bn-400
		lighterHex: '#B6D1F7', // $bn-200
		lightestHex: '#f6f9fe', // $bn-50
	},
	{
		name: 'indigo',
		hex: '#6174D1', // $in-400
		lighterHex: '#CED6FD', // $in-200
		lightestHex: '#f5f6ff', // $in-50
	},
	{
		name: 'violet',
		hex: '#A169D3', // $vr-400
		lighterHex: '#E6D2F9', // $vr-200
		lightestHex: '#faf5ff', // $vr-50
	},
	{
		name: 'pink',
		hex: '#DD5A9C', // $pp-400
		lighterHex: '#F9C8E2', // $pp-200
		lightestHex: '#fff5fb', // $pp-50
	},
	{
		name: 'red',
		hex: '#F95367', // $rc-400
		lighterHex: '#FBD0D6', // $rc-200
		lightestHex: '#fef6f7', // $rc-50
	},
	{
		name: 'orange',
		hex: '#FF8567', // $og-400
		lighterHex: '#FFD6CC', // $og-200
		lightestHex: '#fef7f6', // $og-50
	},
	{
		name: 'amber',
		hex: '#FFB952', // $al-400
		lighterHex: '#FFE2B8', // $al-200
		lightestHex: '#fefbf6', // $al-50
	},
	{
		name: 'gray',
		hex: '#9AA8B6', // $n-200
		lighterHex: '#ABB8C4', // $n-100
		lightestHex: '#D6DCE3', // $n-50
	},

	{
		name: 'dark',
		hex: '#3B4754', // $n-700
		lighterHex: '#647382', // $n-500
		lightestHex: '#99A6B2', // $n-300
	},

	{
		name: 'white',
		hex: '#FFFFFF', // $n-0
		lighterHex: '#FAFCFE', // $n-10
		lightestHex: '#F4F8FB', // $n-20
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

export const colorLightestHexCode = (value) => {
	const foundColor = colors.filter((color) => color.name === value)[0];
	return foundColor ? foundColor.lightestHex : '';
};
