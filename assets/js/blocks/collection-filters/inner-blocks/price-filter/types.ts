/**
 * External dependencies
 */
import { BlockEditProps } from '@wordpress/blocks';

export type BlockAttributes = {
	showInputFields: boolean;
	inlineInput: boolean;
};

export interface EditProps extends BlockEditProps< BlockAttributes > {
	context: {
		collectionData: unknown[];
	};
}
