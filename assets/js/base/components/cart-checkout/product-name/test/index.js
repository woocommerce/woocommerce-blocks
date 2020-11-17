/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import ProductName from '..';

describe( 'ProductName', () => {
	test( 'should not render a link if hasLink is false', () => {
		const component = TestRenderer.create(
			<ProductName hasLink={ false } name={ 'Test product' } />
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render a link if hasLink is true', () => {
		const component = TestRenderer.create(
			<ProductName hasLink={ true } name={ 'Test product' } />
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render a link if hasLink is not defined', () => {
		const component = TestRenderer.create(
			<ProductName name={ 'Test product' } />
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
