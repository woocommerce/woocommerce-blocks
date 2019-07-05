/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { Component } from '@wordpress/element';
import { IconButton } from '@wordpress/components';
import PropTypes from 'prop-types';
import { withInstanceId, compose } from '@wordpress/compose';
import { RichText } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

/**
 * Component displaying a product search form.
 */
class ProductSearchBlock extends Component {
	render() {
		const { attributes, instanceId, isPreview = false, setAttributes } = this.props;
		const { label, placeholder } = attributes;
		const { className } = attributes;
		const classes = classnames(
			'wc-block-product-search',
			className,
		);

		const formId = `wc-block-product-search-${ instanceId }`;
		const formAction = '';

		return (
			<form role="search" method="get" className={ classes } action={ formAction }>
				{ ! isPreview ? (
					<label
						htmlFor={ formId }
						className="wc-block-product-search__label"
					>
						{ label }
					</label>
				) : (
					<RichText
						tagName="label"
						className="wc-block-product-search__label"
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
						multiline={ false }
					/>
				) }
				<div className="wc-block-product-search__fields">
					{ ! isPreview ? (
						<input
							type="search"
							id={ formId }
							className="wc-block-product-search__field"
							placeholder={ placeholder }
							name="s"
						/>
					) : (
						<RichText
							tagName="div"
							className="wc-block-product-search__field input-control"
							value={ placeholder }
							onChange={ ( value ) => setAttributes( { placeholder: value } ) }
							multiline={ false }
							formattingControls={ [] }
						/>
					) }
					<IconButton
						icon="arrow-right-alt2"
						className="wc-block-product-search__button"
						label={ __( 'Search', 'woo-gutenberg-products-block' ) }
					/>
				</div>
			</form>
		);
	}
}

ProductSearchBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * A unique ID for identifying the label for the select dropdown.
	 */
	instanceId: PropTypes.number,
	/**
	 * Whether this is the block preview or frontend display.
	 */
	isPreview: PropTypes.bool,
	/**
	 * A callback to update attributes.
	 */
	setAttributes: PropTypes.func.isRequired,
};

export default compose( [
	withInstanceId,
] )( ProductSearchBlock );
