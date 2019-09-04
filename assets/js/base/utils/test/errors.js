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
			message: 'Lorem Ipsum',
			type: 'frontend',
		};

		expect( error ).toEqual( expectedError );
	} );

	test( 'should format API errors', async () => {
		const error = await formatError( {
			json: () => Promise.resolve( { message: 'Lorem Ipsum' } ),
		} );
		const expectedError = {
			message: 'Lorem Ipsum',
			type: 'api',
		};

		expect( error ).toEqual( expectedError );
	} );

	test( 'should format JSON parse errors', async () => {
		const error = await formatError( {
			json: () => Promise.reject( { message: 'Lorem Ipsum' } ),
		} );
		const expectedError = {
			message: 'Lorem Ipsum',
			type: 'frontend',
		};

		expect( error ).toEqual( expectedError );
	} );
} );
