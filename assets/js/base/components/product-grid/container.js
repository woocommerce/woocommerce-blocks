/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { addQueryArgs, getQueryArg } from '@wordpress/url';

/**
 * Internal dependencies
 */
import ProductGrid from './index';

class ProductGridContainer extends Component {
	pageParameter = `page${ this.props.urlParameterSuffix }`;
	orderParameter = `order${ this.props.urlParameterSuffix }`;

	state = {
		currentPage:
			parseInt(
				getQueryArg( window.location.href, this.pageParameter ),
				10
			) || 1,
		orderValue: getQueryArg( window.location.href, this.orderParameter ),
	};

	onPageChange = ( newPage ) => {
		window.history.pushState(
			null,
			'',
			addQueryArgs( window.location.href, {
				[ this.pageParameter ]: newPage,
			} )
		);
		this.setState( {
			currentPage: newPage,
		} );
	};

	onOrderChange = ( event ) => {
		const orderValue = event.target.value;
		window.history.pushState(
			null,
			'',
			addQueryArgs( window.location.href, {
				[ this.orderParameter ]: orderValue,
				[ this.pageParameter ]: 1,
			} )
		);
		this.setState( {
			currentPage: 1,
			orderValue,
		} );
	};

	render() {
		const { attributes } = this.props;
		const { currentPage } = this.state;
		const orderValue =
			this.state.orderValue || this.props.attributes.orderby;

		return (
			<ProductGrid
				attributes={ attributes }
				currentPage={ currentPage }
				onOrderChange={ this.onOrderChange }
				onPageChange={ this.onPageChange }
				orderValue={ orderValue }
			/>
		);
	}
}

ProductGridContainer.propTypes = {
	attributes: PropTypes.object.isRequired,
	urlParameterSuffix: PropTypes.string,
};

export default ProductGridContainer;
