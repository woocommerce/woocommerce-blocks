# Translation management

As mentioned in [Translation basics](docs/translations/translation-basics.md), all translations are managed using [GlotPress](https://wordpress.org/plugins/glotpress/). The translations of the WooCommerce Blocks plugin can be found on https://translate.wordpress.org/projects/wp-plugins/woo-gutenberg-products-block/.

## Roles

### Translation Contributors

A Translation Contributors can suggest translations. These suggested translations need to be verified by a GTE or a PTE.

See also https://make.wordpress.org/polyglots/handbook/about/roles-and-capabilities/#translation-contributor.

### Project Translation Editor (PTE)

A Project Translation Editor can:

-   approve translations that are suggested by a Translation Contributor
-   change existing translations
-   add new translations.

PTE permissions need to be requested via https://make.wordpress.org/polyglots/. If you're a developer of the WooCommerce Blocks plugin, you can request PTE permissions using the following template:

```
PTE Request for WooCommerce Blocks

I am the plugin co-author for WooCommerce Blocks, and I’d like to be able to approve translation for our plugin. Please add my WordPress.org user account as translation editor for their respective locales:

Name: WooCommerce Blocks
URL: https://wordpress.org/plugins/woo-gutenberg-products-block/

o #ar – @username
o #bn_BD – @username, @username
o #da_DK – @username
o #de_CH – @username
o etc...

If you have any questions, just comment here. Thank you!

#editor-requests
```

#### Formal vs. informal translations

Dutch and German have both formal and informal translations:

-   `#de_DE` and `#de_DE_formal`
-   `#de_CH` and `#de_CH_formal`
-   `#nl_NL` and `#nl_NL_formal`

It is sufficient to request the PTE permissions for the informal translations only. The Polyglots team will automatically assign the PTE permissions for both the formal and informal translations.

See also https://make.wordpress.org/polyglots/handbook/about/roles-and-capabilities/#project-translation-editor.

### Global Translation Editor (GTE)

A Global Translation Editor can validate strings for all projects, including WordPress core, for a certain language.

See also https://make.wordpress.org/polyglots/handbook/about/roles-and-capabilities/#general-translation-editor.

<!-- FEEDBACK -->

---

[We're hiring!](https://woocommerce.com/careers/) Come work with us!

🐞 Found a mistake, or have a suggestion? [Leave feedback about this document here.](https://github.com/woocommerce/woocommerce-blocks/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20./docs/testing/README.md)

<!-- /FEEDBACK -->
