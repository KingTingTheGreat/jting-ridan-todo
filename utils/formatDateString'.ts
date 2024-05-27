const formatDateString = (dateString: string): string => {
	return String(new Date(dateString))
		.replace(/\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+/, function ($0, $1, $2, $3, $4, $5) {
			return $1 + " " + $2 + ", " + $3 + " - " + ($4 % 12 || 12) + ":" + $5 + (+$4 >= 12 ? " PM" : " AM");
		})
		.split("(")[0];
};

export default formatDateString;
