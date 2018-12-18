/**
 * External dependencies
 */
import { escapeRegExp, first, last } from 'lodash';
import { MenuItem } from '@wordpress/components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { IconChecked, IconUnchecked } from '../icons';

function getHighlightedName( name, search ) {
	if ( ! search ) {
		return name;
	}
	const re = new RegExp( escapeRegExp( search ), 'ig' );
	return name.replace( re, '<strong>$&</strong>' );
}

function getBreadcrumbsForDisplay( breadcrumbs ) {
	if ( breadcrumbs.length === 1 ) {
		return first( breadcrumbs );
	}
	if ( breadcrumbs.length === 2 ) {
		return first( breadcrumbs ) + ' › ' + last( breadcrumbs );
	}

	return first( breadcrumbs ) + ' … ' + last( breadcrumbs );
}

const SearchListItem = ( {
	className,
	depth = 0,
	item,
	isSelected,
	onSelect,
	search = '',
	showCount = false,
	...props
} ) => {
	const classes = [ className, 'woocommerce-search-list__item' ];
	classes.push( `depth-${ depth }` );

	return (
		<MenuItem
			key={ item.id }
			role="menuitemcheckbox"
			className={ classes.join( ' ' ) }
			onClick={ onSelect( item ) }
			isSelected={ isSelected }
			{ ...props }
		>
			<span className="woocommerce-search-list__item-state">
				{ isSelected ? <IconChecked /> : <IconUnchecked /> }
			</span>

			<span className="woocommerce-search-list__item-label">
				{ !! item.breadcrumbs.length && (
					<span className="woocommerce-search-list__item-prefix">
						{ getBreadcrumbsForDisplay( item.breadcrumbs ) }
					</span>
				) }
				<span
					className="woocommerce-search-list__item-name"
					dangerouslySetInnerHTML={ {
						__html: getHighlightedName( item.name, search ),
					} }
				/>
			</span>

			{ !! showCount && (
				<span className="woocommerce-search-list__item-count">
					{ item.count }
				</span>
			) }
		</MenuItem>
	);
};

SearchListItem.propTypes = {
	/**
	 * Additional CSS classes.
	 */
	className: PropTypes.string,
	/**
	 * Depth, non-zero if the list is hierarchical.
	 */
	depth: PropTypes.number,
	/**
	 * Current item to display.
	 */
	item: PropTypes.object,
	/**
	 * Whether this item is selected.
	 */
	isSelected: PropTypes.bool,
	/**
	 * Callback for selecting the item.
	 */
	onSelect: PropTypes.func,
	/**
	 * Search string, used to highlight the substring in the item name.
	 */
	search: PropTypes.string,
	/**
	 * Toggles the "count" bubble on/off.
	 */
	showCount: PropTypes.bool,
};

export default SearchListItem;
