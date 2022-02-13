import { createErrorBlock, createUserBlock } from './createBlocks.js';
import { loadUserRepositories, loadUserFollowers} from './loadUserActions.js'

async function updateUser(user) {
    const oldUserBlock = document.querySelector('.user');
    const parentUserBlock = oldUserBlock.parentElement;
    oldUserBlock.remove();

    if(user.message) {
        const errorBlock = createErrorBlock(user.status);
        parentUserBlock.insertAdjacentHTML('beforeend', errorBlock);
        return;
    }

    const [repositories, followers ] = await Promise.all([
        loadUserRepositories(user.login),
        loadUserFollowers(user.login)
    ])

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

export default updateUser;