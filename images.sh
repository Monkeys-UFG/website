#!/bin/bash

dir="originals"

for image in "./docs/assets/graphs/$dir"/*.png; do
  if [ -f "$image" ]; then
    file_name=$(basename "$image")             # just the filename, without path
    out_name="./docs/assets/graphs/$file_name"                   # save in current dir

    magick "$image" -strip -alpha on -transparent white -scale 60% -quality 1 "$out_name"

    echo "generated image = $file_name"
  fi
done
