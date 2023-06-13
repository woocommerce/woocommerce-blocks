#!/bin/sh


wp-env run tests-cli "wp db reset --yes"
wp-env run tests-cli "wp db import woocommerce.sql"
