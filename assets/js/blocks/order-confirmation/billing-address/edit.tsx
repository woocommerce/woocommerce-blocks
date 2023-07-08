/**
 * External dependencies
 */
import { useBlockProps, PlainText } from '@wordpress/block-editor';
import Title from '@woocommerce/base-components/title';
import type { BlockAttributes } from '@wordpress/blocks';
import { useCheckoutAddress } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';

const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		title: string;
	};
	setAttributes: ( attributes: BlockAttributes ) => void;
} ): JSX.Element | null => {
	const { title = '' } = attributes;
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-billing-address',
	} );

	const { billingAddress } = useCheckoutAddress();
	const {
		address_1: address1,
		address_2: address2,
		city,
		postcode,
		country,
		first_name: firstName,
		last_name: lastName,
		state,
		email,
		phone,
	} = billingAddress;

	return (
		<div { ...blockProps }>
			<div className="wc-block-components-checkout-step__heading">
				<Title
					aria-hidden="true"
					className="wc-block-components-checkout-step__title"
					headingLevel="2"
				>
					<PlainText
						className={ '' }
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						style={ { backgroundColor: 'transparent' } }
					/>
				</Title>
			</div>

			<address>
				{ firstName } { lastName }
				<br />
				{ address1 }
				<br />
				{ address2 }
				<br />
				{ city }
				<br />
				{ state }
				<br />
				{ postcode }
				<br />
				{ country }
				<br />
				<br />
				{ phone }
				<br />
				<br />
				{ email }
				<br />
			</address>
		</div>
	);
};

export default Edit;
