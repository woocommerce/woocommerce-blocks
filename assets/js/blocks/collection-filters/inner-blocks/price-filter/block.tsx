/**
 * Internal dependencies
 */
import { BlockProps } from './types';

const Block = ( {
	minRange = 0,
	maxRange = 0,
	minPrice = 0,
	maxPrice = 0,
	showInputFields,
	inlineInput,
}: BlockProps ) => {
	const priceMin = showInputFields ? (
		<input type="text" value={ minPrice } readOnly={ true } />
	) : (
		<span>{ minPrice }</span>
	);

	const priceMax = showInputFields ? (
		<input type="text" value={ maxPrice } readOnly={ true } />
	) : (
		<span>{ maxPrice }</span>
	);

	const priceRange = (
		<div className="range">
			<div className="range-bar"></div>
			<input
				type="range"
				min={ minRange }
				max={ maxRange }
				value={ minPrice }
				className="active"
				readOnly={ true }
			/>
			<input
				type="range"
				min={ minRange }
				max={ maxRange }
				value={ maxPrice }
				readOnly={ true }
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
				<button>Reset</button>
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
			<button>Reset</button>
		</>
	);
};

export default Block;
