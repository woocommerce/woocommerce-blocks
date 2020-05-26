/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	useInnerBlockConfigurationContext,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import { renderProductLayout } from '@woocommerce/atomic-utils';

const ProductListItem = ( { product, attributes, instanceId } ) => {
	const { layoutConfig } = attributes;
	const {
		parentName,
		layoutStyleClassPrefix,
	} = useInnerBlockConfigurationContext();
	const isLoading = Object.keys( product ).length === 0;
	const classes = classnames( `${ layoutStyleClassPrefix }__product`, {
		'is-loading': isLoading,
	} );

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			<ProductDataContextProvider product={ product }>
				{ renderProductLayout(
					parentName,
					product,
					layoutConfig,
					instanceId
				) }
			</ProductDataContextProvider>
		</li>
	);
};

ProductListItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
	// from withInstanceId
	instanceId: PropTypes.number.isRequired,
};

export default withInstanceId( ProductListItem );
