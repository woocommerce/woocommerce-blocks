/**
 * External dependencies
 */
import {
	InspectorControls,
	useBlockProps,
	getColorClassName,
} from '@wordpress/block-editor';
import type { ReactElement } from 'react';
import { formatPrice } from '@woocommerce/price-format';
import { CartCheckoutCompatibilityNotice } from '@woocommerce/editor-components/compatibility-notices';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import QuantityBadge from './quantity-badge';
import { Attributes } from './types';
export interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

const MiniCartBlock = ( {
	attributes,
	setAttributes,
}: Props ): ReactElement => {
	const { transparentButton, backgroundColor, textColor, style } = attributes;
	const blockProps = useBlockProps( {
		className: classnames(
			'wc-block-mini-cart wp-block-woocommerce-mini-cart',
			{
				'transparent-button': transparentButton,
			}
		),
	} );

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	const textColorClass = getColorClassName( 'color', textColor );

	const productCount = 0;
	const productTotal = 0;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Button style',
						'woo-gutenberg-products-block'
					) }
				>
					<ToggleControl
						label={ __(
							'Use transparent button',
							'woo-gutenberg-products-block'
						) }
						checked={ transparentButton }
						onChange={ () =>
							setAttributes( {
								transparentButton: ! transparentButton,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<button
				className={ classnames( 'wc-block-mini-cart__button', {
					[ backgroundClass ]: backgroundClass,
					[ textColorClass ]: textColorClass,
				} ) }
				style={ {
					backgroundColor: style?.color?.background,
					color: style?.color?.text,
				} }
			>
				<span className="wc-block-mini-cart__amount">
					{ formatPrice( productTotal ) }
				</span>
				<QuantityBadge
					count={ productCount }
					backgroundColor={
						backgroundColor || style?.color?.background
					}
					textColor={ textColor || style?.color?.text }
				/>
			</button>
			<CartCheckoutCompatibilityNotice blockName="mini-cart" />
		</div>
	);
};

export default MiniCartBlock;
