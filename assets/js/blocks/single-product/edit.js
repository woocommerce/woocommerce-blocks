/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import PropTypes from 'prop-types';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';

const BlockSettings = ( { attributes, setAttributes } ) => {
	return <InspectorControls></InspectorControls>;
};

/**
 * Component to handle edit mode of the "Single Product Block".
 */
const Editor = ( { className, attributes, setAttributes } ) => {
	if ( attributes.isPreview ) {
		return null;
	}

	return (
		<div className={ className }>
			<BlockErrorBoundary
				header={ __(
					'Single Product Block Error',
					'woo-gutenberg-products-block'
				) }
				text={ __(
					'There was an error whilst rendering the single product block. If this problem continues, try re-creating the block.',
					'woo-gutenberg-products-block'
				) }
				showErrorMessage={ true }
				errorMessagePrefix={ __(
					'Error message:',
					'woo-gutenberg-products-block'
				) }
			>
				<>
					<BlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<Disabled>
						<Block attributes={ attributes } />
					</Disabled>
				</>
			</BlockErrorBoundary>
		</div>
	);
};

Editor.propTypes = {
	className: PropTypes.string,
};

export default Editor;
