/**
 * External dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDataContextProvider } from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import { Block } from '../block';

jest.mock( '@woocommerce/block-settings', () => ( {
	__esModule: true,
	PLACEHOLDER_IMG_SRC: 'placeholder.jpg',
} ) );

const productWithoutImages = {
	name: 'Test product',
	id: 1,
	fallbackAlt: 'Test product',
	permalink: 'http://test.com/product/test-product/',
	images: [],
};

const productWithImages = {
	name: 'Test product',
	id: 1,
	fallbackAlt: 'Test product',
	permalink: 'http://test.com/product/test-product/',
	images: [
		{
			id: 56,
			src: 'http://localhost:10003/wp-content/uploads/2021/01/logo-1.jpg',
			thumbnail:
				'http://localhost:10003/wp-content/uploads/2021/01/logo-1-324x324.jpg',
			srcset:
				'http://localhost:10003/wp-content/uploads/2021/01/logo-1.jpg 800w, http://localhost:10003/wp-content/uploads/2021/01/logo-1-300x300.jpg 300w, http://localhost:10003/wp-content/uploads/2021/01/logo-1-150x150.jpg 150w, http://localhost:10003/wp-content/uploads/2021/01/logo-1-768x767.jpg 768w, http://localhost:10003/wp-content/uploads/2021/01/logo-1-324x324.jpg 324w, http://localhost:10003/wp-content/uploads/2021/01/logo-1-416x415.jpg 416w, http://localhost:10003/wp-content/uploads/2021/01/logo-1-100x100.jpg 100w',
			sizes: '(max-width: 800px) 100vw, 800px',
			name: 'logo-1.jpg',
			alt: '',
		},
		{
			id: 55,
			src:
				'http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1.jpg',
			thumbnail:
				'http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1-324x324.jpg',
			srcset:
				'http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1.jpg 800w, http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1-300x300.jpg 300w, http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1-150x150.jpg 150w, http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1-768x768.jpg 768w, http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1-324x324.jpg 324w, http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1-416x416.jpg 416w, http://localhost:10003/wp-content/uploads/2021/01/beanie-with-logo-1-100x100.jpg 100w',
			sizes: '(max-width: 800px) 100vw, 800px',
			name: 'beanie-with-logo-1.jpg',
			alt: '',
		},
	],
};

describe( 'Product Image Block', () => {
	describe( 'with product link', () => {
		test( 'should render an anchor with the product image', () => {
			const component = render(
				<ProductDataContextProvider product={ productWithImages }>
					<Block productLink />
				</ProductDataContextProvider>
			);

			const image = screen.getByTestId( 'product-image' );
			fireEvent.load( image );

			expect( component ).toMatchSnapshot();
		} );
		test( 'should render an anchor with the placeholder image', () => {
			const component = render(
				<ProductDataContextProvider product={ productWithoutImages }>
					<Block productLink />
				</ProductDataContextProvider>
			);
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'without product link', () => {
		test( 'should render an anchor with the product image', () => {
			const component = render(
				<ProductDataContextProvider product={ productWithImages }>
					<Block productLink={ false } />
				</ProductDataContextProvider>
			);
			const image = screen.getByTestId( 'product-image' );
			fireEvent.load( image );
			expect( component ).toMatchSnapshot();
		} );
		test( 'should render an anchor with the placeholder image', () => {
			const component = render(
				<ProductDataContextProvider product={ productWithoutImages }>
					<Block productLink={ false } />
				</ProductDataContextProvider>
			);
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
