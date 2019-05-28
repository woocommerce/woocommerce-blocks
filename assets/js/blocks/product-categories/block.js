/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
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
		const { isHierarchical, hasEmpty } = this.props.attributes;
		const categories = wc_product_block_data.productCategories.filter(
			( cat ) => hasEmpty || !! cat.count
		);
		return isHierarchical ? buildTermsTree( categories ) : categories;
	}

	getInspectorControls() {
		const {
			attributes: { hasCount, hasEmpty, isHierarchical },
			setAttributes,
		} = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
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
					<ToggleControl
						label={ __( 'Show product count', 'woo-gutenberg-products-block' ) }
						help={
							isHierarchical ?
								__( 'Product count is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Product count is hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ hasCount }
						onChange={ () => setAttributes( { hasCount: ! hasCount } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderList( items ) {
		const { hasCount } = this.props.attributes;
		return (
			<ul>
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

	render() {
		return (
			<div className="wc-block-product-categories">
				{ this.getInspectorControls() }
				{ this.renderList( this.getCategories() ) }
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
