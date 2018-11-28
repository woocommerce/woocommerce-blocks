/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { find } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';
import SearchListControl from '../search-list-control';

class ProductCategoryControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			list: [],
		};
	}

	componentDidMount() {
		apiFetch( {
			path: addQueryArgs( '/wc/v3/products/categories', { per_page: -1 } ),
		} )
			.then( ( list ) => {
				this.setState( { list } );
			} )
			.catch( () => {
				this.setState( { list: [] } );
			} );
	}

	render() {
		const { list } = this.state;
		const { selected, onChange } = this.props;
		return (
			<SearchListControl
				className="woocommerce-product-categories"
				list={ list }
				selected={ selected.map( ( id ) => find( list, { id } ) ).filter( Boolean ) }
				onChange={ onChange }
			/>
		);
	}
}

ProductCategoryControl.propTypes = {
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.array.isRequired,
};

export default ProductCategoryControl;
