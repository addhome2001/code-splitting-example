#!/bin/bash

set -e

npm run build

echo "Build successful"

git checkout gh-pages
cp ./dist/* .
git add *.js *.css *.json index.html

git commit -m "Modified rebuild demo"

git push origin gh-pages
git checkout master
