export const getPerson = (email, users) => {
    return users.find((user) => user.email !== email);
};
