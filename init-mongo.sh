#!/bin/bash
# MongoDB init script: creates per-service databases and an app user.
# Runs via /docker-entrypoint-initdb.d/ with env vars available.
# Requires: MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD,
#           MONGO_APP_USER, MONGO_APP_PASSWORD

set -e

mongosh --username "$MONGO_INITDB_ROOT_USERNAME" \
        --password "$MONGO_INITDB_ROOT_PASSWORD" \
        --authenticationDatabase admin <<EOF
const user = '$MONGO_APP_USER';
const pwd = '$MONGO_APP_PASSWORD';

function setupDatabaseAndUser(dbName) {
    print('Setting up database: ' + dbName);
    db = db.getSiblingDB(dbName);
    // Create the database by inserting a dummy collection
    db.createCollection('_init');
    db._init.drop();

    let userInfo = db.getUser(user);
    if (!userInfo) {
        db.createUser({
            user: user,
            pwd: pwd,
            roles: [{ role: 'readWrite', db: dbName }],
        });
        print('Created user ' + user + ' in database ' + dbName);
    } else {
        print('User ' + user + ' already exists in ' + dbName);
    }
}

const databases = ['friend', 'message', 'notification', 'user', 'comment', 'reaction', 'group', 'page', 'video'];
databases.forEach(setupDatabaseAndUser);
print('MongoDB init completed.');
EOF
