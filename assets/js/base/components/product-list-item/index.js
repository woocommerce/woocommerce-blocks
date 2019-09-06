/**
 * External dependencies.
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { renderProductLayout } from '../../../atomic/utils';

class ProductListItem extends Component {
	static propTypes = {
		attributes: PropTypes.object.isRequired,
		product: PropTypes.object,
	}

	render = () => {
		const { product, attributes } = this.props;
		const { layoutConfig } = attributes;
		//const { contentVisibility } = attributes;
		//const { button, price, rating, title, image } = contentVisibility;
		const isLoading = ! Object.keys( product ).length > 0;
		const classes = classnames(
			'wc-block-grid__product',
			{
				'is-loading': isLoading,
			},
		);

		return (
			<li className={ classes } aria-hidden={ isLoading }>
				{ renderProductLayout( product, layoutConfig ) }
			</li>
		);
	}
}

export default ProductListItem;
