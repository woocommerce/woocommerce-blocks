/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { Component, Fragment } from '@wordpress/element';
import { debounce, find } from 'lodash';
import PropTypes from 'prop-types';
import { SelectControl, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';
import SearchListControl from '../search-list-control';
import SearchListItem from '../search-list-control/item';

class ProductAttributeControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			list: [],
			loading: true,
			attribute: 0,
			termsList: {},
			termsLoading: true,
		};

		this.debouncedGetTerms = debounce( this.getTerms.bind( this ), 200 );
		this.renderItem = this.renderItem.bind( this );
		this.onSelectAttribute = this.onSelectAttribute.bind( this );
	}

	componentDidMount() {
		const { selected } = this.props;
		apiFetch( {
			path: addQueryArgs( '/wc-pb/v3/products/attributes', { per_page: -1 } ),
		} )
			.then( ( list ) => {
				list = list.map( ( item ) => ( { ...item, parent: 0 } ) );
				this.setState( ( { attribute } ) => {
					if ( ! attribute && selected.length > 0 ) {
						const item = find( list, { slug: selected[ 0 ].attr_slug } );
						attribute = item ? item.id : 0;
					}
					return { list, attribute, loading: false };
				} );
			} )
			.catch( () => {
				this.setState( { list: [], loading: false } );
			} );
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( prevState.attribute !== this.state.attribute ) {
			this.debouncedGetTerms();
		}
	}

	getTerms() {
		const { attribute, termsList } = this.state;
		if ( ! attribute ) {
			return;
		}
		if ( ! termsList[ attribute ] ) {
			this.setState( { termsLoading: true } );
		}

		apiFetch( {
			path: addQueryArgs( `/wc-pb/v3/products/attributes/${ attribute }/terms`, {
				per_page: -1,
			} ),
		} )
			.then( ( terms ) => {
				terms = terms.map( ( term ) => ( { ...term, parent: attribute } ) );
				this.setState( ( prevState ) => ( {
					termsList: { ...prevState.termsList, [ attribute ]: terms },
					termsLoading: false,
				} ) );
			} )
			.catch( () => {
				this.setState( { termsLoading: false } );
			} );
	}

	onSelectAttribute( item ) {
		return () => {
			this.props.onChange( [] );
			this.setState( {
				attribute: item.id === this.state.attribute ? 0 : item.id,
			} );
		};
	}

	renderItem( args ) {
		const { item, search, depth = 0 } = args;
		const { attribute, termsLoading } = this.state;
		const classes = [
			'woocommerce-product-attributes__item',
			'woocommerce-search-list__item',
		];
		if ( search.length ) {
			classes.push( 'is-searching' );
		}
		if ( depth === 0 && item.parent !== 0 ) {
			classes.push( 'is-skip-level' );
		}

		if ( ! item.breadcrumbs.length ) {
			return [
				<SearchListItem
					key={ `attr-${ item.id }` }
					{ ...args }
					className={ classes.join( ' ' ) }
					isSelected={ attribute === item.id }
					onSelect={ this.onSelectAttribute }
					isSingle
					disabled={ '0' === item.count }
					aria-expanded={ attribute === item.id }
					aria-label={ sprintf(
						_n(
							'%s, has %d term',
							'%s, has %d terms',
							item.count,
							'woo-gutenberg-products-block'
						),
						item.name,
						item.count
					) }
				/>,
				attribute === item.id && termsLoading && (
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
				className={ classes.join( ' ' ) }
				{ ...args }
				showCount
				aria-label={ `${ item.breadcrumbs[ 0 ] }: ${ item.name }` }
			/>
		);
	}

	render() {
		const { attribute, list, loading, termsList } = this.state;
		const { onChange, onOperatorChange, operator, selected } = this.props;
		const currentTerms = termsList[ attribute ] || [];
		const currentList = [ ...list, ...currentTerms ];

		const messages = {
			clear: __( 'Clear all product attributes', 'woo-gutenberg-products-block' ),
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

		return (
			<Fragment>
				<SearchListControl
					className="woocommerce-product-attributes"
					list={ currentList }
					isLoading={ loading }
					selected={ selected
						.map( ( { id } ) => find( currentList, { id } ) )
						.filter( Boolean ) }
					onChange={ onChange }
					renderItem={ this.renderItem }
					messages={ messages }
					isHierarchical
				/>
				{ !! onOperatorChange && (
					<div className={ selected.length < 2 ? 'screen-reader-text' : '' }>
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
			</Fragment>
		);
	}
}

ProductAttributeControl.propTypes = {
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
};

ProductAttributeControl.defaultProps = {
	operator: 'any',
};

export default ProductAttributeControl;
