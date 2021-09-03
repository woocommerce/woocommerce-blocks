export type ValidationContextError = {
	message: string;
	hidden: boolean;
};

export type ValidationData = {
	hasValidationErrors: boolean;
	getValidationError: () => ValidationContextError;
	clearValidationError: () => void;
	hideValidationError: () => void;
	setValidationError: ( error: ValidationContextError ) => void;
};
