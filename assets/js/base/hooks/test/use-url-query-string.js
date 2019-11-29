/**
 * External dependencies
 */
import TestRenderer, { act } from 'react-test-renderer';

/**
 * Internal dependencies
 */
import { useUrlQueryString } from '../use-url-query-string';

describe( 'useUrlQueryString', () => {
	const TestComponent = ( { testStateObj } ) => {
		const [ urlState/*, updateHistory */ ] = useUrlQueryString( testStateObj )
		return <div urlState={ urlState } />;
	};

	let renderer;
	beforeEach( () => ( renderer = null ) );

	it( 'returns default value in specified key', () => {
		act( () => {
			renderer = TestRenderer.create( <TestComponent testStateObj={ {
				'queryOption': 42
			} } /> );
		} );

		const testStateObj = renderer.root.findByType( 'div' ).props.urlState;

		expect( testStateObj ).toHaveProperty( 'queryOption', 42 );
	} );
} );
