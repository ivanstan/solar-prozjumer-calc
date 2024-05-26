#!/usr/bin/env bash
set -e

. scripts/.env

ARTIFACT_NAME=artifact-$(date '+%Y%m%d%H%M').tar.gz

npm run build

echo "create artifact"
tar -czf "/tmp/${ARTIFACT_NAME}" -C dist .

echo "upload artifact"
scp -r -P ${PORT} "/tmp/${ARTIFACT_NAME}" ${USERNAME}@${HOSTNAME}:/tmp
rm "/tmp/${ARTIFACT_NAME}"

echo ${USERNAME}@${HOSTNAME}

ssh "${USERNAME}@${HOSTNAME}" -p ${PORT} "bash -s" < ./scripts/_deploy-remote.sh "$DEPLOY_PATH" "$ARTIFACT_NAME"
