/**
 * External dependencies
 */
import styled from '@emotion/styled';
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
	arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { objectHasProp } from '@woocommerce/types';

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
				<td>
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

const StyledTable = styled.table`
	background: #fff;
	border: 1px solid #c3c4c7;
	box-shadow: 0 1px 1px rgb( 0 0 0 / 4% );
	border-spacing: 0;
	width: 100%;
	clear: both;
	margin: 0;
	font-size: 14px;

	.align-left {
		text-align: left;
		.components-flex {
			justify-content: flex-start;
			gap: 0;
		}
	}
	.align-right {
		text-align: right;
		.components-flex {
			justify-content: flex-end;
			gap: 0;
		}
	}
	.align-center {
		text-align: center;
		> * {
			margin: 0 auto;
		}
		.components-flex {
			display: block;
		}
	}

	&__handle {
		cursor: move;
	}

	th {
		position: relative;
		color: #2c3338;
		text-align: left;
		vertical-align: middle;
		vertical-align: top;
		border-bottom: 1px solid #c3c4c7;
		word-wrap: break-word;
	}

	tbody {
		tr:nth-of-type( odd ) td {
			background: #f9f9f9;
		}
		td {
			border-top: 2px solid #f9f9f9;
			vertical-align: top;
			margin-bottom: 9px;
		}
	}

	tfoot {
		td {
			text-align: left;
			vertical-align: middle;
		}
	}

	thead,
	tfoot,
	tbody {
		td,
		th {
			padding: 16px 0 16px 24px;
			line-height: 1.5;

			&:last-child {
				padding-right: 24px;
			}

			> svg,
			> .components-base-control {
				margin: 3px 0;
			}
		}
	}
`;

export const SortableTable = ( {
	columns,
	data,
	setData,
	className,
	footerContent: FooterContent,
}: {
	columns: ColumnProps[];
	data: SortableData[];
	setData: ( data: SortableData[] ) => void;
	className?: string;
	footerContent?: () => JSX.Element;
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
			const newData = arrayMove(
				data,
				items.indexOf( active.id ),
				items.indexOf( over.id )
			);
			setData( newData );
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
			<StyledTable className={ `${ className } sortable-table` }>
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
				{ FooterContent && (
					<tfoot>
						<tr>
							<td colSpan={ columns.length + 1 }>
								<FooterContent />
							</td>
						</tr>
					</tfoot>
				) }
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
			</StyledTable>
		</DndContext>
	);
};

export default SortableTable;
