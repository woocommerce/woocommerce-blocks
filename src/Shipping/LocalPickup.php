<?php
namespace Automattic\WooCommerce\Blocks\Shipping;

use WC_Shipping_Method;

/**
 * Local Pickup Shipping Method.
 */
class LocalPickup extends WC_Shipping_Method {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id                 = 'blocks_local_pickup';
		$this->method_title       = __( 'Local pickup', 'woo-gutenberg-products-block' );
		$this->method_description = __( 'Allows users to choose local pickup locations during checkout.', 'woo-gutenberg-products-block' );
		$this->init();
	}

	/**
	 * Init function.
	 */
	public function init() {
		$this->init_form_fields();
		$this->init_settings();

		$this->enabled          = $this->get_option( 'enabled' );
		$this->title            = $this->get_option( 'title' );
		$this->tax_status       = $this->get_option( 'tax_status' );
		$this->cost             = $this->get_option( 'cost' );
		$this->pickup_locations = get_option( $this->id . '_pickup_locations', [] );

		add_action( 'woocommerce_update_options_shipping_' . $this->id, array( $this, 'process_admin_options' ) );
	}

	/**
	 * Calculate shipping.
	 *
	 * @param array $package Package information.
	 */
	public function calculate_shipping( $package = array() ) {
		if ( $this->pickup_locations ) {
			foreach ( $this->pickup_locations as $location ) {
				$this->add_rate(
					array(
						'id'        => $this->id . ':' . sanitize_key( $location['name'] ),
						'label'     => $this->title . ' (' . wp_kses_post( $location['name'] ) . ')',
						'package'   => $package,
						'cost'      => wc_format_decimal( $location['cost'] ),
						'meta_data' => array(
							'name'    => wp_kses_post( $location['name'] ),
							'address' => $location['address'],
							'details' => $location['details'],
						),
					)
				);
			}
		} else {
			$this->add_rate(
				array(
					'id'      => $this->id,
					'label'   => $this->title,
					'package' => $package,
					'cost'    => $this->cost,
				)
			);
		}
	}

	/**
	 * Initialize form fields.
	 */
	public function init_form_fields() {
		$this->form_fields = array(
			'enabled'    => array(
				'title'   => __( 'Enable', 'woo-gutenberg-products-block' ),
				'type'    => 'checkbox',
				'label'   => __( 'If enabled, this method will appear on the block based checkout.', 'woo-gutenberg-products-block' ),
				'default' => 'no',
			),
			'title'      => array(
				'title'       => __( 'Title', 'woo-gutenberg-products-block' ),
				'type'        => 'text',
				'description' => __( 'This controls the title which the user sees during checkout.', 'woo-gutenberg-products-block' ),
				'default'     => __( 'Local pickup', 'woo-gutenberg-products-block' ),
				'desc_tip'    => true,
			),
			'tax_status' => array(
				'title'   => __( 'Tax status', 'woo-gutenberg-products-block' ),
				'type'    => 'select',
				'class'   => 'wc-enhanced-select',
				'default' => 'taxable',
				'options' => array(
					'taxable' => __( 'Taxable', 'woo-gutenberg-products-block' ),
					'none'    => _x( 'None', 'Tax status', 'woo-gutenberg-products-block' ),
				),
			),
			'cost'       => array(
				'title'       => __( 'Cost', 'woo-gutenberg-products-block' ),
				'type'        => 'text',
				'placeholder' => '0',
				'description' => __( 'Optional cost for local pickup.', 'woo-gutenberg-products-block' ),
				'default'     => '',
				'desc_tip'    => true,
			),
		);
	}

	/**
	 * See if the method is available.
	 *
	 * @param array $package Package information.
	 * @return bool
	 */
	public function is_available( $package ) {
		return apply_filters( 'woocommerce_shipping_' . $this->id . '_is_available', 'yes' === $this->enabled, $package, $this );
	}

	/**
	 * Row for the settings table.
	 *
	 * @param array $location Location data.
	 * @return string
	 */
	protected function pickup_location_row( $location = [] ) {
		ob_start();
		?>
		<td class="sort" width="1%"></td>
		<td><input type="text" name="locationName[]" value="<?php echo esc_attr( $location['name'] ?? '' ); ?>" /></td>
		<td><input type="text" name="locationAddress[]" value="<?php echo esc_attr( $location['address'] ?? '' ); ?>" /></td>
		<td><input type="text" name="details[]" value="<?php echo esc_attr( $location['details'] ?? '' ); ?>" /></td>
		<td><input type="text" name="cost[]" value="<?php echo esc_attr( $location['cost'] ?? '' ); ?>" placeholder="<?php echo esc_html( wc_format_decimal( 0 ) ); ?>" /></td>
		<?php
		return ob_get_clean(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Process options in admin.
	 */
	public function process_admin_options() {
		parent::process_admin_options();

		$locations      = [];
		$location_names = array_map( 'sanitize_text_field', wp_unslash( $_POST['locationName'] ?? [] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing

		foreach ( $location_names as $index => $location_name ) {
			$locations[] = [
				'name'    => $location_name,
				'address' => wc_clean( wp_unslash( $_POST['locationAddress'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
				'details' => wc_clean( wp_unslash( $_POST['details'][ $index ] ?? '' ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
				'cost'    => wc_format_decimal( wc_clean( wp_unslash( $_POST['cost'][ $index ] ?? '' ) ) ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
			];
		}

		update_option( $this->id . '_pickup_locations', $locations );
		$this->pickup_locations = $locations;
	}

	/**
	 * Admin options screen.
	 *
	 * See also WC_Shipping_Method::admin_options().
	 */
	public function admin_options() {
		parent::admin_options();
		?>
<table class="form-table" id="pickup_locations">
	<tbody>
		<tr valign="top" class="">
			<th scope="row" class="titledesc">
				<label>
					<?php esc_html_e( 'Pickup Locations', 'woo-gutenberg-products-block' ); ?>
				</label>
			</th>
			<td class="">
				<table class="widefat wc_input_table sortable">
					<thead>
						<tr>
							<th class="wc-shipping-zone-method-sort"></th>
							<th class="wc-shipping-zone-method-title"><?php esc_html_e( 'Location Name', 'woo-gutenberg-products-block' ); ?></th>
							<th class="wc-shipping-zone-method-enabled"><?php esc_html_e( 'Location Address', 'woo-gutenberg-products-block' ); ?></th>
							<th class="wc-shipping-zone-method-enabled"><?php esc_html_e( 'Collection Details', 'woo-gutenberg-products-block' ); ?></th>
							<th class="wc-shipping-zone-method-enabled"><?php esc_html_e( 'Cost', 'woo-gutenberg-products-block' ); ?></th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="5">
								<button type="button" class="add button"><?php esc_html_e( 'Add pickup location', 'woo-gutenberg-products-block' ); ?></button>
								<button type="button" class="button minus remove_rows"><?php esc_html_e( 'Remove selected', 'woo-gutenberg-products-block' ); ?></button>
							</th>
						</tr>
					</tfoot>
					<tbody>
						<?php
						foreach ( $this->pickup_locations as $location ) {
							echo '<tr>';
							echo $this->pickup_location_row( $location ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							echo '</tr>';
						}
						?>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<script type="text/javascript">
	function insertRow() {
		let tableRef = document.querySelectorAll('#pickup_locations table')[0];
		var tbodyRef = tableRef.getElementsByTagName('tbody')[0];
		let size = tbodyRef.getElementsByTagName('tr').length;
		let newRow = tbodyRef.insertRow( size );
		let blankRow = '<?php echo esc_js( $this->pickup_location_row() ); ?>';
		var txt = document.createElement('textarea');
		txt.innerHTML = blankRow;
		newRow.innerHTML = txt.value;
	}

	var button = document.querySelectorAll("#pickup_locations button.add")[0];

	button.addEventListener( "click", function(e) {
		insertRow();
		return false;
	}, false );
</script>
		<?php
	}
}
