/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
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
			selected: [],
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
		const { list, selected } = this.state;
		const onChange = ( newList ) => this.setState( { selected: newList } );
		return (
			<SearchListControl
				className="woocommerce-product-categories"
				list={ list }
				selected={ selected }
				onChange={ onChange }
			/>
		);
	}
}

ProductCategoryControl.propTypes = {
	className: PropTypes.string,
};

export default ProductCategoryControl;
