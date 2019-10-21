export const hasExisting = (
	state,
	namespace,
	modelName,
	ids,
	queryString
) => {
	return (
		state[ namespace ] &&
		state[ namespace ][ modelName ] &&
		state[ namespace ][ modelName ][ ids ] &&
		state[ namespace ][ modelName ][ ids ][ queryString ]
	);
};
