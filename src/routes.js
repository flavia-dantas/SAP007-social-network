import register from "./pages/register/index.js";
import login from "./pages/signIn/index.js";
import feed from "./pages/feed/index.js";

const main = document.getElementById('root');

const redirect = () => {
    switch (window.location.hash) {
        case '#login':
            main.appendChild(login());
            break;
        case '#register':
            main.appendChild(register());
            break;
        case '#feed':
            main.appendChild(feed());
            break;
        default:
            main.appendChild(login());
    }
}

const init = () => {
    window.addEventListener('hashchange', () => {
        console.log(window.location.hash)
        main.innerHTML = '';
        redirect();
    });
};

window.addEventListener('load', () => {
    console.log("aqui!")
    redirect();
    init();
});