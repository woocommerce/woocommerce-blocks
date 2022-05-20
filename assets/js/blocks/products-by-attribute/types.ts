/**
 * External dependencies
 */
import { BlockAlignment } from '@wordpress/blocks';

export interface Attributes {
	align?: BlockAlignment;
	attributes: Array< string >;
	attrOperator: string;
	columns: number;
	contentVisibility: {
		image: boolean;
		title: boolean;
		price: boolean;
		rating: boolean;
		button: boolean;
	};
	orderby: string;
	rows: number;
	alignButtons: boolean;
	isPreview: boolean;
	stockStatus: Array< string >;
}

export interface Props {
	/**
	 * The attributes for this block
	 */
	attributes: Attributes;
	/**
	 * The register block name.
	 */
	name: string;
	/**
	 * A callback to update attributes
	 */
	setAttributes: ( attributes: Partial< Attributes > ) => void;
	// from withSpokenMessages
	debouncedSpeak: ( message: string ) => void;
}
