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
import withWindow from '../../hocs/with-window';

class ProductGridContainer extends Component {
	state = {
		currentPage: this.props.currentPage || 1,
		orderValue: this.props.orderValue,
	};

	onPageChange = ( newPage ) => {
		this.setState( {
			currentPage: newPage,
		} );
		this.props.onPageChange( newPage );
	};

	onOrderChange = ( event ) => {
		const orderValue = event.target.value;
		this.setState( {
			currentPage: 1,
			orderValue,
		} );
		this.props.onOrderChange( orderValue );
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

export default withWindow(
	( { location, history }, { urlParameterSuffix } ) => {
		const pageParameter = `page${ urlParameterSuffix }`;
		const orderParameter = `order${ urlParameterSuffix }`;
		return {
			currentPage: parseInt( getQueryArg( location.href, pageParameter ) ),
			orderValue: getQueryArg( location.href, orderParameter ),
			onPageChange( newPage ) {
				history.pushState(
					null,
					'',
					addQueryArgs( location.href, { [ pageParameter ]: newPage })
				)
			},
			onOrderChange( orderValue ) {
				history.pushState(
					null,
					'',
					addQueryArgs( location.href, {
						[ orderParameter ]: orderValue,
						[ pageParameter ]: 1,
					} )
				);
			},
		};
	}
)( ProductGridContainer );
