/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { BlockProps } from '../types';
import './style.scss';

export const PriceSlider = ( {
	minPrice,
	maxPrice,
	displayedMinPrice,
	displayedMaxPrice,
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
		<span>{ displayedMinPrice }</span>
	);

	const priceMax = showInputFields ? (
		<input
			className="max"
			type="text"
			value={ maxPrice }
			onChange={ onChange }
		/>
	) : (
		<span>{ displayedMaxPrice }</span>
	);
	return (
		<div
			className={ classNames( 'price-slider', {
				'inline-input': inlineInput && showInputFields,
			} ) }
		>
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
