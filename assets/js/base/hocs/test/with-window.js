/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import withWindow from '../with-window';

const render = ( propMap ) => {
	/* eslint-disable-next-line @wordpress/no-unused-vars-before-return */
	const TestComponent = withWindow( propMap )(
		( props ) => ( <div { ...props } /> )
	);

	return TestRenderer.create(
		<TestComponent
			greeting={ 'Hello' }
			name={ 'Alice' }
		/>
	);
};

describe( 'withWindow Component', () => {
	it( 'calls the propMap function with the window object and the props', () => {
		const propMap = jest.fn();
		const testFunction = jest.fn();
		propMap.mockImplementation(
			( window, props ) => {
				testFunction( window, props );
			}
		);

		render( propMap );

		expect( propMap ).toHaveBeenCalledWith( window, { name: 'Alice', greeting: 'Hello' } );
    expect( propMap ).toHaveBeenCalledTimes( 1 );
		expect( testFunction ).toHaveBeenCalledWith( window, { name: 'Alice', greeting: 'Hello' } );
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
