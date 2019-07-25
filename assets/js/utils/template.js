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
		this.allowExtensibility = args.allowExtensibility;
	}

	render() {
		const filteredTemplateArgs = this.allowExtensibility ?
			applyFilters( `woocommerce-blocks-${ this.name }-args`, this.templateArgs, this.context ) :
			this.templateArgs;
		const filteredTemplate = this.allowExtensibility ?
			applyFilters( `woocommerce-blocks-${ this.name }-template`, this.template, filteredTemplateArgs, this.context ) :
			this.template;

		return filteredTemplate( filteredTemplateArgs, this.context, this.allowExtensibility );
	}
}
