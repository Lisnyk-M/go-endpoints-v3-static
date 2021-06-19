// export default function getUsers(e) {
//     // console.log("FETCHHHHHHHHHHHHHHHHHHHH");

//     return fetch('http://localhost:3001/users')
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             // console.log(data);
//             return data;
//         });

// }

// import axios from 'axios';

// const fetchArticlesWithQuery = (searchQuery, page = 1, perPage = 12) => {
//     const baseURL = 'https://pixabay.com/api/?&key=17921001-34fc34d57ac8e12c6e45b531b&q=';

//     return axios
//         .get(baseURL + searchQuery + `&page=${page}&per_page=${perPage}`)
//         .then(response => response.data.hits);        
// }

// export default {
//     fetchArticlesWithQuery,
// }

import axios from 'axios';

const ax = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const getUsers = () => {
    return ax.get(`/users`)
        .then(res => {
            // this.setState({ contacts: res.data });
            console.log('existUsers: ', res.data);
            return res.data;
        })
        .catch(error => {
            // this.setState({error: error.message});
            return error;
        })
}

const deleteUser = (contactId) => {
    ax.delete(`/user/${contactId}`)
        .then(res => {
            // this.setState({ contacts: res.data });
            // console.log('existUsers: ', res.data);
            return res.data;
        })
        .catch(error => {
            // this.setState({error: error.message});
            return error;
        })
}

const addUser = (name, email) => {
    // const today = new Date(Date.now()).toLocaleDateString();
    return new Promise((resolve, reject) => {
        ax.post(`/auth/register`, {
            User: name,
            Email: email,
            Password: "1111",
            // Date: today,
        })
            .then(res => {
                // this.setState({ contacts: res.data });
                console.log('res.data: ', res.data);
                resolve(res.data);
            })
            .catch(error => {
                // this.setState({error: error.message});
                // console.log('error: ', error.response.data.error);
                error && error.response && error.response.data
                    ? reject(error.response.data.error)
                    : reject("Netwok error");

            })
    })
}

//     api.post(`/auth/register`, {
//         User: name,
//         Email: email,
//         Password: "1111",
//     })
//         .then(res => res)
//         .catch(err => this.setState({ error: err.message }))

export default { getUsers, deleteUser, addUser };