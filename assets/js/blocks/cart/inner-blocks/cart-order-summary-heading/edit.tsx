/**
 * External dependencies
 */
import {
	InspectorControls,
	PlainText,
	useBlockProps,
} from '@wordpress/block-editor';
import Title from '@woocommerce/base-components/title';
import classnames from 'classnames';
import { CartCheckoutFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';

/**
 * Internal dependencies
 */
import './editor.scss';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		content: string;
		className: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const { content = '', className = '' } = attributes;
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<CartCheckoutFeedbackPrompt />
			</InspectorControls>
			<Title
				headingLevel="2"
				className={ classnames(
					className,
					'wc-block-cart__totals-title'
				) }
			>
				<PlainText
					className={ '' }
					value={ content }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
				/>
			</Title>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
