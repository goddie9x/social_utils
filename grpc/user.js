const extractUserResponse = (response) => {
    const user = {
        id: response.getId(),
        username: response.getUsername(),
        firstName: response.getFirstname(),
        lastName: response.getLastname(),
        avatarUrl: response.getAvatarurl(),
        coverPhotoUrl: response.getCoverphotourl(),
        role: response.getRole(),
        createdAt: response.getCreatedat(),
        updatedAt: response.getUpdatedat(),
        emails: response.getEmailsList()?.map(email => ({
            email: email.getEmail(),
            isPrimary: email.getIsprimary(),
            isVerified: email.getIsverified()
        })),
        phones: response.getPhonesList()?.map(phone => ({
            number: phone.getNumber(),
            isPrimary: phone.getIsprimary(),
            isVerified: phone.getIsverified()
        })),
        followerIds: response.getFolloweridsList()
    };
    return user;
};


const extractGetUsersWithPaginationResponse = (response) => {
    const result = {
        page: response.getPage(),
        limit: response.getLimit(),
        totalUsers: response.getTotalUsers(),
        totalPages: response.getTotalPages(),
        users: response.getUsersList().map(extractUserResponse),
    };
    return result;
};
const extractDeleteResponse = (response) => {
    return {};
};

const extractGetListUserByIdsResponse = (response) => {
    const result = {
        users: response.getUsersList().map(extractUserResponse),
    };
    return result;
};

const extractAuthResponse = (response) => {
    return response.getToken();
};

const extractDeleteMultipleResponse = (response) => {
    const result = {
        deletedCount: response.getDeletedCount()
    };
    return result;
};

const getUserByIdGRPCGenerate = ({ userMessages, userServiceClient }) => {
    return (userId) => new Promise((resolve, reject) => {
        const userIdString = userId.toString();
        const request = new userMessages.GetUserByIdRequest();

        request.setId(userIdString);
        userServiceClient.getUserById(request, (error, response) => {
            if (error) {
                return reject(error);
            }
            const user = formatUserResponse(response, userMessages);

            resolve(user);
        });
    })
}

const getListUserByIdsGRPCGenerate = ({ userMessages, userServiceClient }) => {
    return ids => new Promise((resolve, reject) => {
        const listStringId = ids.map(id => id.toString());
        const request = new userMessages.GetListUserByIdsRequest();

        request.setIdsList(listStringId);

        userServiceClient.getListUserByIds(request, (error, response) => {
            if (error)
                return reject(error);
            const listUser = extractGetListUserByIdsResponse(response, userMessages);
            resolve(listUser);
        });
    })
}

module.exports = {
    getUserByIdGRPCGenerate,
    getListUserByIdsGRPCGenerate
}
