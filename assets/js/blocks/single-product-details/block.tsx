/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
const ReviewsTab = () => {
	return <div>tab</div>;
};

const AdditionalInformationTab = () => {
	return <div>tab</div>;
};

const DescriptionTab = () => {
	return (
		<div
			className="woocommerce-Tabs-panel woocommerce-Tabs-panel--<?php echo esc_attr( $key ); ?> panel entry-content wc-tab"
			id="tab-<?php echo esc_attr( $key ); ?>"
			role="tabpanel"
			aria-labelledby="tab-title-<?php echo esc_attr( $key ); ?>"
		>
			{ /* <?php
	if ( isset( $product_tab['callback'] ) ) {
		call_user_func( $product_tab['callback'], $key, $product_tab );
	}
	?> */ }
		</div>
	);
};

const ProductTabContent = ( { content } ) => {
	return (
		<li
			className="<?php echo esc_attr( $key ); ?>_tab"
			id="tab-title-<?php echo esc_attr( $key ); ?>"
			role="tab"
			aria-controls="tab-<?php echo esc_attr( $key ); ?>"
		>
			{ content }
		</li>
	);
};

const ProductTabTitle = ( { title, active } ) => {
	return (
		<li
			className={ classnames( '<?php echo esc_attr( $key ); ?>_tab', {
				active,
			} ) }
			id="tab-title-<?php echo esc_attr( $key ); ?>"
			role="tab"
			aria-controls="tab-<?php echo esc_attr( $key ); ?>"
		>
			<a href="#tab-<?php echo esc_attr( $key ); ?>">{ title }</a>
		</li>
	);
};

const ProductTabsList = ( { productTabs } ) => {
	return (
		<div className="woocommerce-tabs wc-tabs-wrapper">
			<ul className="tabs" role="tablist">
				{ productTabs.map( ( productTab ) => (
					<ProductTabTitle
						title={ productTab.title }
						active={ productTab.active }
					/>
				) ) }
			</ul>
			{ productTabs.map( ( productTab ) => (
				<ProductTabContent
					content={ productTab.content }
					active={ productTab.active }
				/>
			) ) }

			{ /* <?php do_action( 'woocommerce_product_after_tabs' ); ?> */ }
		</div>
	);
};

export const SingleProductDetails = ( props ) => {
	console.log( { props } );
	return (
		<ProductTabsList
			className="wc-block-single-product-details"
			productTabs={ [
				{
					id: 1,
					title: 'Description',
					active: true,
					content: 'Content',
				},
				{
					id: 1,
					title: 'Additional Information',
					active: false,
					content: 'Content',
				},
				{ id: 1, title: 'Reviews', active: false, content: 'Content' },
			] }
		/>
	);
};

export default SingleProductDetails;
