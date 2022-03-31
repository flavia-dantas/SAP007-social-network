import '../../lib/config-firebase.js';
import { signIn, googleLogin } from '../../lib/config-auth.js';

export default function login() {
    const container = document.createElement('section');
    const template = `

    <div class="container-login">
        <img class="logo" src="./img/logo.png" alt="logo">
        <h3 class="title">Login</h3>
        <form class="form-login">
            <label class="label-form">E-mail
                <span class="required-item">*</span>
            </label>
            <input type="email" id="inputEmail" class="input-email" placeholder="exemplo@exemplo.com">
            <label class="label-form">Senha 
                <span class="required-item">*</span>
            </label>
            <input type="password" id="inputPassword" class="input-password" placeholder="******">
            <button type="submit" id="btnLogin" class="btn-login">Entrar</button>
            <p id="errorMessage" class="error-message"></p>
            <p class="subtitle">Ou</p>
            <button type="submit" id="btnGoogle" class="btn-google">Fazer login com Google</button>
            <p>Não tem uma conta? <a class="register" href="/#register">Cadastre-se</a></p>
        </form>
    </div>
        `;
    container.innerHTML = template;

    const email = container.querySelector('#inputEmail');
    const password = container.querySelector('#inputPassword');
    const btnSignIn = container.querySelector('#btnLogin');
    const btnLoginGoogle = container.querySelector('#btnGoogle');

    btnSignIn.addEventListener("click", (e) => {
        e.preventDefault();
        signIn(email.value, password.value)
            .then(function () {
                window.location.hash = '#feed';
            })
            .catch((error) => {
                const errorMessage = error.message;
                return errorMessage;
            });
    });

    btnLoginGoogle.addEventListener('click', (e) => {
        e.preventDefault();
        googleLogin()
            .then(() => {
                window.location.hash = '#feed';
            }).catch((error) => {
                console.log(error);
            })
    });
    return container

}  