#!/bin/bash

set -e

read -p "enter you working branch name: " branchName
git pull origin $branchName
git checkout main
git merge $branchName
git checkout $branch