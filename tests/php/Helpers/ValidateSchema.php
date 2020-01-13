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
	 * Compare an object to the schema and return the diff.
	 *
	 * @param object $object Object to compare.
	 * @return array
	 */
	public function get_diff_from_object( $object ) {
		$schema_diff = array_diff(
			array_keys( $this->schema['properties'] ),
			array_keys( $object )
		);

		foreach ( $this->get_schema_with_nested_properties() as $property_name => $property_schema ) {
			$property_value = current( $object[ $property_name ] );

			if ( ! empty( $property_value ) ) {
				$schema_diff[ $property_name ] = array_diff(
					array_keys( $property_schema['items']['properties'] ),
					array_keys( $property_value )
				);
			} else {
				$schema_diff[] = $property_name;
			}
		}

		return array_filter( $schema_diff );
	}

	/**
	 * Return schema which expects nested properties.
	 *
	 * @return array
	 */
	protected function get_schema_with_nested_properties() {
		return array_filter(
			$this->schema['properties'],
			function( $property ) {
				return isset( $property['items']['properties'] );
			}
		);
	}
}
