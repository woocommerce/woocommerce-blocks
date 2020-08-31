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

		await checkboxLabel.click();

		if ( isRequired() === wasInitiallyRequired ) {
			return {
				message: () =>
					`input did not changes it's required attribute after clicking the checkbox`,
				pass: false,
			};
		}

		return {
			message: () =>
				`input required attribute reacted to checkbox changes.`,
			pass: true,
		};
	},
} );
