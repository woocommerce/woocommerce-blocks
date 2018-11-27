/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose, withInstanceId, withState } from '@wordpress/compose';
import { findIndex } from 'lodash';
import { MenuItem, MenuGroup, TextControl } from '@wordpress/components';
import PropTypes from 'prop-types';
import { Tag } from '@woocommerce/components';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component to display a searchable, selectable list of items.
 */
export class SearchListControl extends Component {
	constructor() {
		super( ...arguments );

		this.onSelect = this.onSelect.bind( this );
		this.onRemove = this.onRemove.bind( this );
	}

	onRemove( id ) {
		const { selected, onChange } = this.props;
		return () => {
			const i = findIndex( selected, { id } );
			onChange( [ ...selected.slice( 0, i ), ...selected.slice( i + 1 ) ] );
		};
	}

	onSelect( item ) {
		const { selected, onChange } = this.props;
		return () => {
			onChange( [ ...selected, item ] );
		};
	}

	isSelected( item ) {
		return -1 !== findIndex( this.props.selected, { id: item.id } );
	}

	render() {
		const { className, list, search, selected, setState } = this.props;
		return (
			<div className={ `woocommerce-search-list ${ className }` }>
				{ selected.length ? (
					<Fragment>
						<div className="woocommerce-search-list__selected">
							{ selected.map( ( item, i ) => (
								<Tag
									key={ i }
									label={ item.name }
									id={ item.id }
									remove={ this.onRemove }
								/>
							) ) }
						</div>
						<hr />
					</Fragment>
				) : null }

				<div className="woocommerce-search-list__search">
					<TextControl
						label={ __( 'Search for product categories', 'woocommerce' ) }
						value={ search }
						onChange={ ( value ) => setState( { search: value } ) }
					/>
				</div>

				<MenuGroup
					label={ __( 'Product Categories', 'woocommerce' ) }
					className="woocommerce-search-list__list"
				>
					{ list.map(
						( item ) =>
							this.isSelected( item ) ? null : (
								<MenuItem
									key={ item.id }
									className="woocommerce-search-list__item"
									onClick={ this.onSelect( item ) }
								>
									<span className="woocommerce-search-list__item-name">
										{ item.name }
									</span>
									<span className="woocommerce-search-list__item-count">
										{ item.count }
									</span>
								</MenuItem>
							)
					) }
				</MenuGroup>
			</div>
		);
	}
}

SearchListControl.propTypes = {
	className: PropTypes.string,
	list: PropTypes.array,
	onChange: PropTypes.func,
	selected: PropTypes.array,
	// from withState
	search: PropTypes.string,
	setState: PropTypes.func,
	// from withInstanceId
	instanceId: PropTypes.string,
};

export default compose( [
	withState( {
		search: '',
	} ),
	withInstanceId,
] )( SearchListControl );
