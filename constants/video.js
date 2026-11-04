// Canonical constants for the short-video service (social_video_service).
// Privacy values mirror the Go post service (PRIVATE=0, PUBLIC=1, FRIEND=2)
// so cross-service semantics stay consistent. Zero-value = PRIVATE, the
// most restrictive, so a missing privacy field can never leak a video.
const VIDEO = {
    PRIVACY: {
        PRIVATE: 0,
        PUBLIC: 1,
        FRIEND: 2,
    },
    STATUS: {
        DRAFT: 0,
        PUBLISHED: 1,
    },
};

module.exports = VIDEO;
