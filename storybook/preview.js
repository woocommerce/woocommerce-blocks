/**
 * Internal dependencies
 */
import './style.scss';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: 'centered',
	a11y: {
		element: '#storybook-root',
		config: {},
		options: {},
		manual: true,
	},
};
