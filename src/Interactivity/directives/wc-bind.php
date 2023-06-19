<?php
/**
 * Process wc-bind directive attribute.
 *
 * @param WC_Directive_Processor $tags Tags.
 * @param WC_Directive_Context   $context Directive context.
 */
function woocommerce_interactivity_process_wc_bind( $tags, $context ) {
	if ( $tags->is_tag_closer() ) {
		return;
	}

	$prefixed_attributes = $tags->get_attribute_names_with_prefix( 'data-wc-bind--' );

	foreach ( $prefixed_attributes as $attr ) {
		list( , $bound_attr ) = WC_Directive_Processor::parse_attribute_name( $attr );
		if ( empty( $bound_attr ) ) {
			continue;
		}

		$expr  = $tags->get_attribute( $attr );
		$value = woocommerce_interactivity_evaluate_reference( $expr, $context->get_context() );
		$tags->set_attribute( $bound_attr, $value );
	}
}
