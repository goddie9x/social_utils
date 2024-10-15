const user = 'goddie9x';
const pwd = 'thisIsJustTheTestPassword123';

function setupDatabaseAndUser(dbName) {
    print(`Attempting to set up database: ${dbName}`);
    try {
        db = db.getSiblingDB(dbName);
        print(`Switched to database: ${dbName}`);

        try {
            db.createCollection('dummy');
            print(`Created dummy collection in ${dbName}`);
            // Remove the dummy collection after creating the database
            db.dummy.drop();
            print(`Removed dummy collection from ${dbName}`);
        } catch (error) {
            print(`Failed to create dummy collection in ${dbName}: ${error.message}`);
        }

        let userInfo = db.getUser(user);
        if (userInfo) {
            print(`User ${user} already exists in ${dbName}, updating...`);
            db.updateUser(user, {
                pwd: pwd,
                roles: [{ role: 'readWrite', db: dbName }],
            });
            print(`Updated user ${user} in database ${dbName}`);
        } else {
            print(`Creating new user ${user} in ${dbName}...`);
            db.createUser({
                user: user,
                pwd: pwd,
                roles: [{ role: 'readWrite', db: dbName }],
            });
            print(`Created user ${user} in database ${dbName}`);
        }

        userInfo = db.getUser(user);
        if (userInfo) {
            print(`Verified: User ${user} exists in ${dbName}`);
        } else {
            print(`Warning: Failed to verify user ${user} in ${dbName}`);
        }

        let collections = db.getCollectionNames();
        print(`Collections in ${dbName}: ${collections.join(', ')}`);

    } catch (error) {
        print(`Error in database ${dbName}: ${error.message}`);
    }
}

const databases = ['friend', 'message', 'notification', 'user','comment','reaction'];
print("Starting database and user setup...");
databases.forEach(setupDatabaseAndUser);

print("Database and user setup completed. Please check the logs above for details.");

print("Listing all databases:");
db.adminCommand('listDatabases').databases.forEach(db => print(db.name));