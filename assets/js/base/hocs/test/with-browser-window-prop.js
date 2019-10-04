/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import withBrowserWindowProp from '../with-browser-window-prop';

const windowProp = 'location';
const render = ( propMap ) => {
	/* eslint-disable-next-line @wordpress/no-unused-vars-before-return */
	const TestComponent = withBrowserWindowProp( windowProp, propMap )(
		( props ) => <div { ...props } />
	);

	return TestRenderer.create(
		<TestComponent greeting={ 'Hello' } name={ 'Alice' } />
	);
};

describe( 'withBrowserWindowProp Component', () => {
	it( 'calls the propMap function with the window property and the props', () => {
		const propMap = jest.fn();
		const testFunction = jest.fn();
		propMap.mockImplementation( ( wProp, props ) => {
			testFunction( wProp, props );
		} );

		render( propMap );

		expect( propMap ).toHaveBeenCalledWith( window[ windowProp ], {
			name: 'Alice',
			greeting: 'Hello',
		} );
		expect( propMap ).toHaveBeenCalledTimes( 1 );
		expect( testFunction ).toHaveBeenCalledWith( window[ windowProp ], {
			name: 'Alice',
			greeting: 'Hello',
		} );
		expect( testFunction ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'sets the resulting props from the propMap into the resulting component', () => {
		const propMap = () => ( { greeting: 'Good morning' } );

		const renderer = render( propMap );

		const props = renderer.root.findByType( 'div' ).props;
		expect( props.name ).toBe( 'Alice' );
		expect( props.greeting ).toBe( 'Good morning' );
	} );
} );
