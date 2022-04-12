import '../../lib/config-firebase.js';
import { createUser, googleLogin } from '../../lib/config-auth.js';

export default function register() {
    const container = document.createElement('section');
    const template = `

    <div class="container-register">
        <div class="logo">
        <img class="logo-gf" src="./img/logo.png" alt="logo">
        </div>
        <h3 class="register">Cadastro</h3>
        <form class="form-register">
            <label class="label-form">E-mail
                <span class="required-item">*</span>
            </label>
            <input type="email" id="inputEmail" class="input-email" placeholder="exemplo@exemplo.com">
            <label class="label-form">Senha
                <span class="required-item">*</span>
            </label>
            <input type="password" id="inputPassword" class="input-password" placeholder="******">
            <button type="submit" id="btnRegister" class="btn-register">Cadastrar</button>
            <p id="errorMessage" class="error-message"></p>
            <p class="subtitle">ou</p>
            <button type="submit" id="btnGoogle" class="btn-google"><img class="google-logo" src="./img/icon-google.png">Inscreva-se com Google</button>
            <p>Tem uma conta? <a class= "option-login" href="/#login">Conecte-se</a></p>
        </form>
    </div>
    `;
    container.innerHTML = template;

    const email = container.querySelector('#inputEmail');
    const password = container.querySelector('#inputPassword');
    const btnRegister = container.querySelector('#btnRegister');
    const btnRegisterGoogle = container.querySelector('#btnGoogle');


    btnRegister.addEventListener('click', (e) => {
        e.preventDefault();
        createUser(email.value, password.value)
            .then(function () {
                window.location.hash = '#feed';
            })
            .catch((error) => {
                const errorMessage = error.message;
                return errorMessage;
            });
    });

    btnRegisterGoogle.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log("Vamos Google")
        googleLogin()
            .then(() => {
                window.location.hash = 'feed';
            }).catch((error) => {
                console.log(error);
            })
    });
    return container;
}
