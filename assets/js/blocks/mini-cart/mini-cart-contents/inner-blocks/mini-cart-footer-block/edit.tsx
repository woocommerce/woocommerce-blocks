/**
 * External dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Button from '@woocommerce/base-components/button';

/**
 * Internal dependencies
 */
import {
	defaultCartButtonLabel,
	defaultCheckoutButtonLabel,
} from './constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		cartButtonLabel: string;
		checkoutButtonLabel: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const { cartButtonLabel, checkoutButtonLabel } = attributes;

	return (
		<div { ...blockProps }>
			<Button className="wc-block-mini-cart__footer-cart">
				<RichText
					multiline={ false }
					allowedFormats={ [] }
					value={ cartButtonLabel }
					placeholder={ defaultCartButtonLabel }
					onChange={ ( content ) => {
						setAttributes( {
							cartButtonLabel: content,
						} );
					} }
				/>
			</Button>
			<Button className="wc-block-mini-cart__footer-checkout">
				<RichText
					multiline={ false }
					allowedFormats={ [] }
					value={ checkoutButtonLabel }
					placeholder={ defaultCheckoutButtonLabel }
					onChange={ ( content ) => {
						setAttributes( {
							checkoutButtonLabel: content,
						} );
					} }
				/>
			</Button>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
