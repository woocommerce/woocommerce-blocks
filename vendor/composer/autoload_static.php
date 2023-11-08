<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbc0f4cb3d985e884413ac0f7b4a44eb5
{
    public static $files = array (
        'fcd5d7d87e03ff4f5b5a66c2b8968671' => __DIR__ . '/../..' . '/src/StoreApi/deprecated.php',
        'd0f16a186498c2ba04f1d0064fecf9cf' => __DIR__ . '/../..' . '/src/StoreApi/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'C' => 
        array (
            'Composer\\Installers\\' => 20,
        ),
        'A' => 
        array (
            'Automattic\\WooCommerce\\StoreApi\\' => 32,
            'Automattic\\WooCommerce\\Blocks\\' => 30,
            'Automattic\\Jetpack\\Autoloader\\' => 30,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Composer\\Installers\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
        'Automattic\\WooCommerce\\StoreApi\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src/StoreApi',
        ),
        'Automattic\\WooCommerce\\Blocks\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'Automattic\\Jetpack\\Autoloader\\' => 
        array (
            0 => __DIR__ . '/..' . '/automattic/jetpack-autoloader/src',
        ),
    );

    public static $classMap = array (
        'Automattic\\Jetpack\\A8c_Mc_Stats' => __DIR__ . '/..' . '/automattic/jetpack-a8c-mc-stats/src/class-a8c-mc-stats.php',
        'Automattic\\Jetpack\\Admin_UI\\Admin_Menu' => __DIR__ . '/..' . '/automattic/jetpack-admin-ui/src/class-admin-menu.php',
        'Automattic\\Jetpack\\Autoloader\\AutoloadGenerator' => __DIR__ . '/..' . '/automattic/jetpack-autoloader/src/AutoloadGenerator.php',
        'Automattic\\Jetpack\\Config' => __DIR__ . '/..' . '/automattic/jetpack-config/src/class-config.php',
        'Automattic\\Jetpack\\Connection\\Client' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-client.php',
        'Automattic\\Jetpack\\Connection\\Connection_Notice' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-connection-notice.php',
        'Automattic\\Jetpack\\Connection\\Error_Handler' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-error-handler.php',
        'Automattic\\Jetpack\\Connection\\Initial_State' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-initial-state.php',
        'Automattic\\Jetpack\\Connection\\Manager' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-manager.php',
        'Automattic\\Jetpack\\Connection\\Manager_Interface' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/interface-manager.php',
        'Automattic\\Jetpack\\Connection\\Nonce_Handler' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-nonce-handler.php',
        'Automattic\\Jetpack\\Connection\\Package_Version' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-package-version.php',
        'Automattic\\Jetpack\\Connection\\Package_Version_Tracker' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-package-version-tracker.php',
        'Automattic\\Jetpack\\Connection\\Plugin' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-plugin.php',
        'Automattic\\Jetpack\\Connection\\Plugin_Storage' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-plugin-storage.php',
        'Automattic\\Jetpack\\Connection\\REST_Connector' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-rest-connector.php',
        'Automattic\\Jetpack\\Connection\\Rest_Authentication' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-rest-authentication.php',
        'Automattic\\Jetpack\\Connection\\Secrets' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-secrets.php',
        'Automattic\\Jetpack\\Connection\\Server_Sandbox' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-server-sandbox.php',
        'Automattic\\Jetpack\\Connection\\Tokens' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-tokens.php',
        'Automattic\\Jetpack\\Connection\\Tokens_Locks' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-tokens-locks.php',
        'Automattic\\Jetpack\\Connection\\Urls' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-urls.php',
        'Automattic\\Jetpack\\Connection\\Utils' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-utils.php',
        'Automattic\\Jetpack\\Connection\\Webhooks' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-webhooks.php',
        'Automattic\\Jetpack\\Connection\\Webhooks\\Authorize_Redirect' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/webhooks/class-authorize-redirect.php',
        'Automattic\\Jetpack\\Connection\\XMLRPC_Async_Call' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-xmlrpc-async-call.php',
        'Automattic\\Jetpack\\Connection\\XMLRPC_Connector' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-xmlrpc-connector.php',
        'Automattic\\Jetpack\\Constants' => __DIR__ . '/..' . '/automattic/jetpack-constants/src/class-constants.php',
        'Automattic\\Jetpack\\CookieState' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-cookiestate.php',
        'Automattic\\Jetpack\\Errors' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-errors.php',
        'Automattic\\Jetpack\\Files' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-files.php',
        'Automattic\\Jetpack\\Heartbeat' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-heartbeat.php',
        'Automattic\\Jetpack\\Modules' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-modules.php',
        'Automattic\\Jetpack\\Paths' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-paths.php',
        'Automattic\\Jetpack\\Redirect' => __DIR__ . '/..' . '/automattic/jetpack-redirect/src/class-redirect.php',
        'Automattic\\Jetpack\\Roles' => __DIR__ . '/..' . '/automattic/jetpack-roles/src/class-roles.php',
        'Automattic\\Jetpack\\Status' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-status.php',
        'Automattic\\Jetpack\\Status\\Cache' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-cache.php',
        'Automattic\\Jetpack\\Status\\Host' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-host.php',
        'Automattic\\Jetpack\\Status\\Visitor' => __DIR__ . '/..' . '/automattic/jetpack-status/src/class-visitor.php',
        'Automattic\\Jetpack\\Terms_Of_Service' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-terms-of-service.php',
        'Automattic\\Jetpack\\Tracking' => __DIR__ . '/..' . '/automattic/jetpack-connection/src/class-tracking.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Jetpack_IXR_Client' => __DIR__ . '/..' . '/automattic/jetpack-connection/legacy/class-jetpack-ixr-client.php',
        'Jetpack_IXR_ClientMulticall' => __DIR__ . '/..' . '/automattic/jetpack-connection/legacy/class-jetpack-ixr-clientmulticall.php',
        'Jetpack_Options' => __DIR__ . '/..' . '/automattic/jetpack-connection/legacy/class-jetpack-options.php',
        'Jetpack_Signature' => __DIR__ . '/..' . '/automattic/jetpack-connection/legacy/class-jetpack-signature.php',
        'Jetpack_Tracks_Client' => __DIR__ . '/..' . '/automattic/jetpack-connection/legacy/class-jetpack-tracks-client.php',
        'Jetpack_Tracks_Event' => __DIR__ . '/..' . '/automattic/jetpack-connection/legacy/class-jetpack-tracks-event.php',
        'Jetpack_XMLRPC_Server' => __DIR__ . '/..' . '/automattic/jetpack-connection/legacy/class-jetpack-xmlrpc-server.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbc0f4cb3d985e884413ac0f7b4a44eb5::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbc0f4cb3d985e884413ac0f7b4a44eb5::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitbc0f4cb3d985e884413ac0f7b4a44eb5::$classMap;

        }, null, ClassLoader::class);
    }
}
