<?php

Kirby::plugin('olach/relationship', [
	'fields' => [
		'relationship' => [
			'extends' => 'tags',
			'props' => [
				'accept' => null,
				'icon' => null,
				'search' => function (bool $search = false) {
					return $search;
				}
			]
		]
	]
]);
