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
	selectedTerms: string[];
	queryType: 'or' | 'and';
	selectType: 'single' | 'multiple';
};

interface AttributeTermContext extends AttributeFilterContext {
	attributeTermSlug: string;
}

type ActionProps = {
	event: HTMLElementEvent< HTMLInputElement >;
	context: AttributeFilterContext;
};

const getUrl = ( context: AttributeFilterContext ) => {
	const url = new URL( window.location.href );
	const { searchParams } = url;

	if ( context.selectedTerms.length > 0 ) {
		searchParams.set(
			`filter_${ context.attributeSlug }`,
			context.selectedTerms.join( ',' )
		);
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
				context: AttributeTermContext;
			} ) => {
				return context.selectedTerms.includes(
					context.attributeTermSlug
				);
			},
		},
	},
	actions: {
		filters: {
			setAttributes: ( { event, context }: ActionProps ) => {
				if ( ! event.target.value ) return;

				let selectedTerms = context.selectedTerms;

				if (
					event.target.checked &&
					! selectedTerms.includes( event.target.value )
				) {
					if ( context.selectType === 'multiple' )
						selectedTerms.push( event.target.value );
					if ( context.selectType === 'single' )
						selectedTerms = [ event.target.value ];
				} else {
					selectedTerms = selectedTerms.filter(
						( value ) => value !== event.target.value
					);
				}

				context.selectedTerms = selectedTerms;
			},
			updateProductsWithAttributeFilter: ( { context }: ActionProps ) => {
				navigate( getUrl( context ) );
			},
		},
	},
} );
