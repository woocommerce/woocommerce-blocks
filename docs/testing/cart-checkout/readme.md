<!--
taking a look from https://make.wordpress.org/test/handbook/call-for-testing/
note: there will be many grammar mistakes since grammarly doesn't work here, but I will run
this throu it later when I finish.
-->

# Cart and Checkout testing plan

[TOC]

## Introduction

Welcome, and thank you for helping us test the Cart and Checkout blocks,
in this document we will outline the general checklist for how to test
the blocks, any requirements and expectations and feature parity, some
will require simple coding skills, and some are straightforward, we will
seperate them.

### Known limitations:
<!-- Debating on where to put this section -->
This is a list of all known limitation for Cart and Checkout blocks, it means
we're aware of them, and will probably not tackle them in this first release:

- Cart and Checkout blocks do not support third party plugins that integrate with
	regular Cart and Checkout shortcode, if you somehow see a third party plugin working
	well, this is pure concidence, the only exception is Stripe payment gateway.

## Before you start

Depending on how far you will test, there are certain requiremnts, in general
you will need the following:

Basic:
- A WordPress website running WooCommerce and ability to install a plugin and edit pages.

Intermediate:
- A code editor and/or the ability to modify plugin PHP files.
	This could be either locally if you're hosting the code there or it could from the Plugins -> Plugin Editor
	WordPress admin page.

Advanced:
- A locally installed version of WordPress.
- [Node 12.16.1 and npm 6.14.4 installed](https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/master/package.json#L149-L150).
- Ability to edit JS source files when needed.

Special Cases:
<!-- This section should be moved to stripe payment testing -->
To test Express payment methods there are some special reqiruments like
- You need to be serving the website over https, try ephemeral webistes.
- You need to be from a supported country <!-- Nadir: not yet sure about this condition and what kind of countries are exaclty supported or not. -->
- To test Apple Pay you will need to have an iOS or device.
- To test Google Pay you will need to have Chrome installed and a payment method setup.
- To test Microsoft Pay you will need to have Edge installed.
- You will also need to be on a supported country, to better verify you compatiblity visit
	[this page](https://stripe.com/docs/stripe-js/elements/payment-request-button#react-overview)
	You should see if you're on a supported platform or not

Unsupported:
![](https://i.imgur.com/EpkFrat.png)

Supported:
<!-- someone should screenshot it for me -->


## What are we testing?

The goal is to test the new Cart and Checkout blocks, they should be replacing
the Cart and Checkout shortcodes.

### Cart Block

![](https://i.imgur.com/mcbXgqV.png)

#### Features to test:

The Cart block has a user story with all [expected features here.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/1289)
<!-- debating whether we should be linking to the epic, or copying the epic
content here, in both cases, the epic should be cleaned and features that are
not valid for this MVP should be deleted to avoid confusion. -->
You are also encouraged to compare behaviors with the regular Cart block.


### Checkout Block

![](https://i.imgur.com/9KhYK2L.png)

#### Features to test:

The Checkout block has a user story with all [expected features here.](https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/1294)
<!-- same comment as above -->
You are also encouraged to compare behaviors with the regular Checkout block.

## Testing Checklist

### Editor experience

- [ ] You should be able to add, and only one Cart or Checkout block to a page.
- [ ] The preview in the inserter should show sekelton of how the block structure should look like.
- [ ] When inserting any of the blocks, it should have some data already in it.
- [ ] You should not be able to interact directly with the block (except for some sections).
- [ ] You should be able to see block settings on the sidebar when it is focused.
- [ ] Proceed to Checkout and Back to cart block settings should present you with a list of your website pages.

### Shipping

If you already have some shipping zones in your website:

- [ ] You should be able to see preview rates (that are not your actual rates) in the editor.
- [ ] You should be able to see your actual rates on the frontend.
- [ ] Selecting a shipping rate should update the totals.
- [ ] Changing the address in Cart block should update the rates.
- [ ] Try entering an address that does not have rates for, you should:
	- [ ] See an error saying "No options were found".
	- [ ] See the default shipping option if you have it setup.
- [ ] The countries in the shipping rates form should reflect the countries you have in WooCommerce -> Settings -> General -> Shipping location(s).
- [ ] If your cart has only digital products, the Cart and Checkout blocks should act like shipping is disabled.

If you don't have any shipping zones set up and/or shipping is disabled:

- [ ] You should only see the billing form in both editor and frontend for the Checkout Block.
- [ ] The shipping options step should not be visible.
- [ ] The shipping cost should not be visible in the sidebar.

If you don't have any shipping zones set up but **shipping is enabled**:

- [ ] In the editor, Checkout Block will show you a placeholder promoting you to set up shipping zones.

Breaking Shipping

<!-- include here all cases in which we can break shipping -->

<!-- As I was writing, I discovered I went too deep into feature details that can be covered by user story in the epics, so I'm leaving those details for now and focusing on more testing sides -->

### Payments

### Coupons

### Cart Items

### Cross-platform and browser compatibility

The main goal of this is to test in viraity of themes, browsers, platforms and setups, this is a list of things you can test with, with sane expectations.

The baseline for testing is:
- WordPress 5.3 and up.
- WooCommerce 4.0 and up
- All Browsers supported by [those two versions](https://make.wordpress.org/core/handbook/best-practices/browser-support/) so this inlucde Internet Explorer 11, and latest two versions of each browser.
- Storefront, TwentyTwenty, and TwentyNineteen themes, we use storefront as a basis for developement, and push fixes to it regularly, so make sure you run the latest version.

As a basis for comperasion, you can use the blocks designs:

- Checkout Desktop.
- Cart Desktop.
- Checkout Mobile.
- Cart Mobile.