#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
    echo 'Error: missing version number'
    exit 0
fi

npm --no-git-tag-version version $1

git add -A
git commit -m "release: $1"
git tag $1

# git push origin --tags
