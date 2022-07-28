/* eslint-disable @woocommerce/dependency-group */
import { PRODUCTS_STORE_NAME, ProductQuery } from '@woocommerce/data';
import { useSelect } from '@wordpress/data';

export const Edit = ( props: unknown ) => {
	const { context } = props;
	console.log( props.context );

	const product = useSelect( ( select ) => {
		return select( PRODUCTS_STORE_NAME ).getProducts( {
			include: context.postId,
		} );
	} );

	return <div>{ product[ 0 ].name }</div>;
};
