# Atomic Blocks

This package is home to both Atomic blocks and their counterpart components. Atomic blocks in this context are reusable inner-blocks consumed by various other product blocks, for example the All Products Block and Single Products Blocks. The package houses the following:

```
|- blocks - Atomic block definitions and block registration.
|- components - Atomic block components which are used by the blocks themselves, and directly on the frontend (via LayoutConfig maps).
   |- core - Components that render a frontend view for core blocks.
   |- product - Components for product blocks.
|- utils - Utilities for generating and using layout maps and the atomic blocks/components.
```
