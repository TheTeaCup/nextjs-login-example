let api = "http://localhost:3001";

const userLogin = async function (body) {
    return await fetch(`${api}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(res => res.json());
}

const userCreate = async function (body) {
    return await fetch(`${api}/login/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(res => res.json());
}

export {
    userLogin,
    userCreate
}

export default api;
