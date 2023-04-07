/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	TemplateArray,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Frontend from '../inner-blocks/checkout-custom-field-block/frontend';

const templateField = {
	name: 'the_default_field_name',
	label: 'The default field',
	size: '',
	required: false,
};

const storedFields = [ templateField, templateField ];

export const CustomFields = ( {
	block,
}: {
	// Name of the parent block.
	block: string;
} ): JSX.Element => {
	const { 'data-block': clientId } = useBlockProps();
	const allowedBlocks = [ 'woocommerce/checkout-custom-field-block' ];
	const section = 'shipping';
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const blockEditor = useSelect( ( select ) => {
		return select( 'core/block-editor' );
	} );

	const template = storedFields.map( ( field ) => [
		'woocommerce/checkout-custom-field-block',
		{
			section,
			field,
		},
		[],
	] ) as TemplateArray;

	useEffect( () => {
		const blocksToInsert = createBlocksFromInnerBlocksTemplate( template );

		const parentBlock = blockEditor?.getBlock( clientId );

		insertBlocks(
			blocksToInsert,
			parentBlock?.innerBlocks.length,
			clientId
		);
	}, [ blockEditor, clientId, insertBlocks, template ] );

	return (
		<div className="wc-block-checkout__custom_fields">
			{ `Custom Fields section: ${ block }` }

			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ template }
			/>
		</div>
	);
};

export const CustomFieldsFrontend = ( {
	section,
}: {
	section: string;
} ): JSX.Element => {
	return (
		<div className="wc-block-checkout__custom_fields">
			{ `Custom Fields section` }
			{ storedFields.map( ( field, index ) => (
				<Frontend key={ index } field={ field } section={ section } />
			) ) }
		</div>
	);
};
