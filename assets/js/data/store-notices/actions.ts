export const registerContainer = (
	containerContext: string,
	ref: React.MutableRefObject< HTMLDivElement | null >
) => {
	return {
		type: 'REGISTER_CONTAINER',
		containerContext,
		ref,
	};
};

export const unregisterContainer = ( containerContext: string ) => {
	return {
		type: 'UNREGISTER_CONTAINER',
		containerContext,
	};
};
