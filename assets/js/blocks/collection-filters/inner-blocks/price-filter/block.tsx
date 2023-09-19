/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { BlockProps } from './types';

const PriceSlider = ( {
	minPrice,
	maxPrice,
	minRange,
	maxRange,
	showInputFields,
	inlineInput,
}: BlockProps ) => {
	const onChange = () => null;
	const priceMin = showInputFields ? (
		<input
			className="min"
			type="text"
			value={ minPrice }
			onChange={ onChange }
		/>
	) : (
		<span>{ minPrice }</span>
	);

	const priceMax = showInputFields ? (
		<input
			className="max"
			type="text"
			value={ maxPrice }
			onChange={ onChange }
		/>
	) : (
		<span>{ maxPrice }</span>
	);
	return (
		<div
			className={ classNames( 'price-slider', {
				'inline-input': inlineInput,
			} ) }
		>
			<div className="range">
				<div className="range-bar"></div>
				<input
					type="range"
					min={ minRange }
					max={ maxRange }
					value={ minPrice }
					className="active"
					onChange={ onChange }
				/>
				<input
					type="range"
					min={ minRange }
					max={ maxRange }
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

const Block = ( props: BlockProps ) => {
	props = Object.assign(
		{
			minPrice: 0,
			maxPrice: 0,
			minRange: 0,
			maxRange: 0,
		},
		props
	);
	return (
		<Disabled>
			<div className="controls">
				<PriceSlider { ...props } />
			</div>
			<div className="actions">
				<button className="reset">Reset</button>
			</div>
		</Disabled>
	);
};

export default Block;
