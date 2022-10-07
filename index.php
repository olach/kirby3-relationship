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
			],
			'computed' => [
				'default' => function (): array {
					return $this->toTags($this->default);
				},
				'value' => function (): array {
					return $this->toTags($this->value);
				}
			],
			'methods' => [
				'toTags' => function ($value) {
					if (is_null($value) === true) {
						return [];
					}

					$options = $this->options();

					// transform into value-text objects
					return array_map(function ($option) use ($options) {
						// already a valid object
						if (is_array($option) === true && isset($option['value'], $option['text']) === true) {
							return $option;
						}

						$index = array_search($option, array_column($options, 'value'));

						if ($index !== false) {
							return $options[$index];
						}

						return [
							'value' => $option,
							'text'  => $option,
						];
					}, Str::split($value, $this->separator()));
				}
			],
			'save' => function (array $value = null): string {
				return A::join(
					A::pluck($value, 'value'),
					$this->separator() . ' '
				);
			},
		]
	]
]);
