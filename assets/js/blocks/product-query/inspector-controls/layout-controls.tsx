/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	__experimentalSpacingSizesControl as SpacingSizesControl,
} from '@wordpress/block-editor';
import {
	RangeControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ProductQueryBlock } from '../types';
import { setQueryAttribute } from '../utils';

function parseCSSFromGapValue(
	blockGap: Record< 'top' | 'right' | 'bottom' | 'left', string | undefined >
) {
	return blockGap
		? Object.fromEntries(
				Object.entries( blockGap ).map( ( [ key, value ] ) => {
					const slug = value?.match( /var:preset\|spacing\|(.+)/ );
					const style = slug
						? `var(--wp--preset--spacing--${ slug[ 1 ] })`
						: value;

					return [ key, style ];
				} )
		  )
		: blockGap;
}

function parseGapValueFromCSS(
	blockGap: Record< 'top' | 'right' | 'bottom' | 'left', string | undefined >
) {
	const res = blockGap
		? Object.fromEntries(
				Object.entries( blockGap ).map( ( [ key, value ] ) => {
					const slug = value?.match(
						/var\(--wp--preset--spacing--(.+)\)/
					);

					const style = slug
						? `var:preset|spacing|${ slug[ 1 ] }`
						: value;

					return [ key, style ];
				} )
		  )
		: blockGap;

	return res;
}

export const LayoutControls = ( props: ProductQueryBlock ) => {
	const gap = props.attributes?.style?.spacing?.blockGap;
	const units = useCustomUnits( {
		availableUnits: [ 'px', 'em', 'rem', 'vw' ],
	} );

	return (
		<InspectorControls __experimentalGroup="layout">
			<RangeControl
				style={ {} }
				__nextHasNoMarginBottom
				label={ __(
					'Maximum products per Page',
					'woo-gutenberg-products-block'
				) }
				min={ 1 }
				max={ 100 }
				onChange={ ( perPage ) => {
					if (
						! perPage ||
						isNaN( perPage ) ||
						perPage < 1 ||
						perPage > 100
					) {
						return;
					}
					setQueryAttribute( props, { perPage } );
				} }
				step="1"
				value={ props.attributes.query.perPage }
				isDragEnabled={ false }
			/>
			<div className="wc-block-controls-container">
				<SpacingSizesControl
					__nextHasNoMarginBottom
					values={ parseGapValueFromCSS( gap ) }
					onChange={ ( value ) =>
						props.setAttributes( {
							style: {
								...props.attributes?.style,
								spacing: {
									...props.attributes?.style?.spacing,
									blockGap: parseCSSFromGapValue( value ),
								},
							},
						} )
					}
					label={ __(
						'Block spacing',
						'woo-gutenberg-products-block'
					) }
					units={ units }
					allowReset={ true }
					sides={ [ 'horizontal', 'vertical' ] }
					splitOnAxis={ true }
				/>
			</div>
		</InspectorControls>
	);
};
