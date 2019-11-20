/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import { SearchListControl, SearchListItem } from '@woocommerce/components';
import { SelectControl } from '@wordpress/components';
import { withCategories } from '@woocommerce/block-hocs';
import ErrorMessage from '@woocommerce/block-components/error-placeholder/error-message.js';

/**
 * Internal dependencies
 */
import './style.scss';

const ProductCategoryControl = ( {
	categories,
	error,
	isLoading,
	onChange,
	onOperatorChange,
	operator,
	selected,
	isSingle,
	showReviewCount,
} ) => {
	const renderItem = ( args ) => {
		const { item, search, depth = 0 } = args;
		const classes = [ 'woocommerce-product-categories__item' ];
		if ( search.length ) {
			classes.push( 'is-searching' );
		}
		if ( depth === 0 && item.parent !== 0 ) {
			classes.push( 'is-skip-level' );
		}

		const accessibleName = ! item.breadcrumbs.length
			? item.name
			: `${ item.breadcrumbs.join( ', ' ) }, ${ item.name }`;

		const listItemAriaLabel = showReviewCount
			? sprintf(
					_n(
						'%s, has %d review',
						'%s, has %d reviews',
						item.review_count,
						'woo-gutenberg-products-block'
					),
					accessibleName,
					item.review_count
			  )
			: sprintf(
					_n(
						'%s, has %d product',
						'%s, has %d products',
						item.count,
						'woo-gutenberg-products-block'
					),
					accessibleName,
					item.count
			  );

		const listItemCountLabel = showReviewCount
			? sprintf(
					_n(
						'%d Review',
						'%d Reviews',
						item.review_count,
						'woo-gutenberg-products-block'
					),
					item.review_count
			  )
			: sprintf(
					_n(
						'%d Product',
						'%d Products',
						item.count,
						'woo-gutenberg-products-block'
					),
					item.count
			  );
		return (
			<SearchListItem
				className={ classes.join( ' ' ) }
				{ ...args }
				showCount
				countLabel={ listItemCountLabel }
				aria-label={ listItemAriaLabel }
			/>
		);
	};

	const messages = {
		clear: __(
			'Clear all product categories',
			'woo-gutenberg-products-block'
		),
		list: __( 'Product Categories', 'woo-gutenberg-products-block' ),
		noItems: __(
			"Your store doesn't have any product categories.",
			'woo-gutenberg-products-block'
		),
		search: __(
			'Search for product categories',
			'woo-gutenberg-products-block'
		),
		selected: ( n ) =>
			sprintf(
				_n(
					'%d category selected',
					'%d categories selected',
					n,
					'woo-gutenberg-products-block'
				),
				n
			),
		updated: __(
			'Category search results updated.',
			'woo-gutenberg-products-block'
		),
	};

	if ( error ) {
		return <ErrorMessage error={ error } />;
	}

	return (
		<Fragment>
			<SearchListControl
				className="woocommerce-product-categories"
				list={ categories }
				isLoading={ isLoading }
				selected={ selected
					.map( ( id ) => find( categories, { id } ) )
					.filter( Boolean ) }
				onChange={ onChange }
				renderItem={ renderItem }
				messages={ messages }
				isHierarchical
				isSingle={ isSingle }
			/>
			{ !! onOperatorChange && (
				<div
					className={
						selected.length < 2 ? 'screen-reader-text' : ''
					}
				>
					<SelectControl
						className="woocommerce-product-categories__operator"
						label={ __(
							'Display products matching',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'Pick at least two categories to use this setting.',
							'woo-gutenberg-products-block'
						) }
						value={ operator }
						onChange={ onOperatorChange }
						options={ [
							{
								label: __(
									'Any selected categories',
									'woo-gutenberg-products-block'
								),
								value: 'any',
							},
							{
								label: __(
									'All selected categories',
									'woo-gutenberg-products-block'
								),
								value: 'all',
							},
						] }
					/>
				</div>
			) }
		</Fragment>
	);
};

ProductCategoryControl.propTypes = {
	/**
	 * Callback to update the selected product categories.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Callback to update the category operator. If not passed in, setting is not used.
	 */
	onOperatorChange: PropTypes.func,
	/**
	 * Setting for whether products should match all or any selected categories.
	 */
	operator: PropTypes.oneOf( [ 'all', 'any' ] ),
	/**
	 * The list of currently selected category IDs.
	 */
	selected: PropTypes.array.isRequired,
	/**
	 * Allow only a single selection. Defaults to false.
	 */
	isSingle: PropTypes.bool,
};

ProductCategoryControl.defaultProps = {
	operator: 'any',
	isSingle: false,
};

export default withCategories( ProductCategoryControl );
