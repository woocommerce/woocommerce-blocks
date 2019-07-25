/** @format */
/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks';

export class Template {
	constructor( args ) {
		this.name = args.name;
		this.templateArgs = args.templateArgs;
		this.context = args.context;
		this.template = args.template;
	}

	render() {
		const filteredTemplateArgs = applyFilters( `woocommerce-blocks-${ this.name }-args`, this.templateArgs, this.context );
		const filteredTemplate = applyFilters( `woocommerce-blocks-${ this.name }-template`, this.template, filteredTemplateArgs, this.context );

		return filteredTemplate( filteredTemplateArgs );
	}
}
