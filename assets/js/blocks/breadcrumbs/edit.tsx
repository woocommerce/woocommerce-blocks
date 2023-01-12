/**
 * External dependencies
 */
import classNames from 'classnames';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';
import { BlockSettings } from './sidebar-settings';

const Edit = () => {
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-breadcrumbs' ),
	} );

	return (
		<>
			<div { ...blockProps }>
				<InspectorControls>
					<BlockSettings />
				</InspectorControls>
				<Disabled>
					<Block />
				</Disabled>
			</div>
		</>
	);
};

export default Edit;
