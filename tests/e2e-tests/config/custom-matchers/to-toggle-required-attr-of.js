expect.extend( {
	async toToggleRequiredAttrOf( checkboxLabel, selector ) {
		if ( ! selector ) {
			return {
				message: () =>
					`a selector is required to test element's visibility`,
				pass: false,
			};
		}

		const isRequired = async () =>
			!! ( await page.$eval( selector, ( e ) => e.required ) );
		const wasInitiallyRequired = await isRequired();
		const noChangeError = {
			message: () =>
				`input did not change its required attribute after clicking the checkbox`,
			pass: false,
		};

		await checkboxLabel.click();

		if ( wasInitiallyRequired === ( await isRequired() ) ) {
			return noChangeError;
		}

		await checkboxLabel.click();

		if ( wasInitiallyRequired !== ( await isRequired() ) ) {
			return noChangeError;
		}

		return {
			message: () =>
				`input required attribute reacted to checkbox changes.`,
			pass: true,
		};
	},
} );
