/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { TotalsWrapper } from '@woocommerce/blocks-checkout';
import Title from '@woocommerce/base-components/title';
import { withFilteredAttributes } from '@woocommerce/shared-hocs';

/**
 * Internal dependencies
 */
import attributes from './attributes';

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
			<TotalsWrapper>{ children }</TotalsWrapper>
		</div>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
