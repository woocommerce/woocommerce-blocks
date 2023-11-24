/**
 * External dependencies
 */
import classnames from 'classnames';
import { withFilteredAttributes } from '@woocommerce/shared-hocs';
import {
	FormStep,
	StoreNoticesContainer,
} from '@woocommerce/blocks-components';
import { useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
import { noticeContexts } from '~/base/context';
import Block from './block';
import attributes from './attributes';

const FrontendBlock = ( {
	title,
	description,
	showStepNumber,
	children,
	className,
}: {
	title: string;
	description: string;
	showStepNumber: boolean;
	children: JSX.Element;
	className?: string;
} ) => {
	const checkoutIsProcessing = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).isProcessing()
	);
	const { cartNeedsPayment } = useStoreCart();

	if ( ! cartNeedsPayment ) {
		return null;
	}
	return (
		<FormStep
			id="payment-method"
			disabled={ checkoutIsProcessing }
			className={ classnames(
				'wc-block-checkout__payment-method',
				className
			) }
			title={ title }
			description={ description }
			showStepNumber={ showStepNumber }
		>
			<StoreNoticesContainer context={ noticeContexts.PAYMENTS } />
			<Block />
			{ children }
		</FormStep>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
