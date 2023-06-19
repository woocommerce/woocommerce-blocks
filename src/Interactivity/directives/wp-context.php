<?php
/**
 * Process wc-context directive attribute.
 *
 * @package wc-directives
 */

/**
 * Process wc-context directive attribute.
 *
 * @param WC_Directive_Processor $tags Tags.
 * @param WC_Directive_Context   $context Directive context.
 */
function gutenberg_interactivity_process_wc_context( $tags, $context ) {
	if ( $tags->is_tag_closer() ) {
		$context->rewind_context();
		return;
	}

	$value = $tags->get_attribute( 'data-wc-context' );
	if ( null === $value ) {
		// No data-wc-context directive.
		return;
	}

	$new_context = json_decode( $value, true );
	if ( null === $new_context ) {
		// Invalid JSON defined in the directive.
		return;
	}

	$context->set_context( $new_context );
}
