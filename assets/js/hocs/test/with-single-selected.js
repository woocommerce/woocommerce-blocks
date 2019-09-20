/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import withSingleSelected from '../with-single-selected';

const TestComponent = withSingleSelected( ( props ) => {
	return <div selected={ props.selected } />;
} );

describe( 'withSingleSelected Component', () => {
	describe( 'when the API returns an error', () => {
		it( 'converts the selected value into an array', () => {
			const selected = 123;
			const renderer = TestRenderer.create(
				<TestComponent selected={ selected } />
			);
			const props = renderer.root.findByType( 'div' ).props;
			expect( props.selected ).toEqual( [ selected ] );
		} );

		it( 'passes an empty array as the selected prop if selected was null', () => {
			const renderer = TestRenderer.create(
				<TestComponent selected={ null } />
			);
			const props = renderer.root.findByType( 'div' ).props;
			expect( props.selected ).toEqual( [] );
		} );
	} );
} );
