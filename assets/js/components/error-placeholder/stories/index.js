/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import ErrorPlaceholder from '../';

export default {
	title: 'WooCommerce Blocks/base/ErrorPlaceholder',
	component: ErrorPlaceholder,
};

export const Default = () => (
	<div>
		<ErrorPlaceholder
			error={ {
				message:
					'Unfortunately, we seem to have encountered a slight problem',
				type: 'general',
			} }
		/>
	</div>
);
