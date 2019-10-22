/**
 * Internal dependencies
 */
import { getCollection } from '../selectors';

describe( 'getCollection', () => {
	const state = {
		'wc/blocks': {
			products: {
				'[]': {
					'?someQuery=2': [ 'foo' ],
				},
			},
			'products/attributes': {
				'[10]': {
					'?someQuery=2': [ 'bar' ],
				},
			},
			'products/attributes/terms': {
				'[10, 20]': {
					'?someQuery=10': [ 42 ],
				},
			},
		},
	};
	it( 'returns empty array when namespace does not exist in state', () => {
		expect( getCollection( state, 'invalid', 'products' ) ).toEqual( [] );
	} );
	it( 'returns empty array when modelName does not exist in state', () => {
		expect( getCollection( state, 'wc/blocks', 'invalid' ) ).toEqual( [] );
	} );
	it( 'returns empty array when query does not exist in state', () => {
		expect( getCollection( state, 'wc/blocks', 'products' ) ).toEqual( [] );
	} );
	it( 'returns empty array when ids do not exist in state', () => {
		expect(
			getCollection(
				state,
				'wc/blocks',
				'products/attributes',
				'?someQuery=2',
				[ 20 ]
			)
		).toEqual( [] );
	} );
	describe( 'returns expected values for items existing in state', () => {
		test.each`
			modelName                      | ids          | query                | expected
			${'products'}                  | ${'[]'}      | ${{ someQuery: 2 }}  | ${[ 'foo' ]}
			${'products/attributes'}       | ${'[10]'}    | ${{ someQuery: 2 }}  | ${[ 'bar' ]}
			${'products/attributes/terms'} | ${'[10,30]'} | ${{ someQuery: 10 }} | ${[ 42 ]}
		`(
			'for "$modelName", "$ids", and "$query"',
			( { modelName, ids, query } ) => {
				expect(
					getCollection( state, 'wc/blocks', modelName, query, ids )
				);
			}
		);
	} );
} );
