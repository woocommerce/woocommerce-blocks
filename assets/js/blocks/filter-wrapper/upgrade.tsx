/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { Warning } from '@wordpress/block-editor';

interface UpgradeToolbarButtonProps {
	clientId: string;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	attributes: Record< string, unknown >;
	filterType: undefined | string;
}

export const UpgradeToolbarButton = ( {
	clientId,
	setAttributes,
	filterType,
	attributes,
}: UpgradeToolbarButtonProps ) => {
	const { replaceBlock } = useDispatch( 'core/block-editor' );
	const { heading, headingLevel } = attributes;

	const upgradeFilterBlockHandler = () => {
		const filterWrapperInnerBlocks: BlockInstance[] = [
			createBlock( `woocommerce/${ filterType }`, {
				...attributes,
				heading: '',
			} ),
		];

		if ( heading && heading !== '' ) {
			filterWrapperInnerBlocks.unshift(
				createBlock( 'core/heading', {
					content: heading,
					headingLevel: headingLevel ?? 2,
				} )
			);
		}

		replaceBlock(
			clientId,
			createBlock(
				'woocommerce/filter-wrapper',
				{
					heading,
					filterType,
				},
				[ ...filterWrapperInnerBlocks ]
			)
		);
		setAttributes( {
			heading: '',
		} );
	};

	if ( ! heading || ! filterType ) {
		return null;
	}

	const actions = [
		<Button
			key="convert"
			onClick={ upgradeFilterBlockHandler }
			variant="primary"
		>
			{ __( 'Upgrade block', 'woo-gutenberg-products-block' ) }
		</Button>,
	];

	return (
		<Warning actions={ actions }>
			{ __(
				'Filter block: We have improved this block to make styling easier. Upgrade it using the button below.',
				'woo-gutenberg-products-block'
			) }
		</Warning>
	);
};
