/**
 * External dependencies
 */
import { registerFeaturePluginBlockType } from '@woocommerce/block-settings';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder } from 'wordpress-components';
import { page } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const Edit = (  ) => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<Placeholder icon={ page } label="TODO: add wireframe placeholder here" />
		</div>
	);
};
registerFeaturePluginBlockType( metadata, {
	title: metadata.title,
	edit: Edit,
	save: () => null,
} );
