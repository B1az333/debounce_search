import {loadUser} from './loadUserActions.js';
import debounce from './debounce.js';

function myApp() {
    const onChangeUser = (e) => loadUser(e.target.value);
    const onChangeUserDebounce = debounce(onChangeUser, 1300);
    
    document.querySelector('.search__input').addEventListener('keyup', onChangeUserDebounce);
}

export default myApp;