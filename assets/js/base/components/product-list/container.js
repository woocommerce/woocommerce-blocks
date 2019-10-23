/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { addQueryArgs, getQueryArg } from '@wordpress/url';

/**
 * Internal dependencies
 */
import ProductList from './index';
import withBrowserHistory from '@woocommerce/base-hocs/with-browser-history';
import withBrowserLocation from '@woocommerce/base-hocs/with-browser-location';

class ProductListContainer extends Component {
	state = {
		currentPage: this.props.currentPage || 1,
		sortValue: this.props.sortValue,
	};

	onPageChange = ( newPage ) => {
		this.setState( {
			currentPage: newPage,
		} );
		this.props.onPageChange( newPage );
	};

	onOrderChange = ( event ) => {
		const sortValue = event.target.value;
		this.setState( {
			currentPage: 1,
			sortValue,
		} );
		this.props.onOrderChange( sortValue );
	};

	render() {
		const { attributes, blockName } = this.props;
		const { currentPage } = this.state;
		const sortValue = this.state.sortValue || this.props.attributes.orderby;

		return (
			<ProductList
				attributes={ attributes }
				blockName={ blockName }
				currentPage={ currentPage }
				onOrderChange={ this.onOrderChange }
				onPageChange={ this.onPageChange }
				sortValue={ sortValue }
			/>
		);
	}
}

ProductListContainer.propTypes = {
	attributes: PropTypes.object.isRequired,
	urlParameterSuffix: PropTypes.string,
};

export default withBrowserLocation( ( location, { urlParameterSuffix } ) => {
	const pageParameter = `product_page${ urlParameterSuffix }`;
	const sortParameter = `product_sort${ urlParameterSuffix }`;
	return {
		currentPage: parseInt( getQueryArg( location.href, pageParameter ) ),
		location,
		sortValue: getQueryArg( location.href, sortParameter ),
		pageParameter,
		sortParameter,
	};
} )(
	withBrowserHistory(
		( history, { location, sortParameter, pageParameter } ) => {
			return {
				onPageChange( newPage ) {
					history.pushState(
						null,
						'',
						addQueryArgs( location.href, {
							[ pageParameter ]: newPage,
						} )
					);
				},
				onOrderChange( sortValue ) {
					history.pushState(
						null,
						'',
						addQueryArgs( location.href, {
							[ sortParameter ]: sortValue,
							[ pageParameter ]: 1,
						} )
					);
				},
			};
		}
	)( ProductListContainer )
);
