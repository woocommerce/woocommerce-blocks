/**
 * External dependencies
 */
import classNames from 'classnames';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled, withSpokenMessages } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Block from './block';
import { Attributes } from './types';
import { BlockSettings } from './sidebar-settings';
import './editor.scss';

const Edit = ( {
	attributes,
	setAttributes,
}: BlockEditProps< Attributes > ) => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-customer-account', className ),
	} );
	return (
		<>
			<div { ...blockProps }>
				<InspectorControls>
					<BlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<Disabled>
					<Block />
				</Disabled>
			</div>
		</>
	);
};

export default withSpokenMessages( Edit );
