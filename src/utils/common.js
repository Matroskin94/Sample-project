export const getFormatedDate = date => {
	return date.getFullYear() + '-'
			+ date.getMonth() + 1 + '-'
			+ date.getDate();
};

export const noop = () => {};
