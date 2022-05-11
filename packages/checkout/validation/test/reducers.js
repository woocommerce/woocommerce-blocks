/**
 * Internal dependencies
 */
import reducer from '../reducers';
import { ACTION_TYPES as types } from '.././action-types';

//Test suite for error validations
describe( 'Validation reducer', () => {
	//Checks if it can add a new validation error to the state
	it( 'Sets a single validation error', () => {
		const singleValidationAction = {
			type: types.SET_VALIDATION_ERRORS,
			errors: {
				singleValidationError: {
					message: 'This is a single validation error message',
					hidden: false,
				},
			},
		};
		const nextState = reducer( {}, singleValidationAction );
		expect( nextState ).toEqual( {
			singleValidationError: {
				message: 'This is a single validation error message',
				hidden: false,
			},
		} );
	} );
	//Checks if it does not add new error if its already exist in the state
	it( 'Does not add new errors if same error already exists in state', () => {
		const state = {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
		};
		const existingErrorValidation = {
			type: types.SET_VALIDATION_ERRORS,
			errors: {
				existingError: {
					message: 'This is an existing error message',
					hidden: false,
				},
			},
		};
		const nextState = reducer( state, existingErrorValidation );
		expect( nextState ).toEqual( {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
		} );
	} );
	//Checks if it does not add new error if error message is a string
	it( 'Does not add new errors if error message is not string and keep existing errors', () => {
		const integerErrorAction = {
			type: types.SET_VALIDATION_ERRORS,
			errors: {
				integerError: {
					message: 1234,
					hidden: false,
				},
			},
		};
		const nextState = reducer( {}, integerErrorAction );
		expect( nextState ).not.toHaveProperty( 'integerError' );
	} );
	//Checks if it updates the existing error in the state
	it( 'Updates existing error if message or hidden changes ', () => {
		const state = {
			existingValidationError: {
				message: 'This is an existing error message',
				hidden: false,
			},
		};
		const updateExistingErrorAction = {
			type: types.SET_VALIDATION_ERRORS,
			errors: {
				existingValidationError: {
					message: 'This is an existing error message',
					hidden: true,
				},
			},
		};
		const nextState = reducer( state, updateExistingErrorAction );
		expect( nextState ).toEqual( {
			existingValidationError: {
				message: 'This is an existing error message',
				hidden: true,
			},
		} );
	} );
	//Checks if it appends a new error to the state
	it( 'Appends new errors to list of existing errors ', () => {
		const state = {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
		};
		const addNewError = {
			type: types.SET_VALIDATION_ERRORS,
			errors: {
				newError: {
					message: 'This is a new error',
					hidden: false,
				},
			},
		};
		const nextState = reducer( state, addNewError );
		expect( nextState ).toEqual( {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
			newError: {
				message: 'This is a new error',
				hidden: false,
			},
		} );
	} );
	//Checks if it clears all the errors
	it( 'Clear all validation errors', () => {
		const state = {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
		};
		const clearAllErrors = {
			type: types.CLEAR_ALL_VALIDATION_ERRORS,
		};
		const nextState = reducer( state, clearAllErrors );
		expect( nextState ).toEqual( {} );
	} );
	//Checks if it clears a single error
	it( 'Clear single validation error', () => {
		const state = {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
			testError: {
				message: 'This is error should not be removed',
				hidden: false,
			},
		};
		const clearError = {
			type: types.CLEAR_VALIDATION_ERROR,
			error: 'existingError',
		};
		const nextState = reducer( state, clearError );
		expect( nextState ).not.toHaveProperty( 'existingError' );
		expect( nextState ).toHaveProperty( 'testError' );
	} );
	//Checks if it hides an error
	it( 'Hide single validation error', () => {
		const state = {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
			testError: {
				message: 'This is error should not be removed',
				hidden: false,
			},
		};
		const testAction = {
			type: types.HIDE_VALIDATION_ERROR,
			error: 'existingError',
		};
		const nextState = reducer( state, testAction );
		expect( nextState ).toEqual( {
			existingError: {
				message: 'This is an existing error message',
				hidden: true,
			},
			testError: {
				message: 'This is error should not be removed',
				hidden: false,
			},
		} );
	} );
	//Checks if it display a single error
	it( 'Show single validation error', () => {
		const state = {
			existingError: {
				message: 'This is an existing error message',
				hidden: true,
			},
			testError: {
				message: 'This is error should not be removed',
				hidden: true,
			},
		};
		const testAction = {
			type: types.SHOW_VALIDATION_ERROR,
			error: 'existingError',
		};
		const nextState = reducer( state, testAction );
		expect( nextState ).toEqual( {
			existingError: {
				message: 'This is an existing error message',
				hidden: false,
			},
			testError: {
				message: 'This is error should not be removed',
				hidden: true,
			},
		} );
	} );
	//Checks if it display all errors
	it( 'Show all validation errors', () => {
		const state = {
			firstExistingError: {
				message: 'This is first existing error message',
				hidden: true,
			},
			secondExistingError: {
				message: 'This is the second existing error message',
				hidden: true,
			},
		};
		const showAllErrors = {
			type: types.SHOW_ALL_VALIDATION_ERRORS,
		};
		const nextState = reducer( state, showAllErrors );
		expect( nextState ).toEqual( {
			firstExistingError: {
				message: 'This is first existing error message',
				hidden: false,
			},
			secondExistingError: {
				message: 'This is the second existing error message',
				hidden: false,
			},
		} );
	} );
} );
