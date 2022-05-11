/**
 * Internal dependencies
 */
import {
	getValidationErrorId,
	getValidationError,
	hasValidationErrors,
} from '../selectors';
//Test suite for validation selectors
describe( 'Validation selectors', () => {
	//Checks if it get existing validation error
	it( 'Can get the validation error ', () => {
		const state = {
			validationError: {
				message: 'This is a test message',
				hidden: false,
			},
		};
		const validationError = getValidationError( state, 'validationError' );
		expect( validationError ).toEqual( {
			message: 'This is a test message',
			hidden: false,
		} );
	} );
	//Checks if it get existing validation error id
	it( 'Can get the validation id', () => {
		const state = {
			validationError: {
				message: 'This is a test message',
				hidden: false,
			},
		};
		const validationErrorID = getValidationErrorId(
			state,
			'validationError'
		);
		expect( validationErrorID ).toEqual( `validate-error-validationError` );
	} );
	//Checks if state has validation error
	it( 'Can check if state has any validation errors', () => {
		const state = {
			validationError: {
				message: 'This is a test message',
				hidden: false,
			},
		};
		const validationErrors = hasValidationErrors( state );
		expect( validationErrors ).toEqual( true );
	} );
} );
