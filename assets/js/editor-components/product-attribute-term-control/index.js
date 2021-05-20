/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { SearchListControl, SearchListItem } from '@woocommerce/components';
import { SelectControl, Spinner } from '@wordpress/components';
import { withAttributes } from '@woocommerce/block-hocs';
import ErrorMessage from '@woocommerce/editor-components/error-placeholder/error-message.js';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

const ProductAttributeTermControl = ( {
	attributes,
	error,
	expandedAttribute,
	onChange,
	onExpandAttribute,
	onOperatorChange,
	isCompact,
	isLoading,
	operator,
	selected,
	termsAreLoading,
	termsList,
} ) => {
	const onSelectAttribute = ( item ) => {
		return () => {
			onChange( [] );
			onExpandAttribute( item.id );
		};
	};

	const renderItem = ( args ) => {
		const { item, search, depth = 0 } = args;
		const classes = [
			'woocommerce-product-attributes__item',
			'woocommerce-search-list__item',
			{
				'is-searching': search.length > 0,
				'is-skip-level': depth === 0 && item.parent !== 0,
			},
		];

		if ( ! item.breadcrumbs.length ) {
			return [
				<SearchListItem
					key={ `attr-${ item.id }` }
					{ ...args }
					className={ classNames( ...classes ) }
					isSelected={ expandedAttribute === item.id }
					onSelect={ onSelectAttribute }
					isSingle
					disabled={ item.count === '0' }
					aria-expanded={ expandedAttribute === item.id }
					aria-label={ sprintf(
						/* translators: %1$s is the item name, %2$d is the count of terms for the item. */
						_n(
							'%1$s, has %2$d term',
							'%1$s, has %2$d terms',
							item.count,
							'woo-gutenberg-products-block'
						),
						item.name,
						item.count
					) }
				/>,
				expandedAttribute === item.id && termsAreLoading && (
					<div
						key="loading"
						className={
							'woocommerce-search-list__item woocommerce-product-attributes__item' +
							'depth-1 is-loading is-not-active'
						}
					>
						<Spinner />
					</div>
				),
			];
		}

		return (
			<SearchListItem
				className={ classNames( ...classes, 'has-count' ) }
				{ ...args }
				aria-label={ `${ item.breadcrumbs[ 0 ] }: ${ item.name }` }
			/>
		);
	};

	const currentTerms = termsList[ expandedAttribute ] || [];
	const currentList = [ ...attributes, ...currentTerms ];

	const messages = {
		clear: __(
			'Clear all product attributes',
			'woo-gutenberg-products-block'
		),
		list: __( 'Product Attributes', 'woo-gutenberg-products-block' ),
		noItems: __(
			"Your store doesn't have any product attributes.",
			'woo-gutenberg-products-block'
		),
		search: __(
			'Search for product attributes',
			'woo-gutenberg-products-block'
		),
		selected: ( n ) =>
			sprintf(
				/* translators: %d is the count of attributes selected. */
				_n(
					'%d attribute selected',
					'%d attributes selected',
					n,
					'woo-gutenberg-products-block'
				),
				n
			),
		updated: __(
			'Product attribute search results updated.',
			'woo-gutenberg-products-block'
		),
	};

	if ( error ) {
		return <ErrorMessage error={ error } />;
	}

	return (
		<>
			<SearchListControl
				className="woocommerce-product-attributes"
				list={ currentList }
				isLoading={ isLoading }
				selected={ selected
					.map( ( { id } ) =>
						currentList.find(
							( currentListItem ) => currentListItem.id === id
						)
					)
					.filter( Boolean ) }
				onChange={ onChange }
				renderItem={ renderItem }
				messages={ messages }
				isCompact={ isCompact }
				isHierarchical
			/>
			{ !! onOperatorChange && (
				<div
					className={
						selected.length < 2 ? 'screen-reader-text' : ''
					}
				>
					<SelectControl
						className="woocommerce-product-attributes__operator"
						label={ __(
							'Display products matching',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'Pick at least two attributes to use this setting.',
							'woo-gutenberg-products-block'
						) }
						value={ operator }
						onChange={ onOperatorChange }
						options={ [
							{
								label: __(
									'Any selected attributes',
									'woo-gutenberg-products-block'
								),
								value: 'any',
							},
							{
								label: __(
									'All selected attributes',
									'woo-gutenberg-products-block'
								),
								value: 'all',
							},
						] }
					/>
				</div>
			) }
		</>
	);
};

ProductAttributeTermControl.propTypes = {
	/**
	 * Callback to update the selected product attributes.
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
	 * The list of currently selected attribute slug/ID pairs.
	 */
	selected: PropTypes.array.isRequired,
	// from withAttributes
	attributes: PropTypes.array,
	error: PropTypes.object,
	expandedAttribute: PropTypes.number,
	onExpandAttribute: PropTypes.func,
	isCompact: PropTypes.bool,
	isLoading: PropTypes.bool,
	termsAreLoading: PropTypes.bool,
	termsList: PropTypes.object,
};

ProductAttributeTermControl.defaultProps = {
	isCompact: false,
	operator: 'any',
};

export default withAttributes( ProductAttributeTermControl );
