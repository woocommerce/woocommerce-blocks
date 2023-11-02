<?php

namespace Automattic\WooCommerce\Blocks\InteractivityComponents;


class Dropdown {
  /**
 * A dropdown component, allows user to select from a list of options.
 * right now, the state, actions and selectors are borrowed from CollectionStockFilter
 * but later this can be extracted into it's own component.
 * @param <array, mixed> $props 
 * @return string|false 
 */
static function render( $props ) {
  wp_enqueue_script('wc-interactivity-dropdown');
  
  $context = array(
    'woocommerceDropdown' => array(
      'selectedItem' => array(
        'label' => null,
        'value' => null,
      ),
      'isOpen' => false,
    )
	);

  // TODO - translate the default.
	$placeholder = $props['placeholder'] ?? 'Choose an option';
	
	// Items should be an array of objects with a label and value property.
	$items = $props['items'] ?? [];

  $change_effect = $props['on_change_effect'] ?? '';

  $dropdown_context = wp_json_encode( $context, JSON_NUMERIC_CHECK );

	ob_start();
	?>
  <div class="wc-block-stock-filter style-dropdown" data-wc-effect="<?php echo $change_effect; ?>" data-wc-context='<?php echo $dropdown_context ?>' >
    <div class="wc-blocks-components-form-token-field-wrapper single-selection" >
      <div class="components-form-token-field" tabindex="-1">
        <div class="components-form-token-field__input-container" 
             data-wc-class--is-active="context.woocommerceDropdown.isOpen" 
             tabindex="-1" 
             data-wc-on--click="actions.woocommerceDropdown.toggleIsOpen" 
         >
          <input id="components-form-token-input-1" type="text" autocomplete="off" placeholder="<?php echo esc_attr($placeholder) ?>" class="components-form-token-field__input" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-describedby="components-form-token-suggestions-howto-1" value="">
          <ul data-wc-bind--hidden="!context.woocommerceDropdown.isOpen" class="components-form-token-field__suggestions-list" id="components-form-token-suggestions-1" role="listbox">
            <?php foreach ( $items as $item ) : 
              $context = json_encode($item, JSON_NUMERIC_CHECK);
            ?>
              <li 
                role="option" data-wc-class--is-selected="selectors.woocommerceDropdown.isSelected" 
                data-wc-on--click="actions.woocommerceDropdown.selectStockStatus" 
                data-wc-on--mouseover="actions.woocommerceDropdown.addHoverClass" 
                data-wc-on--mouseout="actions.woocommerceDropdown.removeHoverClass" 
                data-wc-context='<?php echo $context ?>' 
                class="components-form-token-field__suggestion" 
                data-wc-bind--aria-selected="selectors.woocommerceDropdown.isSelected"
              >
                <?php echo $item['label']; ?>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </div>
    
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30" height="30" >
      <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" ></path>
    </svg>      
  </div>
	<?php
	return ob_get_clean();
}
}

