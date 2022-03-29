/**
 * External dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { hasNoticesOfType } from '../notices';

jest.mock( '@wordpress/data' );

describe( 'Notice utils', () => {
	describe( 'hasNoticesOfType', () => {
		it( 'Correctly returns if there are notices of a given type in the core data store', () => {
			select.mockReturnValue( {
				getNotices: jest.fn().mockReturnValue( [
					{
						id: 'coupon-form',
						status: 'error',
						content:
							'Coupon cannot be removed because it is not already applied to the cart.',
						spokenMessage:
							'Coupon cannot be removed because it is not already applied to the cart.',
						isDismissible: true,
						actions: [],
						type: 'default',
						icon: null,
						explicitDismiss: false,
					},
				] ),
			} );
			const hasSnackbarNotices = hasNoticesOfType(
				'wc/cart',
				'snackbar'
			);
			const hasDefaultNotices = hasNoticesOfType( 'wc/cart', 'default' );
			expect( hasDefaultNotices ).toBe( true );
			expect( hasSnackbarNotices ).toBe( false );
		} );

		it( 'Handles notices being empty', () => {
			select.mockReturnValue( {
				getNotices: jest.fn().mockReturnValue( [] ),
			} );
			const hasDefaultNotices = hasNoticesOfType( 'wc/cart', 'default' );
			expect( hasDefaultNotices ).toBe( false );
		} );
	} );
} );
