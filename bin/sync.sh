#!/bin/sh

# http://opensource.apple.com//source/Libc/Libc-320/include/sysexits.h
EX_USAGE=64
EX_DATAERR=65

files=(
  _includes/archive.html
  _includes/ceiling.html
  _includes/duoshuo.html
  _includes/footer.html
  _includes/meta.html
  _includes/scripts.html
  _includes/settings.html
  _includes/styles.html
  _includes/toc.html
  _layouts/page.html
  _layouts/post.html
  assets/img/bg.jpg
  assets/syntax/github.css
  assets/base.css
  assets/post.js
  bin/sync.sh
)

download() {
  for entry in "${files[@]}"; do
    if [ -e ${entry} ]; then
      echo "-----> Downloading ${entry}"
      curl -o ${entry} "https://raw.githubusercontent.com/thx/base/gh-pages/${entry}"
    else
      echo "-----> Skipped ${entry} because local version doesn't exist"
    fi
  done

  echo "-----> Done."
}

upload() {
  for entry in "${files[@]}"; do
    dest="$1/${entry}"
    if [ -e ${dest} ]; then
      cp ${entry} ${dest}
    else
      echo "-----> Skipped ${entry} because ${dest} doesn't exist."
    fi
  done

  echo "-----> Done."
}

usage() {
  name=$(basename $0)
  cat <<EOF
Synchronize current website with base.

Example usage:
  ${name}                 # sync from github
  ${name} -f ../base      # sync from local directory
  ${name} -t ../base      # sync pwd to local base
EOF
}

if [ $# -eq 0 ]; then
  download
  exit
fi

while getopts ":f:ht:" opt; do
  case ${opt} in
    h)
      usage
      ;;
    t)
      upload ${OPTARG}
      ;;
    \?)
      usage
      exit ${EX_USAGE}
      ;;
  esac
done
