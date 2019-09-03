/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl, SelectControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

export const getSharedContentControls = ( attributes, setAttributes ) => {
	const { contentVisibility } = attributes;
	const { button, price, rating, title, image } = contentVisibility;
	return (
		<Fragment>
			<ToggleControl
				label={ __( 'Image', 'woo-gutenberg-products-block' ) }
				checked={ image }
				onChange={ () => setAttributes( { contentVisibility: { ...contentVisibility, image: ! image } } ) }
			/>
			<ToggleControl
				label={ __( 'Product Title', 'woo-gutenberg-products-block' ) }
				checked={ title }
				onChange={ () => setAttributes( { contentVisibility: { ...contentVisibility, title: ! title } } ) }
			/>
			<ToggleControl
				label={ __( 'Product Rating', 'woo-gutenberg-products-block' ) }
				checked={ rating }
				onChange={ () => setAttributes( { contentVisibility: { ...contentVisibility, rating: ! rating } } ) }
			/>
			<ToggleControl
				label={ __( 'Product Price', 'woo-gutenberg-products-block' ) }
				checked={ price }
				onChange={ () => setAttributes( { contentVisibility: { ...contentVisibility, price: ! price } } ) }
			/>
			<ToggleControl
				label={ __( 'Call-to-action Button', 'woo-gutenberg-products-block' ) }
				checked={ button }
				onChange={ () => setAttributes( { contentVisibility: { ...contentVisibility, button: ! button } } ) }
			/>
		</Fragment>
	);
};

export const getSharedListControls = ( attributes, setAttributes ) => {
	return (
		<Fragment>
			<ToggleControl
				label={ __( 'Order by', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showOrderby }
				onChange={ () => setAttributes( { showOrderby: ! attributes.showOrderby } ) }
			/>
			<SelectControl
				label={ __( 'Order Products By', 'woo-gutenberg-products-block' ) }
				value={ attributes.orderby }
				options={ [
					{
						label: __( 'Newness - newest first', 'woo-gutenberg-products-block' ),
						value: 'date',
					},
					{
						label: __( 'Price - low to high', 'woo-gutenberg-products-block' ),
						value: 'price_asc',
					},
					{
						label: __( 'Price - high to low', 'woo-gutenberg-products-block' ),
						value: 'price_desc',
					},
					{
						label: __( 'Rating - highest first', 'woo-gutenberg-products-block' ),
						value: 'rating',
					},
					{
						label: __( 'Sales - most first', 'woo-gutenberg-products-block' ),
						value: 'popularity',
					},
					{
						label: __( 'Title - alphabetical', 'woo-gutenberg-products-block' ),
						value: 'title',
					},
					{
						label: __( 'Menu Order', 'woo-gutenberg-products-block' ),
						value: 'menu_order',
					},
				] }
				onChange={ ( orderby ) => setAttributes( { orderby } ) }
			/>
		</Fragment>
	);
};
