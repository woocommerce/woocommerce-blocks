'use strict';

const pkg = require( '../../package.json' );
const Config = require( 'merge-config' );

const config = new Config();

const changelogSrcTypes = {
	MILESTONE: 'MILESTONE',
	ZENHUB: 'ZENHUB_RELEASE',
};

const REPO = pkg.repository.url
	// remove https://github.com:
	.split( ':' )[ 2 ]
	// remove the .git ending.
	.slice( 0, -4 );

const DEFAULTS = {
	labelPrefix: 'type:',
	skipLabel: 'no-changelog',
	defaultPrefix: 'dev',
	changelogSrcType: changelogSrcTypes.MILESTONE,
	devNoteLabel: 'dev-note',
	ghApiToken: '',
	zhApiKey: '',
};

pkg.changelog = pkg.changelog || DEFAULTS;

config.merge( { ...DEFAULTS, ...pkg.changelog } );
config.env( [
	'LABEL_PREFIX',
	'SKIP_LABEL',
	'DEFAULT_PREFIX',
	'DEV_NOTE_LABEL',
	'CHANGELOG_SRC_TYPE',
	'GH_API_TOKEN',
	'ZH_API_KEY',
] );
config.argv( Object.keys( pkg.changelog ) );

//merge in command-line arguments

module.exports = {
	pkg: {
		...pkg,
		changelog: config.get(),
	},
	REPO,
	changelogSrcTypes,
};
