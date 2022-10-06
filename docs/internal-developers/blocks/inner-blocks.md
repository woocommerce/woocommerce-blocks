# Working with inner blocks

## Register parent block

At first, a parent block is a normal block. In the WooCommerce Blocks context, to register a block, we need:

- Create a PHP class for the block that extends the `AbstractBlock` class under `src/BlockTypes/`. We need to register the block name of the block here to use in later steps.
- Register the new block type in `src/BlockTypesController.php`.
- Adding JS for the block under `assets/js/blocks/<block-name>`.
- Register the block in the `bin/webpack-entries.js`.
