/**
 * Internal dependencies
 */
import type { StockStatus } from '../type-defs';

export const isStockStatusQueryCollection = (
	value: unknown
): value is StockStatus[] => {
	return (
		Array.isArray( value ) &&
		value.every( ( v ) =>
			[ 'instock', 'outofstock', 'onbackorder' ].includes( v )
		)
	);
};
