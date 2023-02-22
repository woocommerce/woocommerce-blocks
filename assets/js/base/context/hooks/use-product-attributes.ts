/**
 * External dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';
import { getAttributes, getTerms } from '@woocommerce/editor-components/utils';
import {
	AttributeObject,
	AttributeTerm,
	AttributeWithTerms,
} from '@woocommerce/types';

export default function useProductAttributes( shouldLoadAttributes: boolean ) {
	const [ isLoadingAttributes, setIsLoadingAttributes ] = useState( false );
	const [ productsAttributes, setProductsAttributes ] = useState<
		AttributeWithTerms[]
	>( [] );
	const hasLoadedAttributes = useRef( false );

	useEffect( () => {
		if (
			! shouldLoadAttributes ||
			isLoadingAttributes ||
			hasLoadedAttributes.current
		)
			return;

		async function fetchAttributesWithTerms() {
			setIsLoadingAttributes( true );

			const attributes: AttributeObject[] = await getAttributes();
			const attributesWithTerms: AttributeWithTerms[] = [];

			for ( const attribute of attributes ) {
				const terms: AttributeTerm[] = await getTerms( attribute.id );

				attributesWithTerms.push( {
					...attribute,
					parent: 0,
					// Manually adding the parent id because of a Rest API bug
					// returning always `0` as parent.
					// see https://github.com/woocommerce/woocommerce-blocks/issues/8501
					terms: terms.map( ( term ) => ( {
						...term,
						attr_slug: attribute.taxonomy,
						parent: attribute.id,
					} ) ),
				} );
			}

			setProductsAttributes( attributesWithTerms );
			hasLoadedAttributes.current = true;
			setIsLoadingAttributes( false );
		}

		fetchAttributesWithTerms();

		return () => {
			hasLoadedAttributes.current = true;
		};
	}, [ isLoadingAttributes, shouldLoadAttributes ] );

	return { isLoadingAttributes, productsAttributes };
}
