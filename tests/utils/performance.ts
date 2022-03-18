export async function getLoadingDurations() {
	return await page.evaluate( () => {
		const [
			{
				requestStart,
				responseStart,
				responseEnd,
				domContentLoadedEventEnd,
				loadEventEnd,
			},
		] = performance.getEntriesByType( 'navigation' );
		const paintTimings = performance.getEntriesByType( 'paint' );
		return {
			// Server side metric.
			serverResponse: responseStart - requestStart,
			// For client side metrics, consider the end of the response (the
			// browser receives the HTML) as the start time (0).
			firstPaint:
				paintTimings.find( ( { name } ) => name === 'first-paint' )
					.startTime - responseEnd,
			domContentLoaded: domContentLoadedEventEnd - responseEnd,
			loaded: loadEventEnd - responseEnd,
			firstContentfulPaint:
				paintTimings.find(
					( { name } ) => name === 'first-contentful-paint'
				).startTime - responseEnd,
			// This is evaluated right after Puppeteer found the block selector.
			firstBlock: performance.now() - responseEnd,
		};
	} );
}
