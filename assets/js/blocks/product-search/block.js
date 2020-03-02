/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { PlainText } from '@wordpress/editor';
import { HOME_URL } from '@woocommerce/block-settings';
import withComponentId from '@woocommerce/base-hocs/with-component-id';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

/**
 * Component displaying a product search form.
 */
const ProductSearchBlock = ( {
	attributes: { label, placeholder, formId, className, hasLabel, align },
	instanceId,
	isEditor,
	setAttributes,
} ) => {
	const classes = classnames(
		'wc-block-product-search',
		align ? 'align' + align : '',
		className
	);

	if ( isEditor ) {
		if ( ! formId ) {
			setAttributes( {
				formId: `wc-block-product-search-${ instanceId }`,
			} );
		}

		return (
			<div className={ classes }>
				{ !! hasLabel && (
					<PlainText
						className="wc-block-product-search__label"
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
					/>
				) }
				<div className="wc-block-product-search__fields">
					<PlainText
						className="wc-block-product-search__field input-control"
						value={ placeholder }
						onChange={ ( value ) =>
							setAttributes( { placeholder: value } )
						}
					/>
					<button
						type="submit"
						className="wc-block-product-search__button"
						label={ __( 'Search', 'woo-gutenberg-products-block' ) }
						onClick={ ( e ) => e.preventDefault() }
						tabIndex="-1"
					>
						<svg
							aria-hidden="true"
							role="img"
							focusable="false"
							className="dashicon dashicons-arrow-right-alt2"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
						>
							<path d="M6 15l5-5-5-5 1-2 7 7-7 7z" />
						</svg>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={ classes }>
			<form role="search" method="get" action={ HOME_URL }>
				<label
					htmlFor={ formId }
					className={
						hasLabel
							? 'wc-block-product-search__label'
							: 'wc-block-product-search__label screen-reader-text'
					}
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
						<svg
							aria-hidden="true"
							role="img"
							focusable="false"
							className="dashicon dashicons-arrow-right-alt2"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
						>
							<path d="M6 15l5-5-5-5 1-2 7 7-7 7z" />
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
};

ProductSearchBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * A unique ID for identifying the label for the select dropdown.
	 */
	componentId: PropTypes.number,
	/**
	 * Whether it's in the editor or frontend display.
	 */
	isEditor: PropTypes.bool,
	/**
	 * A callback to update attributes.
	 */
	setAttributes: PropTypes.func,
};

export default withComponentId( ProductSearchBlock );
