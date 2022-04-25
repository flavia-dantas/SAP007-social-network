import '../../lib/config-firebase.js';
import { userLogout } from '../../lib/config-auth.js';

export function navbar() {
    const container = document.createElement("nav");
    container.classList.add("container-nav");

    const template = `
    <button id="btnHome" class="btn-home">
        <img src="./img/icon-home.png" alt="button-home">
    </button>
    <button id="btnNewPost" class="btn-new-post">
      <img src="./img/icon-new-post.png" alt="button-new-post">
    </button>
    <button id="btnLogout" class="btn-logout">
        <img src="./img/icon-logout.png" alt="button-logout">
    </button>
    `;

    container.innerHTML = template;

    const btnHome = container.querySelector('#btnHome');
    const btnNewPost = container.querySelector('#btnNewPost');
    const btnLogout = container.querySelector('#btnLogout');

    btnHome.addEventListener("click", () => {
        window.location.hash = '#feed';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btnNewPost.addEventListener("click", () => {
        window.location.hash = '#writePost';
    });

    btnLogout.addEventListener("click", () => {
        userLogout()
            .then(() => {
                window.location.hash = '#login';
                console.log("usuario desconectado!")
            }).catch((error) => {
                return error;
            });
    })

    return container;
}
