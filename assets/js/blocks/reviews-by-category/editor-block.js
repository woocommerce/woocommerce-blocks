/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { escapeHTML } from '@wordpress/escape-html';
import { Disabled, Placeholder } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getOrderArgs, getReviews } from './utils';
import LoadMoreButton from '../../base/components/load-more-button';
import ReviewList from '../../base/components/review-list';
import ReviewOrderSelect from '../../base/components/review-order-select';
import withComponentId from '../../base/hocs/with-component-id';
import { IconReviewsByCategory } from '../../components/icons';

const enableReviewRating = !! ( typeof wc_product_block_data !== 'undefined' && wc_product_block_data.enableReviewRating );

/**
 * Block rendered in the editor.
 */
class EditorBlock extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			reviews: [],
			totalReviews: 0,
			isLoading: true,
		};

		this.renderNoReviews = this.renderNoReviews.bind( this );
		this.debouncedLoadFirstReviews = debounce( this.loadFirstReviews.bind( this ), 400 );
	}

	componentDidMount() {
		this.loadFirstReviews();
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.categoryId !== this.props.attributes.categoryId ||
			prevProps.attributes.reviewsOnPageLoad !== this.props.attributes.reviewsOnPageLoad
		) {
			this.debouncedLoadFirstReviews();
		}
	}

	getDefaultArgs() {
		const { attributes } = this.props;
		const { order, orderby } = getOrderArgs( attributes.orderby );
		const { categoryId, reviewsOnPageLoad } = attributes;

		return {
			order,
			orderby,
			per_page: reviewsOnPageLoad,
			category_id: categoryId,
		};
	}

	loadFirstReviews() {
		getReviews( this.getDefaultArgs() ).then( ( { reviews, totalReviews } ) => {
			this.setState( { reviews, totalReviews, isLoading: false } );
		} ).catch( () => {
			this.setState( { reviews: [], isLoading: false } );
		} );
	}

	renderNoReviews() {
		const { attributes } = this.props;
		const { category } = attributes;
		return (
			<Placeholder
				className="wc-block-reviews-by-category"
				icon={ <IconReviewsByCategory className="block-editor-block-icon" /> }
				label={ __( 'Reviews by Category', 'woo-gutenberg-products-block' ) }
			>
				<div dangerouslySetInnerHTML={ {
					__html: sprintf(
						__(
							"This block lists reviews for products from a selected category. %s doesn't have any reviews yet, but they will show up here when it does.",
							'woo-gutenberg-products-block'
						),
						category ? '<strong>' + escapeHTML( category.name ) + '</strong>' : __( 'The category', 'woo-gutenberg-products-block' )
					),
				} } />
			</Placeholder>
		);
	}

	render() {
		const { attributes, componentId } = this.props;
		const { reviews, totalReviews, isLoading } = this.state;

		if ( 0 === reviews.length && ! isLoading ) {
			return this.renderNoReviews();
		}

		return (
			<Disabled>
				{ ( attributes.showOrderby && enableReviewRating ) && (
					<ReviewOrderSelect
						componentId={ componentId }
						readOnly
						value={ attributes.orderby }
					/>
				) }
				<ReviewList
					attributes={ attributes }
					componentId={ componentId }
					reviews={ reviews }
					showProductNames={ true }
				/>
				{ ( attributes.showLoadMore && totalReviews > reviews.length ) && (
					<LoadMoreButton
						screenReaderLabel={ __( 'Load more reviews', 'woo-gutenberg-products-block' ) }
					/>
				) }
			</Disabled>
		);
	}
}

EditorBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * From withComponentId.
	 */
	componentId: PropTypes.number,
};

export default withComponentId( EditorBlock );
