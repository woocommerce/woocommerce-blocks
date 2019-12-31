/**
 * Internal dependencies
 */
import { constrainRangeSliderValues } from '../constrain-range-slider-values';

describe( 'constrainRangeSliderValues', () => {
	test.each`
		values            | min     | max     | step  | isMin    | expected
		${[ 20, 60 ]}     | ${0}    | ${70}   | ${10} | ${true}  | ${[ 20, 60 ]}
		${[ 20, 60 ]}     | ${20}   | ${60}   | ${10} | ${true}  | ${[ 20, 60 ]}
		${[ 20, 60 ]}     | ${30}   | ${50}   | ${10} | ${true}  | ${[ 30, 50 ]}
		${[ 50, 50 ]}     | ${20}   | ${60}   | ${10} | ${true}  | ${[ 50, 60 ]}
		${[ 50, 50 ]}     | ${20}   | ${60}   | ${10} | ${false} | ${[ 40, 50 ]}
		${[ 20, 60 ]}     | ${null} | ${null} | ${10} | ${true}  | ${[ 20, 60 ]}
		${[ null, null ]} | ${20}   | ${60}   | ${10} | ${true}  | ${[ 20, 60 ]}
		${[ '20', '60' ]} | ${30}   | ${50}   | ${10} | ${true}  | ${[ 30, 50 ]}
	`(
		`correctly sets prices to its constraints with arguments $values, $min, $max, $step, $isMin`,
		( { values, min, max, step, isMin, expected } ) => {
			const constrainedValues = constrainRangeSliderValues(
				values,
				min,
				max,
				step,
				isMin
			);

			expect( constrainedValues ).toEqual( expected );
		}
	);
} );
