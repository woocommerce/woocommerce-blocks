/**
 * Internal dependencies
 */
import { formatError } from '../errors';

describe( 'formatError', () => {
	test( 'should format frontend errors', async () => {
		const error = await formatError( {
			message: 'Lorem Ipsum',
		} );
		const expectedError = {
			frontendMessage: 'Lorem Ipsum',
		};

		expect( error ).toEqual( expectedError );
	} );

	test( 'should format API errors', async () => {
		const error = await formatError( {
			json: () => Promise.resolve( { message: 'Lorem Ipsum' } ),
		} );
		const expectedError = {
			apiMessage: 'Lorem Ipsum',
		};

		expect( error ).toEqual( expectedError );
	} );

	test( 'should format JSON parse errors', async () => {
		const error = await formatError( {
			json: () => Promise.reject( { message: 'Lorem Ipsum' } ),
		} );
		const expectedError = {
			frontendMessage: 'Lorem Ipsum',
		};

		expect( error ).toEqual( expectedError );
	} );
} );
