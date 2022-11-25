/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';

const sampleData = {
	orderNumber: '100',
	orderDate: '2022-11-24 11:06:47',
	orderTotal: '100',
	orderEmail: 'dummy@email.com',
	orderPaymentMethod: 'BACS',
	orderStatusText: 'Pending',
	orderStatus: 'pending',
	billingAddress: {
		first_name: 'John',
	},
	orderShippingAddress:
		'John Smith<br/>My street 3<br/>10933 Berlin<br/>Germany',
	orderBillingAddress:
		'John Smith<br/>My street 3<br/>10933 Berlin<br/>Germany',
};

export const Edit = () => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Block orderData={ sampleData } />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: 'wc-block-checkout is-loading',
			} ) }
		></div>
	);
};
