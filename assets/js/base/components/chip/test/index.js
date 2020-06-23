/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import Chip from '../';

describe( 'Chip', () => {
	describe( 'without custom wrapper', () => {
		test( 'should render text and the remove button', () => {
			const component = TestRenderer.create( <Chip text="Test" /> );

			expect( component.toJSON() ).toMatchSnapshot();
		} );

		test( 'should render nodes as the text', () => {
			const component = TestRenderer.create(
				<Chip text={ <h1>Test</h1> } />
			);

			expect( component.toJSON() ).toMatchSnapshot();
		} );

		test( 'should render defined radius', () => {
			const component = TestRenderer.create(
				<Chip text="Test" radius="large" />
			);

			expect( component.toJSON() ).toMatchSnapshot();
		} );

		test( 'should render with disabled remove button', () => {
			const component = TestRenderer.create(
				<Chip text="Test" disabled={ true } />
			);

			expect( component.toJSON() ).toMatchSnapshot();
		} );

		test( 'should render screen reader text', () => {
			const component = TestRenderer.create(
				<Chip text="Test" screenReaderText="Test 2" />
			);

			expect( component.toJSON() ).toMatchSnapshot();
		} );

		test( 'should render custom aria label', () => {
			const component = TestRenderer.create(
				<Chip text="Test" ariaLabel="Aria test" />
			);

			expect( component.toJSON() ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom wrapper', () => {
		test( 'should render a chip made up of a div instead of a li', () => {
			const component = TestRenderer.create(
				<Chip text="Test" element="div" />
			);

			expect( component.toJSON() ).toMatchSnapshot();
		} );
	} );

	describe( 'with removeOnClick', () => {
		test( 'should be a button when removeOnClick is set to true', () => {
			const component = TestRenderer.create(
				<Chip text="Test" removeOnClick={ true } />
			);

			expect( component.toJSON() ).toMatchSnapshot();
		} );
	} );
} );
