import request from './request.js';
import updateUser from './updateUser.js';
import clearUser from './clearUser.js'

async function loadUser(name) {
    if (name === '') {
        clearUser();
        return;
    }

    const user = await request({ path: `/users/${name}` });
    updateUser(user);
}

async function loadUserRepositories(name) {
    const repositories = await request({ path: `/users/${name}/repos` });
    return repositories;
}

async function loadUserFollowers(name) {
    const followers = await request({ path: `/users/${name}/followers` });
    return followers;
}

export { loadUser, loadUserRepositories, loadUserFollowers };