<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * Downloads class.
 */
class Downloads extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-downloads';

	/**
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string | void Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		if ( ! empty( $attributes['isPreview'] ) ) {
			$order          = $this->get_preview_order();
			$show_downloads = true;
			$downloads      = [
				[
					'product_name'  => 'Test Product',
					'product_url'   => 'https://example.com',
					'download_name' => 'Test Download',
					'download_url'  => 'https://example.com',
				],
			];
		} else {
			$order = $this->get_order();

			if ( ! $this->is_current_customer_order( $order ) ) {
				$order = null;
			}

			$show_downloads = $order && $order->has_downloadable_item() && $order->is_download_permitted();
			$downloads      = $order ? $order->get_downloadable_items() : [];
		}

		$content            = $order && $show_downloads ? $this->render_content( $order, $downloads ) : $this->render_content_fallback();
		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return $content ? sprintf(
			'<div class="wc-block-%4$s %1$s %2$s">%3$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			$content,
			esc_attr( $this->block_name )
		) : '';
	}

	/**
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @param array     $downloads Array of downloads.
	 * @return string
	 */
	protected function render_content( $order, $downloads = [] ) {
		return '
			<section class="woocommerce-order-downloads">
				<table class="woocommerce-table woocommerce-table--order-downloads shop_table shop_table_responsive order_details" cellspacing="0">
					<thead>
						<tr>
							' . $this->render_order_downloads_column_headers( $order ) . '
						</td>
					</thead>
					<tbody>
						' . $this->render_order_downloads( $order, $downloads ) . '
					</tbody>
				</table>
			</section>
		';
	}

	/**
	 * Render column headers for downloads table.
	 *
	 * @return string
	 */
	protected function render_order_downloads_column_headers() {
		$columns = wc_get_account_downloads_columns();
		$return  = '';

		foreach ( $columns as $column_id => $column_name ) {
			$return .= '<th class="' . esc_attr( $column_id ) . '"><span class="nobr">' . esc_html( $column_name ) . '</span></th>';
		}

		return $return;
	}

	/**
	 * Render downloads.
	 *
	 * @param \WC_Order $order Order object.
	 * @param array     $downloads Array of downloads.
	 * @return string
	 */
	protected function render_order_downloads( $order, $downloads ) {
		$return = '';
		foreach ( $downloads as $download ) {
			$return .= '<tr>' . $this->render_order_download_row( $download ) . '</tr>';
		}
		return $return;
	}

	/**
	 * Render a download row in the table.
	 *
	 * @param array $download Download data.
	 * @return string
	 */
	protected function render_order_download_row( $download ) {
		$return = '';

		foreach ( wc_get_account_downloads_columns() as $column_id => $column_name ) {
			$return .= '<td class="' . esc_attr( $column_id ) . '" data-title="' . esc_attr( $column_name ) . '">';

			if ( has_action( 'woocommerce_account_downloads_column_' . $column_id ) ) {
				$return .= $this->get_hook_content( 'woocommerce_account_downloads_column_' . $column_id, [ $download ] );
			} else {
				switch ( $column_id ) {
					case 'download-product':
						if ( $download['product_url'] ) {
							$return .= '<a href="' . esc_url( $download['product_url'] ) . '">' . esc_html( $download['product_name'] ) . '</a>';
						} else {
							$return .= esc_html( $download['product_name'] );
						}
						break;
					case 'download-file':
						$return .= '<a href="' . esc_url( $download['download_url'] ) . '" class="woocommerce-MyAccount-downloads-file button alt">' . esc_html( $download['download_name'] ) . '</a>';
						break;
					case 'download-remaining':
						$return .= is_numeric( $download['downloads_remaining'] ) ? esc_html( $download['downloads_remaining'] ) : esc_html__( '&infin;', 'woo-gutenberg-products-block' );
						break;
					case 'download-expires':
						if ( ! empty( $download['access_expires'] ) ) {
							$return .= '<time datetime="' . esc_attr( gmdate( 'Y-m-d', strtotime( $download['access_expires'] ) ) ) . '" title="' . esc_attr( strtotime( $download['access_expires'] ) ) . '">' . esc_html( date_i18n( get_option( 'date_format' ), strtotime( $download['access_expires'] ) ) ) . '</time>';
						} else {
							$return .= esc_html__( 'Never', 'woo-gutenberg-products-block' );
						}
						break;
				}
			}

			$return .= '</td>';
		}

		return $return;
	}
}
