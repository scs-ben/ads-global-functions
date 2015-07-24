<?php
require __DIR__ . '/../vendor/autoload.php';
use MatthiasMullie\Minify;
$minifier = new Minify\JS(__DIR__ . '/../src/adsGlobalFunctions.js');
$minifier->compile(__DIR__ . '/../dist/js/adsGlobalFunctions.js');
$minifier->minify(__DIR__ . '/../dist/js/adsGlobalFunctions.min.js');
