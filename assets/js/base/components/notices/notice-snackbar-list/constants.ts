export const SNACKBAR_VARIANTS = {
	init: {
		height: 0,
		opacity: 0,
	},
	open: {
		height: 'auto',
		opacity: 1,
		transition: {
			height: { stiffness: 1000, velocity: -100 },
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.5,
		},
	},
};
