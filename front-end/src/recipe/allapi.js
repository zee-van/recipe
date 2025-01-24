import axios from 'axios';
const API_URL = 'http://localhost:8080';


export const registerUser = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: data
    };
    return axios.request(config).then((respnse) => {
        return respnse;
    });
};

export const loginUser = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        data: data
    }
    return axios.request(config).then((response) => {
        return response;
    })
}

export const logout = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/logout`,
        withCredentials: true,
        credentials: 'include'
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const uploadRecipe = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/users-recipe-upload`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const listedRecipes = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/users-recipe`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const deleteRecipe = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/users-recipe/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const viewRecipe = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/users-recipe/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const updateRecipe = async (id, data) => {
    let config = {
        method: 'put',
        url: `${API_URL}/users-recipe/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}


export const allRecipeLists = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/view-all-recipes`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const recipeMakersDetails = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/user`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const editUsersProfile = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/users/edit`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const searchedRecipe = async (query) => {
    let config = {
        method: 'get',
        url: `${API_URL}/searchrecipe/${query}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}