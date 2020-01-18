<?php

Kirby::plugin('olach/relationship', [
	'fields' => [
		'relationship' => [
			'extends' => 'tags',
			'props' => [

				/**
				 * Unset inherited props
				 */
				'accept' => null,
				'icon' => null,

				/**
				 * Enable/disable the search in the dropdown
				 */
				'search' => function (bool $search = false) {
					return $search;
				}
			]
		]
	]
]);
