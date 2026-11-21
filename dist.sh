#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "provide one argument: git commit message"
  exit 1
fi
echo "starting"
curpath=$(pwd)
echo $curpath
. "${curpath}/.env"
npm run build
cp -r $startpath $distpath
cd $distpath
git add .
git commit -m "$1"
git push
echo "execution complete"