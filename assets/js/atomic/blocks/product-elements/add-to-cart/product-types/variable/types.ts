/**
 * Internal dependencies
 */
import { Dictionary } from '~/types';

export type AttributesMap = Record<
	string,
	{ id: number; attributes: Dictionary }
>;

export interface VariationParam {
	id: number;
	variation: {
		attribute: string;
		value: string;
	}[];
}
