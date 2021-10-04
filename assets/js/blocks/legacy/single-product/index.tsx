import { registerFeaturePluginBlockType } from '@woocommerce/block-settings';
import metadata from './block.json';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

const Edit = ( { name } ) => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<ServerSideRender block={ name } />
		</div>
	);
};
registerFeaturePluginBlockType( metadata, {
	title: metadata.title,
	edit: Edit,
	save: () => null,
} );
