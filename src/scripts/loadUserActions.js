import request from './request.js';
import updateUser from './updateUser.js';

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

function clearUser() {
    const user = document.querySelector('.user');
    user.innerHTML = '';
}

export { loadUser, loadUserRepositories, loadUserFollowers, clearUser };
