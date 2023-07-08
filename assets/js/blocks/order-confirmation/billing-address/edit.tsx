/**
 * External dependencies
 */
import { useBlockProps, PlainText } from '@wordpress/block-editor';
import Title from '@woocommerce/base-components/title';
import type { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Block from './block';
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

			<Block />
		</div>
	);
};

export default Edit;
