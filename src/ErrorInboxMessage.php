<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Admin\Notes\Note;
use Automattic\WooCommerce\Admin\Notes\NoteTraits;

defined( 'ABSPATH' ) || exit;

/**
 * The Error Inbox Message
 */
class ErrorInboxMessage {

	use NoteTraits;

	/**
	 * Name of the note for use in the database.
	 */
	const NOTE_NAME = 'woocommerce-block-error-inbox-message';

	/**
	 * Get the note.
	 *
	 * @return Note
	 */
	public static function get_note() {
		$note = new Note();
		$note->set_title( __( 'Blocks Error', 'woo-gutenberg-products-block' ) );
		$note->set_content( __( 'One of your clients has experienced some errors. Please check the logs.', 'woo-gutenberg-products-block' ) );
		$note->set_type( Note::E_WC_ADMIN_NOTE_WARNING );
		$note->set_name( self::NOTE_NAME );
		$note->set_content_data( (object) array() );
		$note->set_source( 'woocommerce-blocks' );
		$note->add_action(
			'visit-logs-gutenberg-blocks',
			__( 'Go to the Logs!', 'woo-gutenberg-products-block' ),
			admin_url( 'admin.php?page=wc-status&tab=logs' ),
			Note::E_WC_ADMIN_NOTE_ACTIONED,
			true
		);
		return $note;
	}
}
