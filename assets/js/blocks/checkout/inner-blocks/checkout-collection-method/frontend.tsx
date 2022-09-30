/**
 * External dependencies
 */
import classnames from 'classnames';
import { withFilteredAttributes } from '@woocommerce/shared-hocs';
import { FormStep } from '@woocommerce/base-components/cart-checkout';
import { useCheckoutContext } from '@woocommerce/base-context';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from './block';
import attributes from './attributes';

const FrontendBlock = ( {
	title,
	description,
	showStepNumber,
	children,
	className,
	showPrice,
	showIcon,
}: {
	title: string;
	description: string;
	showStepNumber: boolean;
	children: JSX.Element;
	className?: string;
	showPrice: boolean;
	showIcon: boolean;
} ) => {
	const { isProcessing: checkoutIsProcessing } = useCheckoutContext();
	const [ collectionMethod, setCollectionMethod ] = useState( 'shipping' );
	return (
		<FormStep
			id="collection-method"
			disabled={ checkoutIsProcessing }
			className={ classnames(
				'wc-block-checkout__collection-method',
				className
			) }
			title={ title }
			description={ description }
			showStepNumber={ showStepNumber }
		>
			<Block
				checked={ collectionMethod }
				onChange={ setCollectionMethod }
				showPrice={ showPrice }
				showIcon={ showIcon }
			/>
			{ children }
		</FormStep>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
