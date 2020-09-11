/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/editor';
import {
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';
import GridContentControl from '@woocommerce/editor-components/grid-content-control';
import GridLayoutControl from '@woocommerce/editor-components/grid-layout-control';
import ProductCategoryControl from '@woocommerce/editor-components/product-category-control';
import ProductOrderbyControl from '@woocommerce/editor-components/product-orderby-control';
import { gridBlockPreview } from '@woocommerce/resource-previews';
import { Icon, folder } from '@woocommerce/icons';

/**
 * Component to handle edit mode of "Products by Category".
 */
class ProductByCategoryBlock extends Component {
	static propTypes = {
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

		// from withSpokenMessages
		debouncedSpeak: PropTypes.func.isRequired,
	};

	state = {
		changedAttributes: {},
		isEditing: false,
	};

	componentDidMount() {
		const { attributes } = this.props;

		if ( ! attributes.categories.length ) {
			// We've removed all selected categories, or no categories have been selected yet.
			this.setState( { isEditing: true } );
		}
	}

	startEditing = () => {
		this.setState( {
			isEditing: true,
			changedAttributes: {},
		} );
	};

	stopEditing = () => {
		this.setState( {
			isEditing: false,
			changedAttributes: {},
		} );
	};

	/**
	 * Set changed attributes to state.
	 *
	 * @param {Object} attributes List of attributes to set.
	 */
	setChangedAttributes = ( attributes ) => {
		this.setState( ( prevState ) => {
			return {
				changedAttributes: {
					...prevState.changedAttributes,
					...attributes,
				},
			};
		} );
	};

	save = () => {
		const { changedAttributes } = this.state;
		const { setAttributes } = this.props;

		setAttributes( changedAttributes );
		this.stopEditing();
	};

	getInspectorControls() {
		const { attributes, setAttributes } = this.props;
		const { isEditing } = this.state;
		const {
			columns,
			catOperator,
			contentVisibility,
			orderby,
			rows,
			alignButtons,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __(
						'Product Category',
						'woo-gutenberg-products-block'
					) }
					initialOpen={
						! attributes.categories.length && ! isEditing
					}
				>
					<ProductCategoryControl
						selected={ attributes.categories }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							const changes = { categories: ids };

							// Changes in the sidebar save instantly and overwrite any unsaved changes.
							setAttributes( changes );
							this.setChangedAttributes( changes );
						} }
						operator={ catOperator }
						onOperatorChange={ ( value = 'any' ) => {
							const changes = { catOperator: value };
							setAttributes( changes );
							this.setChangedAttributes( changes );
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<GridLayoutControl
						columns={ columns }
						rows={ rows }
						alignButtons={ alignButtons }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<GridContentControl
						settings={ contentVisibility }
						onChange={ ( value ) =>
							setAttributes( { contentVisibility: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Order By', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductOrderbyControl
						setAttributes={ setAttributes }
						value={ orderby }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderEditMode() {
		const { attributes, debouncedSpeak } = this.props;
		const { changedAttributes } = this.state;
		const currentAttributes = { ...attributes, ...changedAttributes };
		const onDone = () => {
			this.save();
			debouncedSpeak(
				__(
					'Showing Products by Category block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};
		const onCancel = () => {
			this.stopEditing();
			debouncedSpeak(
				__(
					'Showing Products by Category block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
			<Placeholder
				icon={ <Icon srcElement={ folder } /> }
				label={ __(
					'Products by Category',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-products-grid wc-block-products-category"
			>
				{ __(
					'Display a grid of products from your selected categories.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-products-category__selection">
					<ProductCategoryControl
						selected={ currentAttributes.categories }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							this.setChangedAttributes( { categories: ids } );
						} }
						operator={ currentAttributes.catOperator }
						onOperatorChange={ ( value = 'any' ) =>
							this.setChangedAttributes( { catOperator: value } )
						}
					/>
					<Button isPrimary onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
					<Button
						className="wc-block-products-category__cancel-button"
						isTertiary
						onClick={ onCancel }
					>
						{ __( 'Cancel', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	renderViewMode() {
		const { attributes, name } = this.props;
		const hasCategories = attributes.categories.length;

		return (
			<Disabled>
				{ hasCategories ? (
					<ServerSideRender
						block={ name }
						attributes={ attributes }
						EmptyResponsePlaceholder={ () => (
							<Placeholder
								icon={ <Icon srcElement={ folder } /> }
								label={ __(
									'Products by Category',
									'woo-gutenberg-products-block'
								) }
								className="wc-block-products-grid wc-block-products-category"
							>
								{ __(
									'No products were found that matched your selection.',
									'woo-gutenberg-products-block'
								) }
							</Placeholder>
						) }
					/>
				) : (
					__(
						'Select at least one category to display its products.',
						'woo-gutenberg-products-block'
					)
				) }
			</Disabled>
		);
	}

	render() {
		const { isEditing } = this.state;
		const { attributes } = this.props;

		if ( attributes.isPreview ) {
			return gridBlockPreview;
		}

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={ [
							{
								icon: 'edit',
								title: __( 'Edit' ),
								onClick: () =>
									isEditing
										? this.stopEditing()
										: this.startEditing(),
								isActive: isEditing,
							},
						] }
					/>
				</BlockControls>
				{ this.getInspectorControls() }
				{ isEditing ? this.renderEditMode() : this.renderViewMode() }
			</Fragment>
		);
	}
}

export default withSpokenMessages( ProductByCategoryBlock );
