export default function getShortcode( props, name ) {
	const blockAttributes = props.attributes;
	const {
		attributes,
		attrOperator,
		categories,
		catOperator,
		orderby,
		products,
		tags,
		tagOperator,
	} = blockAttributes;
	const columns = blockAttributes.columns || wc_product_block_data.default_columns;
	const rows = blockAttributes.rows || wc_product_block_data.default_rows;

	const shortcodeAtts = new Map();
	shortcodeAtts.set( 'limit', rows * columns );
	shortcodeAtts.set( 'columns', columns );

	if ( categories && categories.length ) {
		shortcodeAtts.set( 'category', categories.join( ',' ) );
		if ( catOperator && 'all' === catOperator ) {
			shortcodeAtts.set( 'cat_operator', 'AND' );
		}
	}

	if ( attributes && attributes.length ) {
		shortcodeAtts.set( 'terms', attributes.map( ( { id } ) => id ).join( ',' ) );
		shortcodeAtts.set( 'attribute', attributes[ 0 ].attr_slug );
		if ( attrOperator && 'all' === attrOperator ) {
			shortcodeAtts.set( 'terms_operator', 'AND' );
		}
	}

	if ( tags && tags.length ) {
		shortcodeAtts.set( 'tag_ids', tags.join( ',' ) );
		if ( tagOperator && 'all' === tagOperator ) {
			shortcodeAtts.set( 'tag_operator', 'AND' );
		}
	}

	if ( orderby ) {
		if ( 'price_desc' === orderby ) {
			shortcodeAtts.set( 'orderby', 'price' );
			shortcodeAtts.set( 'order', 'DESC' );
		} else if ( 'price_asc' === orderby ) {
			shortcodeAtts.set( 'orderby', 'price' );
			shortcodeAtts.set( 'order', 'ASC' );
		} else if ( 'date' === orderby ) {
			shortcodeAtts.set( 'orderby', 'date' );
			shortcodeAtts.set( 'order', 'DESC' );
		} else {
			shortcodeAtts.set( 'orderby', orderby );
		}
	}

	// Toggle shortcode atts depending on block type.
	switch ( name ) {
		case 'woocommerce/product-best-sellers':
			shortcodeAtts.set( 'best_selling', '1' );
			break;
		case 'woocommerce/product-top-rated':
			shortcodeAtts.set( 'orderby', 'rating' );
			break;
		case 'woocommerce/product-on-sale':
			shortcodeAtts.set( 'on_sale', '1' );
			break;
		case 'woocommerce/product-new':
			shortcodeAtts.set( 'orderby', 'date' );
			shortcodeAtts.set( 'order', 'DESC' );
			break;
		case 'woocommerce/handpicked-products':
			if ( ! products.length ) {
				return '';
			}
			shortcodeAtts.set( 'ids', products.join( ',' ) );
			shortcodeAtts.set( 'limit', products.length );
			break;
		case 'woocommerce/product-category':
			if ( ! categories || ! categories.length ) {
				return '';
			}
			break;
		case 'woocommerce/products-by-attribute':
			if ( ! attributes || ! attributes.length ) {
				return '';
			}
			break;
		case 'woocommerce/products-by-tag':
			if ( ! tags || ! tags.length ) {
				return '';
			}
			break;
	}

	// Build the shortcode string out of the set shortcode attributes.
	let shortcode = '[products';
	for ( const [ key, value ] of shortcodeAtts ) {
		shortcode += ' ' + key + '="' + value + '"';
	}
	shortcode += ']';

	return shortcode;
}
