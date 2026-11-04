const USER_CONSTANTS = {
    ROLES: {
        // 0 = unauthenticated/invalid. Must stay the most restrictive value:
        // a zero-valued Role (e.g. from a missing JSON field) must never
        // escalate to Admin.
        UNKNOWN: 0,
        USER: 1,
        MOD: 2,
        ADMIN: 3
    }
}

module.exports = USER_CONSTANTS;
