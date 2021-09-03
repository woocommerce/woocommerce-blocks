/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import { useForcedLayout } from '../use-forced-layout';
import { getRegisteredBlockNamesByParent } from '../editor-utils';

export const AdditionalFields = ( { area }: { area: string } ): JSX.Element => {
	const { 'data-block': clientId } = useBlockProps();
	const template = useForcedLayout( {
		clientId,
		template: getRegisteredBlockNamesByParent( area ),
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
