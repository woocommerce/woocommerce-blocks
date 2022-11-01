/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Internal dependencies
 */
import SettingsPage from './settings-page';

const settingsContainer = document.getElementById(
	'wc-shipping-method-pickup-location-settings-container'
);
if ( settingsContainer ) {
	ReactDOM.render( <SettingsPage />, settingsContainer );
}
