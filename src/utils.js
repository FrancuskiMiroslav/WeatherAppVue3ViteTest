export const isValidLocation = (location, responseName) => {
	// Check if the location string contains only letters and spaces
	const validChars = /^[A-Za-z\s]+$/;
	if (!validChars.test(location)) {
		return false;
	}

	// Check if the location input matches the location name returned by the API
	if (location.toLowerCase() !== responseName.toLowerCase() && responseName === null) {
		return false;
	}

	return true;
};
