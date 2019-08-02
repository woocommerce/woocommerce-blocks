/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { Component } from '@wordpress/element';
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
	renderView() {
		const { attributes: { label, placeholder, formId, className, hasLabel } } = this.props;
		const home = wc_product_block_data.homeUrl;
		const classes = classnames(
			'wc-block-product-search',
			className,
		);
		const data = {};

		if ( hasLabel ) {
			data[ 'data-has-label' ] = true;
		}

		return (
			<form className={ classes } { ...data } role="search" method="get" action={ home } data-form-id={ formId }>
				<label
					htmlFor={ formId }
					className={ hasLabel ? 'wc-block-product-search__label' : 'wc-block-product-search__label screen-reader-text' }
				>
					{ label }
				</label>
				<div className="wc-block-product-search__fields">
					<input
						type="search"
						id={ formId }
						className="wc-block-product-search__field"
						placeholder={ placeholder }
						name="s"
					/>
					<input type="hidden" name="post_type" value="product" />
					<button
						type="submit"
						className="wc-block-product-search__button"
						label={ __( 'Search', 'woo-gutenberg-products-block' ) }
					>
						<svg aria-hidden="true" role="img" focusable="false" className="dashicon dashicons-arrow-right-alt2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
							<path d="M6 15l5-5-5-5 1-2 7 7-7 7z"></path>
						</svg>
					</button>
				</div>
			</form>
		);
	}

	renderEdit() {
		const { attributes, setAttributes, instanceId } = this.props;
		const { label, placeholder, formId, className, hasLabel } = attributes;
		const classes = classnames(
			'wc-block-product-search',
			className,
		);

		if ( ! formId ) {
			setAttributes( { formId: `wc-block-product-search-${ instanceId }` } );
		}

		return (
			<form className={ classes }>
				{ !! hasLabel && (
					<RichText
						tagName="span"
						className="wc-block-product-search__label"
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
						multiline={ false }
						formattingControls={ [] }
					/>
				) }
				<div className="wc-block-product-search__fields">
					<RichText
						tagName="div"
						className="wc-block-product-search__field input-control"
						value={ placeholder }
						onChange={ ( value ) => setAttributes( { placeholder: value } ) }
						multiline={ false }
						formattingControls={ [] }
					/>
					<button
						type="submit"
						className="wc-block-product-search__button"
						label={ __( 'Search', 'woo-gutenberg-products-block' ) }
						onClick={ ( e ) => e.preventDefault() }
					>
						<svg aria-hidden="true" role="img" focusable="false" className="dashicon dashicons-arrow-right-alt2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
							<path d="M6 15l5-5-5-5 1-2 7 7-7 7z"></path>
						</svg>
					</button>
				</div>
			</form>
		);
	}

	render() {
		if ( this.props.isPreview ) {
			return this.renderEdit();
		}

		return this.renderView();
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
	setAttributes: PropTypes.func,
};

export default compose( [
	withInstanceId,
] )( ProductSearchBlock );
