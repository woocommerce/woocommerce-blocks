/**
 * Internal dependencies
 */
import formStepAttributes from '../../form-step/attributes';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from './constants';

export const attributes: Record< string, Record< string, unknown > > = {
	...formStepAttributes( {
		defaultTitle: DEFAULT_TITLE,
		defaultDescription: DEFAULT_DESCRIPTION,
	} ),
	className: {
		type: 'string',
		default: '',
	},
	lock: {
		type: 'object',
		default: {
			move: true,
			remove: true,
		},
	},
};
