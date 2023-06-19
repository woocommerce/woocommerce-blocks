<?php
/**
 * Process wc-text directive attribute.
 *
 * @param WC_Directive_Processor $tags Tags.
 * @param WC_Directive_Context   $context Directive context.
 */
function woocommerce_interactivity_process_wc_text( $tags, $context ) {
	if ( $tags->is_tag_closer() ) {
		return;
	}

	$value = $tags->get_attribute( 'data-wc-text' );
	if ( null === $value ) {
		return;
	}

	$text = woocommerce_interactivity_evaluate_reference( $value, $context->get_context() );
	$tags->set_inner_html( esc_html( $text ) );
}
