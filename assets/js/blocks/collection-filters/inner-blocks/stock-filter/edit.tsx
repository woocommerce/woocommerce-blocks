/**
 * External dependencies
 */
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon, chevronDown } from '@wordpress/icons';
import { ProductQueryContext as Context } from '@woocommerce/blocks/product-query/types';
import { CheckboxList } from '@woocommerce/blocks-components';
import Label from '@woocommerce/base-components/filter-element-label';
import FormTokenField from '@woocommerce/base-components/form-token-field';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';
import { BlockProps } from './types';
import { Inspector } from './inspector';

const Edit = ( props: BlockEditProps< BlockProps > & { context: Context } ) => {
	const blockProps = useBlockProps( {
		className: classnames(
			'wc-block-stock-filter',
			props.attributes.className
		),
	} );

	const { showCounts, displayStyle } = props.attributes;
	const listOptions = [
		{
			value: 'instock',
			name: __( 'In stock', 'woo-gutenberg-products-block' ),
			textLabel: __( 'In stock (18)', 'woo-gutenberg-products-block' ),
			label: (
				<Label name={ 'In stock' } count={ showCounts ? 18 : null } />
			),
		},
		{
			value: 'outofstock',
			name: __( 'Out of stock', 'woo-gutenberg-products-block' ),
			textLabel: __( 'Out of stock (2)', 'woo-gutenberg-products-block' ),
			label: (
				<Label
					name={ 'Out of stock' }
					count={ showCounts ? 2 : null }
				/>
			),
		},
		{
			value: 'onbackorder',
			name: __( 'On backorder', 'woo-gutenberg-products-block' ),
			textLabel: __( 'On backorder (5)', 'woo-gutenberg-products-block' ),
			label: (
				<Label
					name={ 'On backorder' }
					count={ showCounts ? 5 : null }
				/>
			),
		},
	];

	return (
		<>
			{
				<div { ...blockProps }>
					<Inspector { ...props } />
					<Disabled>
						<div
							className={ classnames(
								'wc-block-stock-filter',
								`style-${ displayStyle }`,
								{
									'is-loading': false,
								}
							) }
						>
							{ displayStyle === 'dropdown' ? (
								<>
									<FormTokenField
										className={ classnames( {
											'single-selection': true,
											'is-loading': false,
										} ) }
										suggestions={ [] }
										placeholder={ __(
											'Select stock status',
											'woo-gutenberg-products-block'
										) }
										onChange={ () => null }
										value={ [] }
									/>
									<Icon icon={ chevronDown } size={ 30 } />
								</>
							) : (
								<CheckboxList
									className={ 'wc-block-stock-filter-list' }
									options={ listOptions }
									checked={ [] }
									onChange={ () => null }
									isLoading={ false }
									isDisabled={ true }
								/>
							) }
						</div>
					</Disabled>
				</div>
			}
		</>
	);
};

export default Edit;
