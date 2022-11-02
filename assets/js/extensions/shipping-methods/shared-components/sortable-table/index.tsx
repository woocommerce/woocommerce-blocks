/**
 * External dependencies
 */
import { Icon, dragHandle } from '@wordpress/icons';
import { useMemo } from '@wordpress/element';
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { objectHasProp } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import './admin.scss';

export interface SortableData extends Record< string, unknown > {
	id: UniqueIdentifier;
}

type ColumnProps = {
	name: string;
	label: string;
	width?: string;
	align?: string;
	renderCallback?: ( row: SortableData ) => JSX.Element;
};

const TableRow = ( {
	children,
	id,
}: {
	children: JSX.Element[];
	id: UniqueIdentifier;
} ): JSX.Element => {
	const { attributes, listeners, transform, transition, setNodeRef } =
		useSortable( {
			id,
		} );
	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};
	return (
		<tr ref={ setNodeRef } style={ style }>
			<>
				<td className="sortable-table__handle">
					<Icon
						icon={ dragHandle }
						size={ 14 }
						{ ...attributes }
						{ ...listeners }
					/>
				</td>
				{ children }
			</>
		</tr>
	);
};

export const SortableTable = ( {
	columns,
	data,
	onSort,
	className,
}: {
	columns: ColumnProps[];
	data: SortableData[];
	onSort: ( oldIndex: number, newIndex: number ) => void;
	className?: string;
} ): JSX.Element => {
	const items = useMemo( () => data.map( ( { id } ) => id ), [ data ] );

	const sensors = useSensors(
		useSensor( MouseSensor, {} ),
		useSensor( TouchSensor, {} ),
		useSensor( KeyboardSensor, {} )
	);

	function handleDragEnd( event: DragEndEvent ) {
		const { active, over } = event;

		if ( active !== null && over !== null && active?.id !== over?.id ) {
			onSort( items.indexOf( active.id ), items.indexOf( over.id ) );
		}
	}

	const getColumnProps = ( column: ColumnProps, parentClassName: string ) => {
		const align = column?.align || 'left';
		const width = column?.width || 'auto';

		return {
			className: `${ parentClassName }-${ column.name } align-${ align }`,
			style: { width },
		};
	};

	return (
		<DndContext
			sensors={ sensors }
			onDragEnd={ handleDragEnd }
			collisionDetection={ closestCenter }
			modifiers={ [ restrictToVerticalAxis ] }
		>
			<table className={ `${ className } sortable-table` }>
				<thead>
					<tr>
						<th
							className={ `sortable-table__sort` }
							style={ { width: '1%' } }
						>
							&nbsp;
						</th>
						{ columns.map( ( column ) => (
							<th
								key={ column.name }
								{ ...getColumnProps(
									column,
									`sortable-table__column`
								) }
							>
								{ column.label }
							</th>
						) ) }
					</tr>
				</thead>
				<tbody>
					<SortableContext
						items={ items }
						strategy={ verticalListSortingStrategy }
					>
						{ data &&
							data.map(
								( row ) =>
									row && (
										<TableRow key={ row.id } id={ row.id }>
											{ columns.map( ( column ) => (
												<td
													key={ `${ row.id }-${ column.name }` }
													{ ...getColumnProps(
														column,
														`sortable-table__column`
													) }
												>
													{ column.renderCallback ? (
														column.renderCallback(
															row
														)
													) : (
														<>
															{ objectHasProp(
																row,
																column.name
															) &&
																row[
																	column.name
																] }
														</>
													) }
												</td>
											) ) }
										</TableRow>
									)
							) }
					</SortableContext>
				</tbody>
			</table>
		</DndContext>
	);
};

export default SortableTable;
