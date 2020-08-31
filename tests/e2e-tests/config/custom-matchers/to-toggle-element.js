expect.extend( {
	async toToggleElement( toggleLabel, selector ) {
		if ( ! selector ) {
			return {
				message: () =>
					`a selector is required to test element's presence`,
				pass: false,
			};
		}
		const hasSelectorMatch = async () => !! ( await page.$( selector ) );
		const initiallyHadSelectorMatch = await hasSelectorMatch();

		await toggleLabel.click();

		if ( initiallyHadSelectorMatch && ( await hasSelectorMatch() ) ) {
			return {
				message: () =>
					`element matching selector '${ selector }' found but none was expected after one click.`,
				pass: false,
			};
		} else if (
			! initiallyHadSelectorMatch &&
			! ( await hasSelectorMatch() )
		) {
			return {
				message: () =>
					`element matching selector '${ selector }' not found but at least one was expected after one click.`,
				pass: false,
			};
		}

		await toggleLabel.click();

		if ( initiallyHadSelectorMatch && ! ( await hasSelectorMatch() ) ) {
			return {
				message: () =>
					`element matching selector '${ selector }' not found but at least one was expected after two clicks.`,
				pass: false,
			};
		} else if (
			! initiallyHadSelectorMatch &&
			( await hasSelectorMatch() )
		) {
			return {
				message: () =>
					`element matching selector '${ selector }' found but none was expected after two clicks.`,
				pass: false,
			};
		}

		return {
			message: () => `element presence reacted to toggle changes.`,
			pass: true,
		};
	},
} );
