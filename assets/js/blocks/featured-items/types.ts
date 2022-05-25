/**
 * External dependencies
 */
import type { Block, BlockEditProps } from '@wordpress/blocks';

export type EditorBlock< T > = Block< T > & BlockEditProps< T >;

export interface Coordinates {
	x: number;
	y: number;
}

export interface GenericBlockUIConfig {
	icon: JSX.Element;
	label: string;
}

export type ImageFit = 'cover' | 'none';
