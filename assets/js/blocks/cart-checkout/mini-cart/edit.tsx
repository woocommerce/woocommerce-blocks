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
import { PanelBody, ExternalLink, ToggleControl } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';
import { ADMIN_URL, getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { isString } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import QuantityBadge from './quantity-badge';

interface Attributes {
	isInitiallyOpen?: boolean;
	transparentButton: boolean;
	backgroundColor?: string;
	textColor?: string;
	style?: Record< string, Record< string, string > >;
}

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

const MiniCartBlock = ( {
	attributes,
	setAttributes,
}: Props ): ReactElement => {
	const { transparentButton, backgroundColor, textColor, style } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( 'wc-block-mini-cart', {
			'is-transparent': transparentButton,
		} ),
	} );

	const themeSlug = getSetting( 'themeSlug', '' );

	const isSiteEditorAvailable = getSetting( 'isSiteEditorAvailable', false );

	/**
	 * @todo Replace `getColorClassName` and manual style manipulation with
	 * `useColorProps` once the hook is no longer experimental.
	 */
	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	const textColorClass = getColorClassName( 'color', textColor );

	const colorStyle = {
		backgroundColor: style?.color?.background,
		color: style?.color?.text,
	};

	const colorClassNames = classnames( backgroundClass, textColorClass, {
		'has-background': backgroundClass || style?.color?.background,
		'has-text-color': textColorClass || style?.color?.text,
	} );

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
				{ isSiteEditorAvailable &&
					isString( themeSlug ) &&
					themeSlug.length > 0 && (
						<PanelBody
							title={ __(
								'Template Editor',
								'woo-gutenberg-products-block'
							) }
						>
							<ExternalLink
								href={ addQueryArgs(
									`${ ADMIN_URL }themes.php`,
									{
										page: 'gutenberg-edit-site',
										postId: `${ themeSlug }//mini-cart`,
										postType: 'wp_template_part',
									}
								) }
							>
								{ __(
									'Edit template part',
									'woo-gutenberg-products-block'
								) }
							</ExternalLink>
						</PanelBody>
					) }
			</InspectorControls>
			<button
				className={ classnames(
					'wc-block-mini-cart__button',
					colorClassNames
				) }
				style={ colorStyle }
			>
				<span className="wc-block-mini-cart__amount">
					{ formatPrice( productTotal ) }
				</span>
				<QuantityBadge
					count={ productCount }
					colorClassNames={ colorClassNames }
					style={ colorStyle }
				/>
			</button>
			<CartCheckoutCompatibilityNotice blockName="mini-cart" />
		</div>
	);
};

export default MiniCartBlock;
