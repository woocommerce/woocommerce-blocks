/**
 * External dependencies
 */
const PuppeteerEnvironment = require( 'jest-environment-puppeteer' );
const { addAttach } = require( 'jest-html-reporters/helper' );

class E2EEnvironment extends PuppeteerEnvironment {
	async handleTestEvent( event ) {
		if (
			event.name === 'test_fn_failure' ||
			event.asyncError !== undefined
		) {
			const attach = await this.global.page.screenshot();
			console.log( 'taking screenshot' );
			await addAttach( {
				attach,
				description: 'Full Page Screenshot',
				context: this.global,
				bufferFormat: 'utf8',
			} );
		}
	}
}

module.exports = E2EEnvironment;
