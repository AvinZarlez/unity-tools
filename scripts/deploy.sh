#!/bin/bash

if [[ "$TRAVIS_TAG" == "v"* ]]; then
    # Build only if there's a tag that starts with a v'
    echo "Publishing using VSCE"
    npm install -g vsce
    vsce publish <<< $TOBIAH_KEY
else
    echo "Build not tagged, not deploying"
    echo "Build tag :"
    echo "$TRAVIS_TAG"
fi