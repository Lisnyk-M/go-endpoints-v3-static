import axios from 'axios';

const ax = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const getUsers = () => {
    return ax.get(`/users`)
        .then(res => res.data)
        .catch(error => error);
}

const deleteUser = (contactId) => {
    ax.delete(`/user/${contactId}`)
        .then(res => res.data)
        .catch(error => error);
}

const addUser = (name, email) => {
    return new Promise((resolve, reject) => {
        ax.post(`/auth/register`, {
            User: name,
            Email: email,
            Password: "1111",
        })
            .then(res => resolve(res.data))
            .catch(error => {
                error && error.response && error.response.data
                    ? reject(error.response.data.error)
                    : reject("Netwok error");

            })
    })
}

export default { getUsers, deleteUser, addUser };