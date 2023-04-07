/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import ProductTitle from '..';

describe( 'ProductTitle', () => {
	test( 'should render a span when heading level is false', () => {
		const component = TestRenderer.create(
			<ProductTitle
				headingLevel={ false }
				showProductLink={ false }
				product={ {
					id: 1,
					name: 'Test Product',
					permalink: '/',
				} }
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render an H2 when heading level is 2', () => {
		const component = TestRenderer.create(
			<ProductTitle
				headingLevel={ 2 }
				showProductLink={ false }
				product={ {
					id: 1,
					name: 'Test Product',
					permalink: '/',
				} }
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should not render a link if showProductLink is false', () => {
		const component = TestRenderer.create(
			<ProductTitle
				headingLevel={ false }
				showProductLink={ false }
				product={ {
					id: 1,
					name: 'Test Product',
					permalink: '/',
				} }
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render a link if showProductLink is true', () => {
		const component = TestRenderer.create(
			<ProductTitle
				headingLevel={ false }
				showProductLink={ true }
				product={ {
					id: 1,
					name: 'Test Product',
					permalink: '/',
				} }
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render custom class name', () => {
		const component = TestRenderer.create(
			<ProductTitle
				headingLevel={ false }
				showProductLink={ true }
				className="lorem-ipsum"
				product={ {
					id: 1,
					name: 'Test Product',
					permalink: '/',
				} }
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );

	test( 'should render correct link target', () => {
		const component = TestRenderer.create(
			<ProductTitle
				headingLevel={ false }
				showProductLink={ true }
				product={ {
					id: 1,
					name: 'Test Product',
					permalink: '/',
				} }
				linkTarget="_blank"
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
