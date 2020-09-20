/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';
import { Icon, discussion } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import EditorContainerBlock from '../editor-container-block.js';
import NoReviewsPlaceholder from './no-reviews-placeholder.js';
import {
	getSharedReviewContentControls,
	getSharedReviewListControls,
} from '../edit-utils.js';

/**
 * Component to handle edit mode of "All Reviews".
 *
 * @param {Object} props Incoming props for the component.
 * @param {Object} props.attributes Incoming block attributes.
 * @param {function(any):any} props.setAttributes Setter for block attributes.
 */
const AllReviewsEditor = ( { attributes, setAttributes } ) => {
	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					<ToggleControl
						label={ __(
							'Product name',
							'woo-gutenberg-products-block'
						) }
						checked={ attributes.showProductName }
						onChange={ () =>
							setAttributes( {
								showProductName: ! attributes.showProductName,
							} )
						}
					/>
					{ getSharedReviewContentControls(
						attributes,
						setAttributes
					) }
				</PanelBody>
				<PanelBody
					title={ __(
						'List Settings',
						'woo-gutenberg-products-block'
					) }
				>
					{ getSharedReviewListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	return (
		<Fragment>
			{ getInspectorControls() }
			<EditorContainerBlock
				attributes={ attributes }
				icon={
					<Icon
						icon={ discussion }
						className="block-editor-block-icon"
					/>
				}
				name={ __( 'All Reviews', 'woo-gutenberg-products-block' ) }
				noReviewsPlaceholder={ NoReviewsPlaceholder }
			/>
		</Fragment>
	);
};

AllReviewsEditor.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes.
	 */
	setAttributes: PropTypes.func.isRequired,
};

export default AllReviewsEditor;
