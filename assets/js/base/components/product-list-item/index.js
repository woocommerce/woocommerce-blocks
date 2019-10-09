/**
 * External dependencies.
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withComponentId from '@woocommerce/base-hocs/with-component-id';

/**
 * Internal dependencies.
 */
import { renderProductLayout } from '../../../atomic/utils';

class ProductListItem extends Component {
	static propTypes = {
		attributes: PropTypes.object.isRequired,
		product: PropTypes.object,
		// from withComponentId
		componentId: PropTypes.number.isRequired,
	};

	render = () => {
		const { product, attributes, componentId } = this.props;
		const { layoutConfig } = attributes;
		const isLoading = ! Object.keys( product ).length > 0;
		const classes = classnames( 'wc-block-grid__product', {
			'is-loading': isLoading,
		} );

		return (
			<li className={ classes } aria-hidden={ isLoading }>
				{ renderProductLayout( product, layoutConfig, componentId ) }
			</li>
		);
	};
}

export default withComponentId( ProductListItem );
