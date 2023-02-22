/**
 * External dependencies
 */
import classNames from 'classnames';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { renderItemArgs } from './types';
import { getHighlightedName, getBreadcrumbsForDisplay } from './utils';

export const SearchListItem = ( {
	countLabel,
	className,
	depth = 0,
	controlId = '',
	item,
	isSelected,
	isSingle,
	onSelect,
	search = '',
	selected,
	useExpandedPanelId,
	...props
}: renderItemArgs ): JSX.Element => {
	const [ expandedPanelId, setExpandedPanelId ] = useExpandedPanelId;
	const showCount =
		countLabel !== undefined &&
		countLabel !== null &&
		item.count !== undefined &&
		item.count !== null;
	const hasBreadcrumbs = item.breadcrumbs && item.breadcrumbs.length;
	const hasChildren = item.children.length;
	const isExpanded = expandedPanelId === item.id;
	const classes = classNames(
		[ 'woocommerce-search-list__item', `depth-${ depth }` ],
		{
			'has-breadcrumbs': hasBreadcrumbs,
			'has-children': hasChildren,
			'has-count': showCount,
			'is-expanded': isExpanded,
			'is-radio-button': isSingle,
		}
	);

	const name = props.name || `search-list-item-${ controlId }`;
	const id = `${ name }-${ item.id }`;

	return hasChildren ? (
		<div
			className={ classes }
			onClick={ () => setExpandedPanelId( isExpanded ? -1 : item.id ) }
			onKeyDown={ () => void 0 }
			role="treeitem"
			tabIndex={ 0 }
		>
			<CheckboxControl
				className="woocommerce-search-list__item-input"
				checked={ isSelected }
				indeterminate={
					! isSelected &&
					item.children.some( ( child ) =>
						selected.find(
							( selectedItem ) => selectedItem.id === child.id
						)
					)
				}
				label={ getHighlightedName( item.name, search ) }
				onChange={ () => {
					for ( const child of item.children ) {
						onSelect( child );
					}
				} }
			/>

			{ !! showCount && (
				<span className="woocommerce-search-list__item-count">
					{ countLabel || item.count }
				</span>
			) }
		</div>
	) : (
		<label htmlFor={ id } className={ classes }>
			{ isSingle ? (
				<input
					type="radio"
					id={ id }
					name={ name }
					value={ item.value }
					onChange={ onSelect( item ) }
					checked={ isSelected }
					className="woocommerce-search-list__item-input"
					{ ...props }
				></input>
			) : (
				<input
					type="checkbox"
					id={ id }
					name={ name }
					value={ item.value }
					onChange={ onSelect( item ) }
					checked={ isSelected }
					className="woocommerce-search-list__item-input"
					{ ...props }
				></input>
			) }

			<span className="woocommerce-search-list__item-label">
				{ hasBreadcrumbs ? (
					<span className="woocommerce-search-list__item-prefix">
						{ getBreadcrumbsForDisplay( item.breadcrumbs ) }
					</span>
				) : null }
				<span className="woocommerce-search-list__item-name">
					{ getHighlightedName( item.name, search ) }
				</span>
			</span>

			{ !! showCount && (
				<span className="woocommerce-search-list__item-count">
					{ countLabel || item.count }
				</span>
			) }
		</label>
	);
};

export default SearchListItem;
