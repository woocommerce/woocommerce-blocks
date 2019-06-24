/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { noop, repeat } from 'lodash';
import PropTypes from 'prop-types';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { buildTermsTree } from './hierarchy';

function getCategories( { hasEmpty, isHierarchical } ) {
	const categories = wc_product_block_data.productCategories.filter(
		( cat ) => hasEmpty || !! cat.count
	);
	return isHierarchical ?
		buildTermsTree( categories ) :
		categories;
}

/**
 * Component displaying the categories as dropdown or list.
 */
class ProductCategoriesBlock extends Component {
	constructor() {
		super( ...arguments );
		this.renderList = this.renderList.bind( this );
		this.renderOptions = this.renderOptions.bind( this );
	}

	renderList( items, depth = 0 ) {
		const { isPreview = false } = this.props;
		const { hasCount } = this.props.attributes;
		const parentKey = 'parent-' + items[ 0 ].term_id;

		return (
			<ul key={ parentKey }>
				{ items.map( ( cat ) => {
					const count = hasCount ? <span>({ cat.count })</span> : null;
					return [
						<li key={ cat.term_id }>
							<a href={ isPreview ? null : cat.link }>{ cat.name }</a> { count } { /* eslint-disable-line */ }
						</li>,
						!! cat.children && !! cat.children.length && this.renderList( cat.children, depth + 1 ),
					];
				} ) }
			</ul>
		);
	}

	renderOptions( items, depth = 0 ) {
		const { hasCount } = this.props.attributes;

		return items.map( ( cat ) => {
			const count = hasCount ? `(${ cat.count })` : null;
			return [
				<option key={ cat.term_id } value={ cat.term_id }>
					{ repeat( '–', depth ) } { cat.name } { count }
				</option>,
				!! cat.children && !! cat.children.length && this.renderOptions( cat.children, depth + 1 ),
			];
		} );
	}

	render() {
		const { attributes, instanceId } = this.props;
		const { isDropdown } = attributes;
		const categories = getCategories( attributes );

		const selectId = `prod-categories-${ instanceId }`;

		return (
			<div className="wc-block-product-categories">
				{ isDropdown ? (
					<Fragment>
						<label htmlFor={ selectId }>
							{ __( 'Select a category', 'woo-gutenberg-products-block' ) }
						</label>
						<select id={ selectId } onBlur={ noop }>
							{ this.renderOptions( categories ) }
						</select>
					</Fragment>
				) : (
					this.renderList( categories )
				) }
			</div>
		);
	}
}

ProductCategoriesBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * A unique ID for identifying the label for the select dropdown.
	 */
	instanceId: PropTypes.number,
	/**
	 * Whether this is the block preview or frontend display.
	 */
	isPreview: PropTypes.bool,
};

export default withInstanceId( ProductCategoriesBlock );
