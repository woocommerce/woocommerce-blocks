/**
 * External dependencies
 */
import { select, apiFetch } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { getCollection } from '../resolvers';
import { receiveCollection } from '../actions';
import { STORE_KEY as SCHEMA_STORE_KEY } from '../../schema/constants';

jest.mock( '@wordpress/data-controls' );

describe( 'getCollection', () => {
	describe( 'yields with expected responses', () => {
		let fulfillment;
		const testArgs = [
			'wc/blocks',
			'products',
			{ foo: 'bar' },
			[ 20, 30 ],
		];
		const rewind = () => ( fulfillment = getCollection( ...testArgs ) );
		test( 'with getRoute call invoked to retrieve route', () => {
			rewind();
			fulfillment.next();
			expect( select ).toHaveBeenCalledWith(
				SCHEMA_STORE_KEY,
				'getRoute',
				testArgs[ 0 ],
				testArgs[ 1 ],
				testArgs[ 3 ]
			);
		} );
		test(
			'when no route is retrieved, yields receiveCollection and ' +
				'	returns',
			() => {
				const { value } = fulfillment.next();
				expect( value ).toEqual(
					receiveCollection(
						'wc/blocks',
						'products',
						'?foo=bar',
						[ 20, 30 ],
						[]
					)
				);
				const { done } = fulfillment.next();
				expect( done ).toBe( true );
			}
		);
		test(
			'when route is retrieved, yields apiFetch control action with ' +
				'expected route',
			() => {
				rewind();
				fulfillment.next();
				const { value } = fulfillment.next( 'https://example.org' );
				expect( value ).toEqual(
					apiFetch( { path: 'https://example.org?foo=bar' } )
				);
			}
		);
		test(
			'when apiFetch does not return a valid response, yields ' +
				'expected action',
			() => {
				const { value } = fulfillment.next();
				expect( value ).toEqual(
					receiveCollection(
						'wc/blocks',
						'products',
						'?foo=bar',
						[ 20, 30 ],
						[]
					)
				);
			}
		);
		test(
			'when apiFetch returns a valid response, yields expected ' +
				'action',
			() => {
				rewind();
				fulfillment.next();
				fulfillment.next( 'https://example.org' );
				const { value } = fulfillment.next( [ '42', 'cheeseburgers' ] );
				expect( value ).toEqual(
					receiveCollection(
						'wc/blocks',
						'products',
						'?foo=bar',
						[ 20, 30 ],
						[ '42', 'cheeseburgers' ]
					)
				);
				const { done } = fulfillment.next();
				expect( done ).toBe( true );
			}
		);
	} );
} );
