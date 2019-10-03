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
		sortValue: this.props.sortValue,
	};

	onPageChange = ( newPage ) => {
		this.setState( {
			currentPage: newPage,
		} );
		this.props.onPageChange( newPage );
	};

	onSortChange = ( event ) => {
		const sortValue = event.target.value;
		this.setState( {
			currentPage: 1,
			sortValue,
		} );
		this.props.onSortChange( sortValue );
	};

	render() {
		const { attributes } = this.props;
		const { currentPage } = this.state;
		const sortValue = this.state.sortValue || this.props.attributes.orderby;

		return (
			<ProductGrid
				attributes={ attributes }
				currentPage={ currentPage }
				onSortChange={ this.onSortChange }
				onPageChange={ this.onPageChange }
				sortValue={ sortValue }
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
		const pageParameter = `product_page${ urlParameterSuffix }`;
		const sortParameter = `product_sort${ urlParameterSuffix }`;
		return {
			currentPage: parseInt(
				getQueryArg( location.href, pageParameter )
			),
			sortValue: getQueryArg( location.href, sortParameter ),
			onPageChange( newPage ) {
				history.pushState(
					null,
					'',
					addQueryArgs( location.href, {
						[ pageParameter ]: newPage,
					} )
				);
			},
			onSortChange( sortValue ) {
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
)( ProductGridContainer );
