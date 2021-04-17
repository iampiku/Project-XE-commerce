#!/bin/bash

set -e

read -p "enter name of your current working branch: " branchName
git pull origin $branchName
git checkout main
git merge $branchName
git push
git checkout $branch