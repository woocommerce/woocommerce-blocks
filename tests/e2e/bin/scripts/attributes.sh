#!/usr/bin/env bash

###################################################################################################
# If no attributes exist, otherwiese create them
###################################################################################################

attributes=$(wp wc product_attribute list --format=json --user=1)

if [ -z "$attributes" ] || [ "$attributes" == "[]" ]; then
    pa_color=$(wp wc product_attribute create \
        --name=Color \
        --slug=pa_color \
        --user=1 \
        --porcelain \
    )

    pa_size=$(wp wc product_attribute create \
        --name=Size \
        --slug=pa_size \
        --user=1 \
        --porcelain \
    )
fi
