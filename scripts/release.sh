#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
    echo 'Error: missing NPM auth token'
    exit 0
fi

pnpm install
pnpm build

NPM_AUTH_TOKEN=$1 pnpm publish --access=public --publish-branch=main
