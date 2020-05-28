/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, external } from '@woocommerce/icons';
import { ADMIN_URL } from '@woocommerce/settings';
import { Card, CardBody } from '@wordpress/components';

/**
 * Component to render an edit product link in the sidebar.
 */
const EditProductLink = ( { productId } ) => {
	return (
		<Card className="wc-block-single-product-edit-card">
			<CardBody>
				<div className="wc-block-single-product-edit-card-title">
					<a
						href={ `${ ADMIN_URL }post.php?post=${ productId }&action=edit` }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ __(
							"Edit this product's details",
							'woo-gutenberg-products-block'
						) }
						<Icon srcElement={ external } size={ 16 } />
					</a>
				</div>
				<div className="wc-block-single-product-edit-card-description">
					{ __(
						'Edit details such as title, price, description and more.',
						'woo-gutenberg-products-block'
					) }
				</div>
			</CardBody>
		</Card>
	);
};

export default EditProductLink;
