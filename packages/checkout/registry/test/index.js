/**
 * Internal dependencies
 */
import {
	__experimentalRegisterCheckoutFilters,
	__experimentalApplyCheckoutFilter,
} from '../';
import { validateElementOrString } from '../validations';

describe( 'Checkout registry', () => {
	const filterName = 'loremIpsum';

	test( 'should return default value if there are no filters', () => {
		const value = 'Hello World';
		const newValue = __experimentalApplyCheckoutFilter( filterName, value );

		expect( newValue ).toBe( value );
	} );

	test( 'should return filtered value when a filter is registered', () => {
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: ( val, args ) =>
				val.toUpperCase() + args.punctuationSign,
		} );
		const newValue = __experimentalApplyCheckoutFilter( filterName, value, {
			punctuationSign: '!',
		} );

		expect( newValue ).toBe( 'HELLO WORLD!' );
	} );

	test( 'should not return filtered value if validation failed', () => {
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: ( val ) => val.toUpperCase(),
		} );
		const newValue = __experimentalApplyCheckoutFilter(
			filterName,
			value,
			{},
			( val ) => ! val.includes( 'HELLO' )
		);

		expect( newValue ).toBe( value );
	} );

	describe( 'validations', () => {
		test( 'validateElementOrString should invalidate if filtered value is not an element or string', () => {
			__experimentalRegisterCheckoutFilters( filterName, {
				[ filterName ]: ( val ) => {
					if ( val === 'Hello World' ) {
						return 'Valid value';
					}
					return [ 'invalid-value' ];
				},
			} );
			const validValue = __experimentalApplyCheckoutFilter(
				filterName,
				'Hello World',
				{},
				validateElementOrString
			);

			expect( validValue ).toBe( 'Valid value' );

			const invalidValue = __experimentalApplyCheckoutFilter(
				filterName,
				'Hello Earth',
				{},
				validateElementOrString
			);

			expect( invalidValue ).toBe( 'Hello Earth' );
		} );
	} );
} );
