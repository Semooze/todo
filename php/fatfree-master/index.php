<?php

// Kickstart the framework
$f3=require('lib/base.php');

$f3->set('DEBUG',1);
if ((float)PCRE_VERSION<7.9)
	trigger_error('PCRE version is out of date');

// Load configuration
$f3->config('config.ini');

//config database connection
$db=new DB\SQL(
    'mysql:host=localhost;port=3306;dbname=todo',
    'root',
    '123456'
);
$f3->set('db', $db);

$f3->route('GET /',
	function($f3) {
		$classes=array(
			'Base'=>
				array(
					'hash',
					'json',
					'session'
				),
			'Cache'=>
				array(
					'apc',
					'memcache',
					'wincache',
					'xcache'
				),
			'DB\SQL'=>
				array(
					'pdo',
					'pdo_dblib',
					'pdo_mssql',
					'pdo_mysql',
					'pdo_odbc',
					'pdo_pgsql',
					'pdo_sqlite',
					'pdo_sqlsrv'
				),
			'DB\Jig'=>
				array('json'),
			'DB\Mongo'=>
				array(
					'json',
					'mongo'
				),
			'Auth'=>
				array('ldap','pdo'),
			'Bcrypt'=>
				array(
					'mcrypt',
					'openssl'
				),
			'Image'=>
				array('gd'),
			'Lexicon'=>
				array('iconv'),
			'SMTP'=>
				array('openssl'),
			'Web'=>
				array('curl','openssl','simplexml'),
			'Web\Geo'=>
				array('geoip','json'),
			'Web\OpenID'=>
				array('json','simplexml'),
			'Web\Pingback'=>
				array('dom','xmlrpc')
		);
		$f3->set('classes',$classes);
		$f3->set('content','welcome.htm');
		echo View::instance()->render('layout.htm');
	}
);

$f3->route('GET /userref',
	function($f3) {
		$f3->set('content','userref.htm');
		echo View::instance()->render('layout.htm');
	}
);

$f3->route('GET /',
    function() {
        echo View::instance()->render('index.htm');
    }
);

$f3->route('POST /tasks/save',
    function() {
      echo $_SERVER['SERVER_NAME']. ':' . $_SERVER['SERVER_PORT'];
    }
);
$f3->route('GET /tasks/load',
    function() {
      echo $_SERVER['SERVER_NAME']. ':' . $_SERVER['SERVER_PORT'];
    }
);

$f3->route('GET /test',
    function($f3) {
      $db = $f3->get('db');
      $results = $db->exec('SELECT * FROM tasks');
      $resultsJson = json_encode($results);
      $resultsString = json_encode(array('todos' => $resultsJson), JSON_FORCE_OBJECT);
      var_dump($resultsString);
    }
);

$f3->run();
