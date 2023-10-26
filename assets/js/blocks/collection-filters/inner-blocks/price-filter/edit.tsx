/**
 * External dependencies
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import {
	PanelBody,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { EditProps } from './types';

const Edit = ( { attributes, setAttributes, context }: EditProps ) => {
	const { showInputFields, inlineInput } = attributes;
	console.log( context );
	return null;
	const { minPrice, maxPrice, formattedMinPrice, formattedMaxPrice } =
		context.filterData;

	const onChange = () => null;

	const blockProps = useBlockProps( {
		className: classNames( {
			'inline-input': inlineInput && showInputFields,
		} ),
	} );

	const priceMin = showInputFields ? (
		<input
			className="min"
			type="text"
			value={ minPrice }
			onChange={ onChange }
		/>
	) : (
		<span>{ formattedMinPrice }</span>
	);

	const priceMax = showInputFields ? (
		<input
			className="max"
			type="text"
			value={ maxPrice }
			onChange={ onChange }
		/>
	) : (
		<span>{ formattedMaxPrice }</span>
	);

	const Inspector = () => (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'woo-gutenberg-products-block' ) }
			>
				<ToggleGroupControl
					label={ __(
						'Price Slider',
						'woo-gutenberg-products-block'
					) }
					value={ showInputFields ? 'editable' : 'text' }
					onChange={ ( value: string ) =>
						setAttributes( {
							showInputFields: value === 'editable',
						} )
					}
					className="wc-block-price-filter__price-range-toggle"
				>
					<ToggleGroupControlOption
						value="editable"
						label={ __(
							'Editable',
							'woo-gutenberg-products-block'
						) }
					/>
					<ToggleGroupControlOption
						value="text"
						label={ __( 'Text', 'woo-gutenberg-products-block' ) }
					/>
				</ToggleGroupControl>
				{ showInputFields && (
					<ToggleControl
						label={ __(
							'Inline input fields',
							'woo-gutenberg-products-block'
						) }
						checked={ inlineInput }
						onChange={ () =>
							setAttributes( {
								inlineInput: ! inlineInput,
							} )
						}
						help={ __(
							'Show input fields inline with the slider.',
							'woo-gutenberg-products-block'
						) }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);

	return (
		<div { ...blockProps }>
			<Inspector />
			<div className="range">
				<div className="range-bar"></div>
				<input
					type="range"
					className="min"
					min={ minPrice }
					max={ maxPrice }
					value={ minPrice }
					onChange={ onChange }
				/>
				<input
					type="range"
					className="max"
					min={ minPrice }
					max={ maxPrice }
					value={ maxPrice }
					onChange={ onChange }
				/>
			</div>
			<div className="text">
				{ priceMin }
				{ priceMax }
			</div>
		</div>
	);
};

export default Edit;
