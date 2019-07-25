/** @format */
/**
 * External dependencies
 */
import { applyFilters, doAction } from '@wordpress/hooks';

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

		doAction( `woocommerce-blocks-before-${ this.name }`, filteredTemplate, filteredTemplateArgs, this.context );
		const template = filteredTemplate( filteredTemplateArgs, this.context, this.allowExtensibility );
		doAction( `woocommerce-blocks-after-${ this.name }`, filteredTemplate, filteredTemplateArgs, this.context );

		return template;
	}
}
