/**
 * @todo Create guards against __experimentalUseSlot use.
 */
/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';
import {
	createSlotFill as baseCreateSlotFill,
	__experimentalUseSlot,
	useSlot as __useSlot,
} from 'wordpress-components';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import { Children, cloneElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';

const mockedUseSlot = () => {
	deprecated( '__experimentalUseSlot', {
		plugin: 'woocommerce-gutenberg-products-block',
	} );
	// We're going to moke its value
	return {
		fills: new Array( 2 ),
	};
};
export const useSlot =
	// eslint-disable-next-line no-nested-ternary
	typeof __useSlot === 'function'
		? __useSlot
		: typeof __experimentalUseSlot === 'function'
		? __experimentalUseSlot
		: mockedUseSlot;

export const createSlotFill = ( slotName ) => {
	const { Fill: BaseFill, Slot } = baseCreateSlotFill( slotName );

	const Fill = ( { children } ) => {
		return (
			<BaseFill>
				{ ( fillProps ) => {
					return Children.map( children, ( fill ) => {
						return (
							<BlockErrorBoundary
								renderError={
									CURRENT_USER_IS_ADMIN ? null : () => null
								}
							>
								{ cloneElement( fill, fillProps ) }
							</BlockErrorBoundary>
						);
					} );
				} }
			</BaseFill>
		);
	};

	return {
		Fill,
		Slot,
	};
};
