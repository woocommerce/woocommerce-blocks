/**
 * Internal dependencies
 */
import { BlockProps } from './types';

const Block = ( {
	minRange = 0,
	maxRange = 0,
	minPrice = 0,
	maxPrice = 0,
	isEditor = false,
	showInputFields,
	inlineInput,
}: BlockProps ) => {
	const priceMin = showInputFields ? (
		<input
			type="text"
			value={ minPrice }
			data-wc-bind--value="state.filters.minPrice"
			data-wc-on--input="actions.filters.setMinPrice"
			data-wc-on--change="actions.filters.updateProducts"
			readOnly={ isEditor }
		/>
	) : (
		<span data-wc-text="state.filters.minPrice">{ minPrice }</span>
	);

	const priceMax = showInputFields ? (
		<input
			type="text"
			value={ maxPrice }
			data-wc-bind--value="state.filters.maxPrice"
			data-wc-on--input="actions.filters.setmaxPrice"
			data-wc-on--change="actions.filters.updateProducts"
			readOnly={ isEditor }
		/>
	) : (
		<span data-wc-text="state.filters.maxPrice">{ maxPrice }</span>
	);

	const priceRange = (
		<div
			className="range"
			data-wc-bind--style="state.filters.rangeStyle"
			data-wc-on--mousemove="actions.filters.updateActiveHandle"
		>
			<div className="range-bar"></div>
			<input
				type="range"
				min={ minRange }
				max={ maxRange }
				value={ minPrice }
				className="active"
				data-wc-bind--max="state.filters.maxRange"
				data-wc-bind--value="state.filters.minPrice"
				data-wc-class--active="state.filters.isMinActive"
				data-wc-on--input="actions.filters.setMinPrice"
				data-wc-on--change="actions.filters.updateProducts"
				readOnly={ isEditor }
			/>
			<input
				type="range"
				min={ minRange }
				max={ maxRange }
				value={ maxPrice }
				data-wc-bind--max="state.filters.maxRange"
				data-wc-bind--value="state.filters.maxPrice"
				data-wc-class--active="state.filters.isMaxActive"
				data-wc-on--input="actions.filters.setMaxPrice"
				data-wc-on--change="actions.filters.updateProducts"
				readOnly={ isEditor }
			/>
		</div>
	);

	if ( showInputFields && inlineInput ) {
		return (
			<>
				<div className="text">
					{ priceMin }
					{ priceRange }
					{ priceMax }
				</div>
				<button data-wc-on--click="actions.filters.reset">Reset</button>
			</>
		);
	}
	return (
		<>
			{ priceRange }
			<div className="text">
				{ priceMin }
				{ priceMax }
			</div>
			<button data-wc-on--click="actions.filters.reset">Reset</button>
		</>
	);
};

export default Block;
