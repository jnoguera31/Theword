<?php

// CORS se usa para permitir las peticiones http al servidor de laravel desde otro servidor'*' significa que acepta cualquier conexion


return [
    'paths' => ['*'],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => ['*'],
    'exposed_headers' => ['*'],
    'max_age' => 0,
    'support_credentials' => false

];
