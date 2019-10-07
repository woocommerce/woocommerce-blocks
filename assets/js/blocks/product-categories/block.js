/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from 'react';
import { InspectorControls, ServerSideRender } from '@wordpress/editor';
import { HOME_URL } from '@woocommerce/block-settings';
import PropTypes from 'prop-types';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import ToggleButtonControl from '@woocommerce/block-components/toggle-button-control';

/**
 * Component displaying the categories as dropdown or list.
 */
class ProductCategoriesBlock extends Component {
	onNavigate() {
		const { isPreview = false } = this.props;
		const url = this.select.current.value;
		if ( 'false' === url ) {
			return;
		}
		const home = HOME_URL;

		if ( ! isPreview && 0 === url.indexOf( home ) ) {
			document.location.href = url;
		}
	}

	getInspectorControls() {
		const { attributes, setAttributes } = this.props;
		const { hasCount, hasEmpty, isDropdown, isHierarchical } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<ToggleControl
						label={ __(
							'Show product count',
							'woo-gutenberg-products-block'
						) }
						help={
							hasCount
								? __(
										'Product count is visible.',
										'woo-gutenberg-products-block'
								  )
								: __(
										'Product count is hidden.',
										'woo-gutenberg-products-block'
								  )
						}
						checked={ hasCount }
						onChange={ () =>
							setAttributes( { hasCount: ! hasCount } )
						}
					/>
					<ToggleControl
						label={ __(
							'Show hierarchy',
							'woo-gutenberg-products-block'
						) }
						help={
							isHierarchical
								? __(
										'Hierarchy is visible.',
										'woo-gutenberg-products-block'
								  )
								: __(
										'Hierarchy is hidden.',
										'woo-gutenberg-products-block'
								  )
						}
						checked={ isHierarchical }
						onChange={ () =>
							setAttributes( {
								isHierarchical: ! isHierarchical,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Show empty categories',
							'woo-gutenberg-products-block'
						) }
						help={
							hasEmpty
								? __(
										'Empty categories are visible.',
										'woo-gutenberg-products-block'
								  )
								: __(
										'Empty categories are hidden.',
										'woo-gutenberg-products-block'
								  )
						}
						checked={ hasEmpty }
						onChange={ () =>
							setAttributes( { hasEmpty: ! hasEmpty } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'List Settings',
						'woo-gutenberg-products-block'
					) }
					initialOpen
				>
					<ToggleButtonControl
						label={ __(
							'Display style',
							'woo-gutenberg-products-block'
						) }
						value={ isDropdown ? 'dropdown' : 'list' }
						options={ [
							{
								label: __(
									'List',
									'woo-gutenberg-products-block'
								),
								value: 'list',
							},
							{
								label: __(
									'Dropdown',
									'woo-gutenberg-products-block'
								),
								value: 'dropdown',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								isDropdown: 'dropdown' === value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	render() {
		const { attributes, name } = this.props;

		return (
			<Fragment>
				{ this.getInspectorControls() }
				<ServerSideRender block={ name } attributes={ attributes } />
			</Fragment>
		);
	}
	/*
	render() {
		const { attributes, categories, componentId } = this.props;
		const { className, isDropdown } = attributes;
		const classes = classnames( 'wc-block-product-categories', className, {
			'is-dropdown': isDropdown,
			'is-list': ! isDropdown,
		} );

		const selectId = `prod-categories-${ componentId }`;

		return (
			<Fragment>
				{ categories.length > 0 && (
					<div className={ classes }>
						{ isDropdown ? (
							<Fragment>
								<div className="wc-block-product-categories__dropdown">
									<label
										className="screen-reader-text"
										htmlFor={ selectId }
									>
										{ __(
											'Select a category',
											'woo-gutenberg-products-block'
										) }
									</label>
									<select id={ selectId } ref={ this.select }>
										<option value="false" hidden>
											{ __(
												'Select a category',
												'woo-gutenberg-products-block'
											) }
										</option>
										{ this.renderOptions( categories ) }
									</select>
								</div>
								<button
									type="button"
									className="wc-block-product-categories__button"
									aria-label={ __(
										'Go to category',
										'woo-gutenberg-products-block'
									) }
									icon="arrow-right-alt2"
									onClick={ this.onNavigate }
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
							</Fragment>
						) : (
							this.renderList( categories )
						) }
					</div>
				) }
			</Fragment>
		);
	}*/
}

ProductCategoriesBlock.propTypes = {
	/**
	 * The attributes for this block
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes
	 */
	setAttributes: PropTypes.func.isRequired,
};

export default ProductCategoriesBlock;
