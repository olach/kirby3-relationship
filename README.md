# Kirby 3 Relationship field

[![Latest version](https://img.shields.io/github/release/olach/kirby3-relationship.svg?maxAge=1800)](https://github.com/olach/kirby3-relationship/releases/latest) [![License](https://img.shields.io/badge/License-MIT-green.svg)](http://www.opensource.org/licenses/mit-license.php) [![Required Kirby version](https://img.shields.io/badge/Kirby-3.x-red.svg)](https://getkirby.com)

The Relationship field allows you to select and sort multiple items from a list.

The field was originally created for Kirby 2, where a native multiselect field was not available at the time. With Kirby 3, a built in multiselect field was added, and this field was not really needed anymore. But some people liked the different ui this field provided so it was updated to support Kirby 3.

![relationship-field-demo](https://user-images.githubusercontent.com/1300644/50839882-94294980-1361-11e9-9de9-523d0d71b8d1.gif)

This plugin is free to use. But if you find it helpful, feel free to [buy me a coffee](https://www.paypal.me/olachristensson/3usd) ☕️ or purchase your Kirby license(s) through [my affiliate link](https://a.paddle.com/v2/click/1129/36143?link=1170).

## Requirements

Kirby 3

Still using Kirby 2? Please use the [version for Kirby 2](https://github.com/olach/kirby-relationship) of this plugin.

## Installation

Download and copy this repository to `/site/plugins/relationship`

Alternatively, you can install it with composer: `composer require olach/relationship`

## Usage

Define a list of options in the field settings. Either manually or using the powerful [Query Language](https://getkirby.com/docs/guide/blueprints/query-language).

The data is saved as a comma separated string, which means that this field is interchangeable with the regular [Multiselect](https://getkirby.com/docs/reference/panel/fields/multiselect) field.

### Example with predefined options

#### Blueprint

```yaml
countries:
  label: Countries
  type: relationship
  options:
    sweden: Sweden
    norway: Norway
    denmark: Denmark
    finland: Finland
    iceland: Iceland
    germany: Germany
    france: France
    spain: Spain
    portugal: Portugal
```

#### Template

```php
<ul>
  <?php foreach ($page->countries()->split() as $country): ?>
  <li><?= $country ?></li>
  <?php endforeach ?>
</ul>
```

### Example with related pages
#### Blueprint

```yaml
related:
  label: Related articles
  type: relationship
  options: query
  query: page.siblings
```

#### Template

```php
<h2>Related articles</h2>
<ul>
  <?php foreach ($page->related()->toPages(',') as $related): ?>
  <li>
    <a href="<?= $related->url() ?>">
      <?= $related->title() ?>
    </a>
  </li>
  <?php endforeach ?>
</ul>
```

## Features

### Search:

To enable search, add `search: true` to the field settings in your blueprint.

```yaml
related:
  label: Related articles
  type: relationship
  options: query
  query: page.siblings
  search: true
```

### Min and max items:

You can control the minimum number of required items and the maximum number of allowed items. Don't forget to add a help text to inform the editor about the requirements.

```yaml
related:
  label: Related articles
  type: relationship
  options: query
  query: page.siblings
  search: true
  min: 3
  max: 6
  help: Select from 3 up to 6 articles.
```

### Counter indicator

A handy indicator of the current amount of selected items is displayed in the upper right corner. This indicator can be disabled by setting the value of option `counter` to `false`.

```yaml
related:
  label: Related articles
  type: relationship
  options: query
  query: page.siblings
  counter: false
```

### Keyboard navigation:

The field is keyboard accessible. Press <kbd>tab</kbd> and <kbd>shift + tab</kbd> to give focus to the lists. Within a list, use the arrow keys to navigate and press <kbd>space</kbd> to select/deselect an item. In the sortable list, you can sort the items by selecting an item with <kbd>space</kbd> and then move the item using the arrow keys.

## License
MIT
