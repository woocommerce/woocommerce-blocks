/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { noop } from 'lodash';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { buildTermsTree } from './hierarchy';

/**
 * Component to handle edit mode of "On Sale Products".
 */
class ProductCategoriesBlock extends Component {
	getCategories() {
		const { hasEmpty, isDropdown, isHierarchical } = this.props.attributes;
		const categories = wc_product_block_data.productCategories.filter(
			( cat ) => hasEmpty || !! cat.count
		);
		return ! isDropdown && isHierarchical ? buildTermsTree( categories ) : categories;
	}

	getInspectorControls() {
		const {
			attributes: { hasCount, hasEmpty, isDropdown, isHierarchical },
			setAttributes,
		} = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<ToggleControl
						label={ __( 'Show as dropdown', 'woo-gutenberg-products-block' ) }
						help={
							isDropdown ?
								__( 'Categories are shown in a dropdown.', 'woo-gutenberg-products-block' ) :
								__( 'Categories are shown in a list.', 'woo-gutenberg-products-block' )
						}
						checked={ isDropdown }
						onChange={ () => setAttributes( { isDropdown: ! isDropdown } ) }
					/>
					<ToggleControl
						label={ __( 'Show product count', 'woo-gutenberg-products-block' ) }
						help={
							hasCount ?
								__( 'Product count is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Product count is hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ hasCount }
						onChange={ () => setAttributes( { hasCount: ! hasCount } ) }
					/>
					{ ! isDropdown && (
						<ToggleControl
							label={ __( 'Show hierarchy', 'woo-gutenberg-products-block' ) }
							help={
								isHierarchical ?
									__( 'Hierarchy is visible.', 'woo-gutenberg-products-block' ) :
									__( 'Hierarchy is hidden.', 'woo-gutenberg-products-block' )
							}
							checked={ isHierarchical }
							onChange={ () => setAttributes( { isHierarchical: ! isHierarchical } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show empty categories', 'woo-gutenberg-products-block' ) }
						help={
							hasEmpty ?
								__( 'Empty categories are visible.', 'woo-gutenberg-products-block' ) :
								__( 'Empty categories are hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ hasEmpty }
						onChange={ () => setAttributes( { hasEmpty: ! hasEmpty } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderList( items ) {
		const { hasCount } = this.props.attributes;
		const parentKey = 'parent-' + items[ 0 ].term_id;
		return (
			<ul key={ parentKey }>
				{ items.map( ( cat ) => {
					const count = hasCount ? <span>({ cat.count })</span> : null;
					return [
						<li key={ cat.term_id }><a>{ cat.name }</a> { count }</li>, // eslint-disable-line
						!! cat.children &&
							!! cat.children.length &&
							this.renderList( cat.children ),
					];
				} ) }
			</ul>
		);
	}

	renderDropdown( items ) {
		const { hasCount } = this.props.attributes;
		return (
			<SelectControl
				label={ __( 'Select a category', 'woo-gutenberg-products-block' ) }
				options={ items.map( ( cat ) => ( {
					label: hasCount ? `${ cat.name } (${ cat.count })` : cat.name,
					value: cat.term_id,
				} ) ) }
				onChange={ noop }
			/>
		);
	}

	render() {
		const { isDropdown } = this.props.attributes;
		const categories = this.getCategories();
		return (
			<div className="wc-block-product-categories">
				{ this.getInspectorControls() }
				{ isDropdown ? this.renderDropdown( categories ) : this.renderList( categories ) }
			</div>
		);
	}
}

ProductCategoriesBlock.propTypes = {
	/**
	 * The attributes for this block
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes
	 */
	setAttributes: PropTypes.func.isRequired,
};

export default ProductCategoriesBlock;
