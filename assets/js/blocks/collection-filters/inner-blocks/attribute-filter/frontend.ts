/**
 * External dependencies
 */
import {
	store as interactivityStore,
	navigate,
} from '@woocommerce/interactivity';
import { HTMLElementEvent } from '@woocommerce/types';

type AttributeFilterContext = {
	attributeSlug: string;
	attributeTermSlug: string;
	selectedTerms: string[];
	queryType: 'or' | 'and';
};

type ActionProps = {
	event: HTMLElementEvent< HTMLInputElement >;
	context: AttributeFilterContext;
};

const getUrl = ( context: AttributeFilterContext, activeFilters: string ) => {
	const url = new URL( window.location.href );
	const { searchParams } = url;

	if ( activeFilters !== '' ) {
		searchParams.set( `filter_${ context.attributeSlug }`, activeFilters );
		searchParams.set(
			`query_type_${ context.attributeSlug }`,
			context.queryType
		);
	} else {
		searchParams.delete( `filter_${ context.attributeSlug }` );
		searchParams.delete( `query_type_${ context.attributeSlug }` );
	}

	return url.href;
};

interactivityStore( {
	state: {
		filters: {},
	},
	selectors: {
		filters: {
			isSelectedAttribute: ( {
				context,
			}: {
				context: AttributeFilterContext;
			} ) => {
				return context.selectedTerms.includes(
					context.attributeTermSlug
				);
			},
		},
	},
	actions: {
		filters: {
			updateProductsWithAttributeFilter: ( {
				event,
				context,
			}: ActionProps ) => {
				if ( ! event.target.value ) return;

				let selectedTerms = context.selectedTerms;

				if (
					event.target.checked &&
					! selectedTerms.includes( event.target.value )
				) {
					selectedTerms.push( event.target.value );
				} else {
					selectedTerms = selectedTerms.filter(
						( value ) => value !== event.target.value
					);
				}

				navigate( getUrl( context, selectedTerms.join( ',' ) ) );

				context.selectedTerms = selectedTerms;
			},
		},
	},
} );
