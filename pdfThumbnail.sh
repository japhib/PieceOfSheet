#!/bin/bash 
infile=${1}

gs -q -o ./public/media/$(basename "${infile}")_p%04d.jpeg -sDEVICE=jpeg "${infile}" -dFirstPage=1 -dLastPage=1

echo "Done"