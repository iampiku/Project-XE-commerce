#!/bin/bash

set -e

read -p "enter you branch name: " branchName
git pull origin $branchName
git checkout master
git merge $branchName
git checkout $branch