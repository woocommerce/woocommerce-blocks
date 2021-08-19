/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import {
	RegisteredBlocks,
	getRegisteredBlocks,
} from '@woocommerce/blocks-checkout';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';
import { useForcedLayout } from '../use-forced-layout';

export const AdditionalFields = ( {
	area,
}: {
	area: keyof RegisteredBlocks;
} ): JSX.Element => {
	const registeredBlocks = getRegisteredBlocks( area );
	const { 'data-block': clientId } = useBlockProps();
	const { current: template = [] } = useRef< Array< string > >( [
		...registeredBlocks,
	] );
	useForcedLayout( {
		clientId,
		template,
	} );
	return (
		<div className="wc-block-checkout__additional_fields">
			<InnerBlocks allowedBlocks={ template } />
		</div>
	);
};

export const AdditionalFieldsContent = (): JSX.Element => (
	<InnerBlocks.Content />
);
