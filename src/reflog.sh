#!/bin/sh

git reflog | grep "checkout" | head -$1
