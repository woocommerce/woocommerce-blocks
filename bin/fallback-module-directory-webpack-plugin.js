/*eslint-env node*/

/**
 * External dependencies
 */
const fs = require( 'fs' );

// Note, this has some inspiration from the AliasPlugin and its implementation
// @see https://github.com/webpack/enhanced-resolve/blob/v4.1.0/lib/AliasPlugin.js

function startsWith( string, searchString ) {
	const stringLength = string.length;
	const searchLength = searchString.length;

	// early out if the search length is greater than the search string
	if ( searchLength > stringLength ) {
		return false;
	}
	let index = -1;
	while ( ++index < searchLength ) {
		if ( string.charCodeAt( index ) !== searchString.charCodeAt( index ) ) {
			return false;
		}
	}
	return true;
}

module.exports = class FallbackModuleDirectoryWebpackPlugin {
	constructor( search, replacement, alias ) {
		this.search = search;
		this.replacement = replacement;
		this.alias = this.parseAlias( alias );
		this.hooks = [
			[ 'described-resolve', 'resolve' ],
			[ 'file', 'resolve' ],
		];
		this.applyFallback = this.applyFallback.bind( this );
		this.doApply = this.doApply.bind( this );
	}

	parseAlias( alias ) {
		if ( typeof alias === 'object' && ! Array.isArray( alias ) ) {
			alias = Object.keys( alias ).map( ( key ) => {
				let onlyModule = false;
				let obj = alias[ key ];
				if ( /\$$/.test( key ) ) {
					onlyModule = true;
					key = key.substr( 0, key.length - 1 );
				}
				if ( typeof obj === 'string' ) {
					obj = {
						alias: obj,
					};
				}
				obj = Object.assign(
					{
						name: key,
						onlyModule,
					},
					obj
				);
				return obj;
			} );
		}
		return alias;
	}

	applyFallback( path ) {
		// if directory does not have search string then bail
		if ( ! path.includes( this.search ) ) {
			return path;
		}

		if ( ! fs.existsSync( path ) ) {
			path = path.replace( this.search, this.replacement );
		}
		return path;
	}

	doApply( resolver, source, target, alias ) {
		resolver
			.getHook( source )
			.tapAsync(
				'FallbackModuleDirectoryWebpackPlugin',
				( request, resolveContext, callback ) => {
					const innerRequest = request.request || request.path;

					if ( ! innerRequest ) return callback();

					for ( const item of alias ) {
						if (
							innerRequest === item.name ||
							( ! item.onlyModule &&
								startsWith( innerRequest, item.name + '/' ) )
						) {
							if (
								innerRequest !== item.alias &&
								! startsWith( innerRequest, item.alias + '/' )
							) {
								const newRequestStr = this.applyFallback(
									item.alias +
										innerRequest.substr( item.name.length )
								);
								const obj = {
									...request,
									request: newRequestStr,
								};
								return resolver.doResolve(
									target,
									obj,
									`aliased with mapping '${
										item.name
									}' to '${ newRequestStr }'`,
									resolveContext,
									( err, result ) => {
										if ( err ) return callback( err );

										// Don't allow other aliasing or raw request
										if ( result === undefined ) {
											return callback( null, null );
										}
										callback( null, result );
									}
								);
							}
						}
					}
					return callback();
				}
			);
	}

	apply( resolver ) {
		const alias = this.alias;
		this.hooks.forEach( ( [ source, target ] ) => {
			target = resolver.ensureHook( target );
			this.doApply( resolver, source, target, alias );
		} );
	}
};
