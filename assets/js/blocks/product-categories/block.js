/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { noop } from 'lodash';
import { SelectControl } from '@wordpress/components';
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
};

export default ProductCategoriesBlock;
