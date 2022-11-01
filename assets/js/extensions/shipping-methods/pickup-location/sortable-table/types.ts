/**
 * External dependencies
 */
import type { UniqueIdentifier } from '@dnd-kit/core';

export type ColumnProps = {
	name: string;
	label: string;
	width?: string;
	align?: string;
	renderCallback?: ( row: SortableData ) => JSX.Element;
};

export interface SortableData extends Record< string, unknown > {
	id: UniqueIdentifier;
}
