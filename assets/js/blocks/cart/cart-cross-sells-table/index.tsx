/**
 * External dependencies
 */
import classnames from 'classnames';
import { CartResponseItem } from '@woocommerce/type-defs/cart-response';
import { createRef, useEffect, useRef } from '@wordpress/element';
import type { RefObject } from 'react';

/**
 * Internal dependencies
 */
import CartCrossSellsRow from './cart-cross-sells-row';

const placeholderRows = [ ...Array( 3 ) ].map( ( _x, i ) => (
	<CartCrossSellsRow lineItem={ {} } key={ i } />
) );

interface CartCrossSellsTableProps {
	lineItems: CartResponseItem[];
	isLoading: boolean;
	className?: string;
}

const setRefs = ( lineItems: CartResponseItem[] ) => {
	const refs = {} as Record< string, RefObject< HTMLTableRowElement > >;
	lineItems.forEach( ( { key } ) => {
		refs[ key ] = createRef();
	} );
	return refs;
};

const CartCrossSellsTable = ( {
	lineItems = [],
	isLoading = false,
	className,
}: CartCrossSellsTableProps ): JSX.Element => {
	const tableRef = useRef< HTMLTableElement | null >( null );
	const rowRefs = useRef( setRefs( lineItems ) );
	useEffect( () => {
		rowRefs.current = setRefs( lineItems );
	}, [ lineItems ] );

	const onRemoveRow = ( nextItemKey: string | null ) => () => {
		if (
			rowRefs?.current &&
			nextItemKey &&
			rowRefs.current[ nextItemKey ].current instanceof HTMLElement
		) {
			( rowRefs.current[ nextItemKey ].current as HTMLElement ).focus();
		} else if ( tableRef.current instanceof HTMLElement ) {
			tableRef.current.focus();
		}
	};

	const products = isLoading
		? placeholderRows
		: lineItems.map( ( lineItem, i ) => {
				const nextItemKey =
					lineItems.length > i + 1 ? lineItems[ i + 1 ].key : null;
				return (
					<CartCrossSellsRow
						key={ lineItem.key }
						lineItem={ lineItem }
						onRemove={ onRemoveRow( nextItemKey ) }
						ref={ rowRefs.current[ lineItem.key ] }
						tabIndex={ -1 }
					/>
				);
		  } );

	return (
		<table
			className={ classnames( 'wc-block-cart-items', className ) }
			ref={ tableRef }
			tabIndex={ -1 }
		>
			<tbody>{ products }</tbody>
		</table>
	);
};

export default CartCrossSellsTable;
