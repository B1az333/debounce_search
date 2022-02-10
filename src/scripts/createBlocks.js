import img from './../assets/images/crystal-ball.png';

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
    if (!Array.isArray(repositories)) throw new TypeError('An array is expected in the parameter ');

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
    if (!Array.isArray(followers)) throw new TypeError('An array is expected in the parameter ');

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

export { createErrorBlock, createUserBlock, createRepositoriesBlock, createFollowersBlock };
