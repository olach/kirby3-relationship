<?php

Kirby::plugin('olach/relationship', [
	'fields' => [
		'relationship' => [
			'extends' => 'tags',
			'props' => [
				'icon' => null,
				'search' => function (bool $search = false) {
					return $search;
				}
			]
		]
	]
]);
