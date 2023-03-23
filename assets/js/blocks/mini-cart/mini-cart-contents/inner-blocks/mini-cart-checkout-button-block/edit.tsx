/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import EditableButton from '@woocommerce/editor-components/editable-button';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { defaultCheckoutButtonLabel } from './constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		checkoutButtonLabel: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const { checkoutButtonLabel } = attributes;

	const variant = blockProps.className.includes( 'is-style-outline' )
		? 'outlined'
		: 'contained';

	return (
		<EditableButton
			{ ...blockProps }
			className={ classNames(
				'wc-block-mini-cart__footer-checkout',
				blockProps.className
			) }
			variant={ variant }
			value={ checkoutButtonLabel }
			placeholder={ defaultCheckoutButtonLabel }
			onChange={ ( content ) => {
				setAttributes( {
					checkoutButtonLabel: content,
				} );
			} }
		/>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
