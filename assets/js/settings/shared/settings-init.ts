declare global {
	interface Window {
		wcSettings: Record< string, unknown >;
	}
}

interface WooCommerceSiteCurrency {
	// The ISO code for the currency.
	code: string;
	// The precision (decimal places).
	precision: number;
	// The symbol for the currency (eg '$')
	symbol: string;
	// The position for the symbol ('left', or 'right')
	symbolPosition: 'left' | 'right' | 'left_space' | 'right_space';
	// The string used for the decimal separator.
	decimalSeparator: string;
	// The string used for the thousands separator.
	thousandSeparator: string;
	// The format string use for displaying an amount in this currency.
	priceFormat: string;
}

interface WooCommerceSiteLocale {
	// The locale string for the current site.
	siteLocale: string;
	// The locale string for the current user.
	userLocale: string;
	// An array of short weekday strings in the current user's locale.
	weekdaysShort: string[];
}

interface WooCommerceSharedSettings {
	adminUrl: string;
	countries: Record< string, string > | never[];
	currency: WooCommerceSiteCurrency;
	currentUserIsAdmin: boolean;
	homeUrl: string;
	isLargeCatalog: boolean;
	locale: WooCommerceSiteLocale;
	orderStatuses: Record< string, string > | never[];
	placeholderImgSrc: string;
	productCount: number;
	siteTitle: string;
	storePages: Record< string, string > | never[];
	wcAssetUrl: string;
	wcVersion: string;
	wordCountType:
		| 'characters_excluding_spaces'
		| 'characters_including_spaces'
		| 'words';
	wpLoginUrl: string;
	wpVersion: string;
}

const defaults: WooCommerceSharedSettings = {
	adminUrl: '',
	countries: [],
	currency: {
		code: 'USD',
		precision: 2,
		symbol: '$',
		symbolPosition: 'left',
		decimalSeparator: '.',
		priceFormat: '%1$s%2$s',
		thousandSeparator: ',',
	},
	currentUserIsAdmin: false,
	homeUrl: '',
	isLargeCatalog: false,
	locale: {
		siteLocale: 'en_US',
		userLocale: 'en_US',
		weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
	},
	orderStatuses: [],
	placeholderImgSrc: '',
	productCount: 0,
	siteTitle: '',
	storePages: [],
	wcAssetUrl: '',
	wcVersion: '',
	wordCountType: 'words',
	wpLoginUrl: '',
	wpVersion: '',
};

const globalSharedSettings =
	typeof window.wcSettings === 'object' ? window.wcSettings : {};

// Use defaults or global settings, depending on what is set.
const allSettings: WooCommerceSharedSettings = {
	...defaults,
	...globalSharedSettings,
};

allSettings.currency = {
	...defaults.currency,
	...allSettings.currency,
};

allSettings.locale = {
	...defaults.locale,
	...allSettings.locale,
};

export { allSettings };
