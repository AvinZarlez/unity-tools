#!/bin/bash

if [[ "$TRAVIS_TAG" == "v"* ]]; then
    # Build only if there's a tag that starts with a v'
    npm install -g vsce
    vsce publish <<< $TOBIAH_KEY
fi