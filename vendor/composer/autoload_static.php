<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit01acc71827d9c2c41f0ff17a1040d732
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
        'Automattic\\Jetpack\\Autoloader\\AutoloadGenerator' => __DIR__ . '/..' . '/automattic/jetpack-autoloader/src/AutoloadGenerator.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit01acc71827d9c2c41f0ff17a1040d732::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit01acc71827d9c2c41f0ff17a1040d732::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit01acc71827d9c2c41f0ff17a1040d732::$classMap;

        }, null, ClassLoader::class);
    }
}
