/**
 * Internal dependencies
 */
import { BlockProps } from './types';

const Block = ( {
	minRange,
	maxRange,
	minPrice,
	maxPrice,
	isEditor = false,
}: BlockProps ) => {
	return (
		<>
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
			<div className="text">
				<input
					type="text"
					value={ minPrice }
					data-wc-bind--value="state.filters.minPrice"
					data-wc-on--input="actions.filters.setMinPrice"
					data-wc-on--change="actions.filters.updateProducts"
					readOnly={ isEditor }
				/>
				<input
					type="text"
					value={ maxPrice }
					data-wc-bind--value="state.filters.maxPrice"
					data-wc-on--input="actions.filters.setMaxPrice"
					data-wc-on--change="actions.filters.updateProducts"
					readOnly={ isEditor }
				/>
			</div>
			<button data-wc-on--click="actions.filters.reset">Reset</button>
		</>
	);
};

export default Block;