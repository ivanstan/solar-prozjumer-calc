#!/usr/bin/env bash
set -e

DEPLOY_PATH="$1"
ARTIFACT_NAME="$2"

mkdir -p ${DEPLOY_PATH}
cd ${DEPLOY_PATH}
rm -rf *
tar -xf /tmp/${ARTIFACT_NAME}
rm /tmp/${ARTIFACT_NAME}
