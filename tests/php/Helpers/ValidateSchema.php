<?php
/**
 * Helper used to validate schema differences.
 *
 * @package WooCommerce\Blocks\Tests
 */

namespace Automattic\WooCommerce\Blocks\Tests\Helpers;

/**
 * Validate schema.
 */
class ValidateSchema {
	/**
	 * The schema.
	 *
	 * @var array
	 */
	protected $schema = [];

	/**
	 * Constructor passed schema object.
	 *
	 * @param array $schema API schema representation.
	 */
	public function __construct( $schema ) {
		$this->schema = $schema;
	}

	/**
	 * Validate properties and return diff.
	 *
	 * @param object $object Object to compare.
	 * @param array  $schema Schema to find nested properties under.
	 * @param string $prefix Prefix to append to diff property names.
	 * @return array
	 */
	public function get_diff_from_object( $object, $schema = null, $prefix = '' ) {
		$missing      = [];
		$invalid_type = [];
		$no_schema    = [];

		if ( is_null( $schema ) ) {
			$schema = $this->schema['properties'];
		}

		if ( ! is_scalar( $object ) ) {
			$no_schema = array_diff( array_keys( $object ), array_keys( $schema ) );
		}

		foreach ( $schema as $property_name => $property_schema ) {
			// Validate property is set in object.
			if ( ! isset( $object[ $property_name ] ) ) {
				$missing[] = $prefix . $property_name;
				continue;
			}

			// Validate type.
			if ( $property_schema['type'] !== gettype( $object[ $property_name ] ) ) {
				$invalid_type[] = $prefix . $property_name;
				continue;
			}

			// Validate nested props.
			if ( isset( $property_schema['items']['properties'] ) ) {
				$diff         = $this->get_diff_from_object(
					current( $object[ $property_name ] ),
					$property_schema['items']['properties'],
					$prefix . $property_name . ':'
				);
				$missing      = isset( $diff['missing'] ) ? array_merge( $missing, $diff['missing'] ) : $missing;
				$invalid_type = isset( $diff['invalid_type'] ) ? array_merge( $invalid_type, $diff['invalid_type'] ) : $invalid_type;
				$no_schema    = isset( $diff['no_schema'] ) ? array_merge( $no_schema, $diff['no_schema'] ) : $no_schema;
			}
		}

		return array_filter(
			[
				'missing'      => array_values( array_filter( $missing ) ),
				'invalid_type' => array_values( array_filter( $invalid_type ) ),
				'no_schema'    => array_values( array_filter( $no_schema ) ),
			]
		);
	}
}
