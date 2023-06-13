#!/bin/sh


wp-env run tests-cli "wp db reset --yes"
wp-env run tests-cli "wp db import tests/e2e-pw/bin/woocommerce.sql"
