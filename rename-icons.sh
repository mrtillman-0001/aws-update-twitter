#!/bin/bash

OIFS="$IFS"
IFS=$'\n'
for file in `find ./icons -type f`  
do
     extension=${file##*.}
     newFilename=icons/$(uuidgen).$extension
     mv "$file" "$newFilename"
done
IFS="$OIFS"
