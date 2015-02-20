#!/bin/bash -e

echo -n "Did you set API_ROOT to production on web/utils/Api.js? (y/n)? "
read answer

if echo "$answer" | grep -iq "^y" ;then
    cd api/
    fly production
    cd ..

    cd web
    fly production
    cd ..
else
    echo "Please, set API_ROOT to production before deploying."
fi

