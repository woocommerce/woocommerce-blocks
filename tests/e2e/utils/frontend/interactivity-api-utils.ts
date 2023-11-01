/**
 * External dependencies
 */
import { Locator } from '@playwright/test';

const decodeHtmlEntities = ( htmlText ) => {
	const txt = window.document.createElement( 'textarea' );
	txt.innerHTML = htmlText;
	return txt.value;
};

export class InteractivityApiUtils {
	block: Locator = {} as Locator;

	/**
	 * Sets the block locator for the current instance.
	 *
	 * @param {Locator} block - The block locator to set.
	 * @return {InteractivityApiUtils} The current instance for chaining.
	 */
	withBlock( block: Locator ) {
		this.block = block;
		return this;
	}

	/**
	 * Retrieves the block context from the 'data-wc-context' attribute of the block.
	 *
	 * This method first retrieves the 'data-wc-context' attribute from the block, which is expected to be a string
	 * containing HTML entities. It then uses the DOMParser API to parse this string into a Document object, and retrieves
	 * the text content of the body element of this Document.
	 *
	 * The text content is expected to be a JSON string, which is then parsed into a JavaScript object and returned.
	 *
	 * @return {Promise<any>} A promise that resolves to the block context as a JavaScript object.
	 */
	async getBlockContext< BlockContext >(): Promise< BlockContext > {
		const blockContextWithHTMLEntities = await this.block.getAttribute(
			'data-wc-context'
		);
		const blockContextWithoutHTMLEntities = decodeHtmlEntities(
			blockContextWithHTMLEntities
		);
		const blockContext = JSON.parse(
			blockContextWithoutHTMLEntities ?? ''
		);
		return blockContext;
	}
}
