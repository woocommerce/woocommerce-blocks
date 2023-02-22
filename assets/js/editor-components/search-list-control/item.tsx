/**
 * Internal dependencies
 */
import { CheckboxControl } from '@wordpress/components';
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
	const classes = [ className, 'woocommerce-search-list__item' ];
	classes.push( `depth-${ depth }` );
	if ( isSingle ) {
		classes.push( 'is-radio-button' );
	}
	if ( showCount ) {
		classes.push( 'has-count' );
	}
	const hasBreadcrumbs = item.breadcrumbs && item.breadcrumbs.length;
	const name = props.name || `search-list-item-${ controlId }`;
	const id = `${ name }-${ item.id }`;

	return item.children.length ? (
		<div
			className={ classes.join( ' ' ) }
			onClick={ () =>
				setExpandedPanelId( expandedPanelId === item.id ? -1 : item.id )
			}
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
		<label htmlFor={ id } className={ classes.join( ' ' ) }>
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
