import { doc } from 'prettier';
import MyApp from 'scripts/MyApp';
import './styles/style.scss';
import img from './assets/images/crystal-ball.png';

const END_POINT = 'https://api.github.com';

document.addEventListener('DOMContentLoaded', () => {
    const onChangeSearch = debounce(onChangeUser, 2000);
    document.querySelector('.search__input').addEventListener('keyup', onChangeSearch);
});

function debounce(fn, ms) {
    let timeout;

    return function () {
        const fnCall = () => {
            fn.apply(this, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
}

function onChangeUser(e) {
    loadUser(e.target.value);
}

async function request({ method = 'GET', path }) {
    const url = `${END_POINT}${path}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try{
        const response = await fetch(url, options);

        if(response.ok) {
            const res = await response.json();
            return res;
        }
        else {
            const error = await response.json();
            error.status = response.status;
            return error;
        }
    }
    catch{
        throw new Error('Invalid API');
    }
}

async function loadUser(name) {
    if(name === '') {
        clearUser();
        return;
    }

    const user = await request({ path: `/users/${name}` });
    updateUser(user);
}

function clearUser(){
    const user = document.querySelector('.user');
    user.innerHTML='';
}

async function loadUserRepositories(name) {
    const repositories = await request({ path: `/users/${name}/repos` });
    return repositories;
}

async function loadUserFollowers(name) {
    const followers = await request({ path: `/users/${name}/followers` });
    return followers;
}

async function updateUser(user) {
    const oldUserBlock = document.querySelector('.user');
    const parentUserBlock = document.querySelector('.user').parentElement;
    oldUserBlock.remove();

    if(user.message) {
        const errorBlock = createErrorBlock(user.status);
        parentUserBlock.insertAdjacentHTML('beforeend', errorBlock);
        return;
    }

    const repositories = await loadUserRepositories(user.login);
    const followers = await loadUserFollowers(user.login);
    const userInfo = {
        name: user?.login,
        photo: user?.avatar_url,
        repositories,
        followers,
    };

    const newUserBlock = createUserBlock(userInfo);
    parentUserBlock.insertAdjacentHTML('beforeend', newUserBlock);

    document.querySelector('.user__image').addEventListener('click', () => {
        window.open(user.html_url, '_blank');
    })
}


function createErrorBlock(status) {
    return `
    <div class="user">
      <figure class="user__image">
        <img src="${img}" alt="img">
        <figcaption class="user__name">🔮${status}🔮</figcaption>
      </figure>
    </div>
    `;
}

function createUserBlock({ name, photo, repositories, followers }) {
    const repositoriesBlock = createRepositoriesBlock(repositories);
    const followersBlock = createFollowersBlock(followers);

    return `
  <div class="user">
    <figure class="user__image">
      <img src="${photo}
      }" alt="img">
      <figcaption class="user__name">${name}</figcaption>
    </figure>
    ${repositoriesBlock}
    ${followersBlock}
  </div>
  `;
}

function createRepositoriesBlock(repositories) {
    let repositoriesBlock = '';

    repositories.forEach((repository) => {
        repositoriesBlock += `<a target="_blank" href="${repository.html_url}">${repository.name}</a>`;
    });

    return `
    <div class="user__repos">
      <div class="title title__repo">Repositories (${repositories.length})</div>
      <div class="user__link-container">
        ${repositoriesBlock}
      </div>
    </div>
    `;
}

function createFollowersBlock(followers) {
    let followersBlock = '';

    followers.forEach((follower) => {
        followersBlock += `<a target="_blank" href="${follower.html_url}">${follower.login}</a>`;
    });

    return `
    <div class="user__link">
      <div class="title title__folowers">Followers (${followers.length})</div>
      <div class="user__link-container">
        ${followersBlock}
      </div>
    </div>
  `;
}
