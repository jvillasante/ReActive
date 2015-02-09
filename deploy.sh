#!/bin/bash -ex

cd api/
fly production
cd ..

cd web
fly production
cd ..
