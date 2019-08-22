/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
} from '@wordpress/editor';
import {
	PanelBody,
	Placeholder,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { IconReviewsByCategory } from '../../../components/icons';
import { renderViewMode, getSharedReviewContentControls, getSharedReviewListControls } from '../edit-utils.js';

/**
 * Component to handle edit mode of "All Reviews".
 */
const AllReviewsEditor = ( { attributes, setAttributes } ) => {
	const { showProductName, showReviewDate, showReviewerName, showReviewContent, showReviewImage, showReviewRating } = attributes;

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Content', 'woo-gutenberg-products-block' ) }>
					<ToggleControl
						label={ __( 'Product name', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showProductName }
						onChange={ () => setAttributes( { showProductName: ! attributes.showProductName } ) }
					/>
					{ getSharedReviewContentControls( attributes, setAttributes ) }
				</PanelBody>
				<PanelBody title={ __( 'List Settings', 'woo-gutenberg-products-block' ) }>
					{ getSharedReviewListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	const renderHiddenContentPlaceholder = () => {
		return (
			<Placeholder
				icon={ <IconReviewsByCategory className="block-editor-block-icon" /> }
				label={ __( 'All Reviews', 'woo-gutenberg-products-block' ) }
			>
				{ __( 'The content for this block is hidden due to block settings.', 'woo-gutenberg-products-block' ) }
			</Placeholder>
		);
	};

	const isAllContentHidden = ! showReviewContent && ! showReviewRating && ! showReviewDate && ! showReviewerName && ! showReviewImage && ! showProductName;

	return (
		<Fragment>
			{ getInspectorControls() }
			{ isAllContentHidden ?
				renderHiddenContentPlaceholder() :
				renderViewMode( 'wc-block-all-reviews', attributes )
			}
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
