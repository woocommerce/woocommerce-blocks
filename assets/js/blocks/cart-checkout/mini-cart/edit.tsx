/**
 * External dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import type { ReactElement } from 'react';
import { formatPrice } from '@woocommerce/price-format';
import { CartCheckoutCompatibilityNotice } from '@woocommerce/editor-components/compatibility-notices';
import { PanelBody, ExternalLink } from '@wordpress/components';
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';
import { positionCenter, positionRight, positionLeft } from '@wordpress/icons';
import Noninteractive from '@woocommerce/base-components/noninteractive';

/**
 * Internal dependencies
 */
import QuantityBadge from './quantity-badge';

interface Attributes {
	align: string;
	isInitiallyOpen?: boolean;
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
	const { align } = attributes;
	const blockProps = useBlockProps( {
		className: `wc-block-mini-cart align-${ align }`,
	} );

	const templatePartEditUri = getSetting(
		'templatePartEditUri',
		''
	) as string;

	const productCount = 0;
	const productTotal = 0;

	return (
		<div { ...blockProps }>
			<BlockControls>
				<AlignmentControl
					value={ align }
					alignmentControls={ [
						{
							icon: positionLeft,
							title: __(
								'Align button left',
								'woo-gutenberg-products-block'
							),
							align: 'left',
						},
						{
							icon: positionCenter,
							title: __(
								'Align button center',
								'woo-gutenberg-products-block'
							),
							align: 'center',
						},
						{
							icon: positionRight,
							title: __(
								'Align button right',
								'woo-gutenberg-products-block'
							),
							align: 'right',
						},
					] }
					onChange={ ( newAlign: string ) =>
						setAttributes( { align: newAlign } )
					}
				/>
			</BlockControls>
			<InspectorControls>
				{ templatePartEditUri && (
					<PanelBody
						title={ __(
							'Template Editor',
							'woo-gutenberg-products-block'
						) }
					>
						<ExternalLink href={ templatePartEditUri }>
							{ __(
								'Edit template part',
								'woo-gutenberg-products-block'
							) }
						</ExternalLink>
					</PanelBody>
				) }
			</InspectorControls>
			<Noninteractive>
				<button className="wc-block-mini-cart__button">
					<span className="wc-block-mini-cart__amount">
						{ formatPrice( productTotal ) }
					</span>
					<QuantityBadge count={ productCount } />
				</button>
			</Noninteractive>
			<CartCheckoutCompatibilityNotice blockName="mini-cart" />
		</div>
	);
};

export default MiniCartBlock;
