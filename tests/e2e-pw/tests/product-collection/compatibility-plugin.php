<?php
/**
 * Plugin Name: Compatibility Layer Plugin
 * Description: Adds custom content to the Shop page with Product Collection included
 */

add_action( 'woocommerce_before_main_content', function () {
	echo '<p class="woocommerce_before_main_content">Hook: woocommerce_before_main_content</p>';
});

add_action( 'woocommerce_after_main_content', function () {
	echo 'Hook: woocommerce_after_main_content';
});

add_action( 'woocommerce_before_shop_loop_item_title', function () {
	echo 'Hook: woocommerce_before_shop_loop_item_title';
});

add_action( 'woocommerce_shop_loop_item_title', function () {
	echo 'Hook: woocommerce_shop_loop_item_title';
});

add_action( 'woocommerce_after_shop_loop_item_title', function () {
	echo 'Hook: woocommerce_after_shop_loop_item_title';
});

add_action( 'woocommerce_before_shop_loop_item', function () {
	echo 'Hook: woocommerce_before_shop_loop_item';
});

add_action( 'woocommerce_after_shop_loop_item', function () {
	echo 'Hook: woocommerce_after_shop_loop_item';
});

add_action( 'woocommerce_before_shop_loop', function () {
	echo 'Hook: woocommerce_before_shop_loop';
});

add_action( 'woocommerce_after_shop_loop', function () {
	echo 'Hook: woocommerce_after_shop_loop';
});

add_action( 'woocommerce_no_products_found', function () {
	echo 'Hook: woocommerce_no_products_found';
});
