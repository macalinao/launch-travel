#!/usr/bin/env bash

DIR=$(dirname $0)

mkdir -p "$DIR/../data/activities-analysis"

for FILE in $(ls "$DIR/../data/activities"); do

    echo "Processing city $FILE"

    curl -X POST \
        -H "Content-Language: en" \
        -H "Accept: application/json" \
        -H "Content-Type: text/plain; charset=utf-8" \
        --data-binary "@$DIR/../data/activities/$FILE" \
        -u "$BLUEMIX_CREDS" \
        "https://gateway.watsonplatform.net/personality-insights/api/v2/profile" \
        > "$DIR/../data/activities-analysis/$FILE.json"

done
