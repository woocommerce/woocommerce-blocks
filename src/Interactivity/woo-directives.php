<?php
require_once __DIR__ . '/../../../gutenberg/lib/experimental/html/wp-html.php';

require_once __DIR__ . '/directives/class-woo-directive-context.php';
require_once __DIR__ . '/directives/class-woo-directive-store.php';

require_once __DIR__ . '/directives/attributes/woo-bind.php';
require_once __DIR__ . '/directives/attributes/woo-class.php';
require_once __DIR__ . '/directives/attributes/woo-style.php';
require_once __DIR__ . '/directives/tags/woo-context.php';


/**
 * Register the Interactivity API scripts. These files are enqueued when a block
 * defines `woo-directives-runtime` as a dependency.
 */
function woo_directives_register_scripts() {
	wp_register_script(
		'woo-directives-vendors',
		plugins_url( 'build/woo-directives-vendors.js', __FILE__ ),
		array(),
		'1.0.0',
		true
	);
	wp_register_script(
		'woo-directives-runtime',
		plugins_url( 'build/woo-directives-runtime.js', __FILE__ ),
		array( 'woo-directives-vendors' ),
		'1.0.0',
		true
	);
}
add_action( 'init', 'woo_directives_register_scripts' );


function woo_directives_get_client_side_navigation() {
	static $client_side_navigation = null;
	if ( is_null( $client_side_navigation ) ) {
		$client_side_navigation = apply_filters( 'client_side_navigation', false );
	}
	return $client_side_navigation;
}

function woo_directives_add_client_side_navigation_meta_tag() {
	if ( woo_directives_get_client_side_navigation() ) {
		echo '<meta itemprop="woo-client-side-navigation" content="active">';
	}
}
add_action( 'wp_head', 'woo_directives_add_client_side_navigation_meta_tag' );

function woo_directives_client_site_navigation_option() {
	// $options = get_option( 'woo_directives_plugin_settings' );
	// return $options['client_side_navigation'];
	return true;
}
add_filter(
	'client_side_navigation',
	'woo_directives_client_site_navigation_option',
	9
);

function woo_directives_mark_interactive_blocks( $block_content, $block, $instance ) {
	if ( woo_directives_get_client_side_navigation() ) {
		return $block_content;
	}

	// Append the `data-woo-ignore` attribute for inner blocks of interactive blocks.
	if ( isset( $instance->parsed_block['isolated'] ) ) {
		$w = new WP_HTML_Tag_Processor( $block_content );
		$w->next_tag();
		$w->set_attribute( 'data-woo-ignore', '' );
		$block_content = (string) $w;
	}

	// Return if it's not interactive.
	if ( ! block_has_support( $instance->block_type, array( 'interactivity' ) ) ) {
		return $block_content;
	}

	// Add the `data-woo-island` attribute if it's interactive.
	$w = new WP_HTML_Tag_Processor( $block_content );
	$w->next_tag();
	$w->set_attribute( 'data-woo-island', '' );

	return (string) $w;
}
add_filter( 'render_block', 'woo_directives_mark_interactive_blocks', 10, 3 );

/**
 * Add a flag to mark inner blocks of isolated interactive blocks.
 */
function woo_directives_inner_blocks( $parsed_block, $source_block, $parent_block ) {
	if (
		isset( $parent_block ) &&
		block_has_support(
			$parent_block->block_type,
			array(
				'interactivity',
				'isolated',
			)
		)
	) {
		$parsed_block['isolated'] = true;
	}
	return $parsed_block;
}
add_filter( 'render_block_data', 'woo_directives_inner_blocks', 10, 3 );

function woo_process_directives( $block_content ) {
	// TODO: Add some directive/components registration mechanism.
	$tag_directives = array(
		'woo-context' => 'process_woo_context_tag',
	);

	$attribute_directives = array(
		'data-woo-context' => 'process_woo_context_attribute',
		'data-woo-bind'    => 'process_woo_bind',
		'data-woo-class'   => 'process_woo_class',
		'data-woo-style'   => 'process_woo_style',
	);

	$tags = new WP_HTML_Tag_Processor( $block_content );

	$context = new Woo_Directive_Context();
	while ( $tags->next_tag( array( 'tag_closers' => 'visit' ) ) ) {
		$tag_name = strtolower( $tags->get_tag() );
		if ( array_key_exists( $tag_name, $tag_directives ) ) {
			call_user_func( $tag_directives[ $tag_name ], $tags, $context );
		} else {
			// Components can't have directives (unless we change our mind about this).
			$attributes = $tags->get_attribute_names_with_prefix( 'data-woo-' );
			$attributes = $attributes ?? array();

			foreach ( $attributes as $attribute ) {
				if ( ! array_key_exists( $attribute, $attribute_directives ) ) {
					continue;
				}

				call_user_func(
					$attribute_directives[ $attribute ],
					$tags,
					$context
				);
			}
		}
	}

	return $block_content;
}
add_filter(
	'render_block',
	'woo_process_directives',
	10,
	1
);

// TODO: check if priority 9 is enough.
// TODO: check if `wp_footer` is the most appropriate hook.
add_action( 'wp_footer', array( 'Woo_Directive_Store', 'render' ), 9 );
