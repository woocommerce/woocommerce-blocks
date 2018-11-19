/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import {
	BaseControl,
	CheckboxControl,
	Spinner,
	TextControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import { flatMap, repeat, unescape as unescapeString, uniq, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.scss';

function getSelectOptions( tree, level = 0 ) {
	return flatMap( tree, ( treeNode ) => [
		{
			value: treeNode.id,
			label: repeat( '\u00A0', level * 3 ) + unescapeString( treeNode.name ),
		},
		...getSelectOptions( treeNode.children || [], level + 1 ),
	] );
}

/**
 * Component to handle edit mode of "Products by Category".
 */
class CategoryControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			list: [],
			search: '',
			loaded: false,
		};

		this.onValueChange = this.onValueChange.bind( this );
		this.getCategories = this.getCategories.bind( this );
	}

	componentDidMount() {
		this.getCategories();
	}

	getCategories() {
		this.setState( { list: [], loaded: false } );
		const { selected } = this.props;
		const { search } = this.state;
		const query = {
			per_page: 10,
			orderby: 'count',
			order: 'desc',
		};
		Promise.all( [
			apiFetch( {
				path: addQueryArgs( '/wc/v3/products/categories', { ...query, search } ),
			} ),
			apiFetch( {
				path: addQueryArgs( '/wc/v3/products/categories', {
					...query,
					include: selected.join( ',' ),
				} ),
			} ),
		] )
			.then( ( [ results, current ] ) => {
				const list = uniqBy( [
					...getSelectOptions( current ),
					...getSelectOptions( results ),
				], 'value' );

				this.setState( { list, loaded: true } );
			} )
			.catch( () => {
				this.setState( { list: [], loaded: true } );
			} );
	}

	onValueChange( value ) {
		const { onChange, selected } = this.props;
		return () => {
			const i = selected.indexOf( value + '' );
			if ( -1 === i ) {
				const newSelected = uniq( [ ...selected, value + '' ] );
				onChange( newSelected );
			} else {
				onChange( [ ...selected.slice( 0, i ), ...selected.slice( i + 1 ) ] );
			}
		};
	}

	render() {
		const { className, help, instanceId, label, selected = [] } = this.props;
		const { list, search } = this.state;
		const id = `wc-list-checkbox-${ instanceId }`;
		const isSelected = ( value ) => -1 !== selected.indexOf( value + '' );

		return (
			<BaseControl
				id={ id }
				help={ help }
				className={ 'wc-category-control ' + className }
			>
				<TextControl
					label={ __( 'Search Product Categories', 'woocomerce' ) }
					type="search"
					value={ search }
					onChange={ ( value ) =>
						this.setState( { search: value }, this.getCategories )
					}
				/>

				{ this.state.loaded ? (
					<fieldset
						className="wc-category-control__list"
						describedby={ `${ id }__help` }
					>
						<legend className="screen-reader-text">{ label }</legend>
						{ list.map( ( option, index ) => (
							<CheckboxControl
								key={ `${ option.label }-${ option.value }-${ index }` }
								label={ option.label }
								checked={ isSelected( option.value ) }
								onChange={ this.onValueChange( option.value ) }
							/>
						) ) }
					</fieldset>
				) : (
					<Spinner />
				) }
			</BaseControl>
		);
	}
}

CategoryControl.propTypes = {
	className: PropTypes.string,
	help: PropTypes.string,
	instanceId: PropTypes.number,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.array,
};

export default withInstanceId( CategoryControl );
