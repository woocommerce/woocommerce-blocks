/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Title from '@woocommerce/base-components/title';
import { withFilteredAttributes } from '@woocommerce/shared-hocs';

/**
 * Internal dependencies
 */
import attributes from './attributes';
import { OrderMetaSlotFill } from './slotfills';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element | JSX.Element[];
	className: string;
} ): JSX.Element | null => {
	return (
		<div className={ className }>
			<Title headingLevel="2" className="wc-block-cart__totals-title">
				{ __( 'Cart totals', 'woo-gutenberg-products-block' ) }
			</Title>
			{ children }
			<OrderMetaSlotFill />
		</div>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
