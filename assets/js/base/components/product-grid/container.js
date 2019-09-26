/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ProductGrid from './index';

class ProductGridContainer extends Component {
	state = {
		currentPage: 1,
		orderValue: null,
	};

	onPageChange = ( newPage ) => {
		this.setState( {
			currentPage: newPage,
		} );
	};

	onOrderChange = ( event ) => {
		this.setState( {
			orderValue: event.target.value,
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
};

export default ProductGridContainer;
