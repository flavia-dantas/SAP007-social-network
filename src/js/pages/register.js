import '../../lib/config-firebase.js';
import { createUser, googleLogin } from '../../lib/config-auth.js';

export default function register() {
    const container = document.createElement('section');
    const template = `

    <div class="container-register">
        <div class="logo"></div>
        <h3>Cadastro</h3>
        <form class="form-register">
            <div>
            <label class="label-form">E-mail
                <span class="required-item">*</span>
            </label>
            <input type="email" id="inputEmail" class="input-email" placeholder="exemplo@exeplo.com">
            <label class="label-form">Senha
                <span class="required-item">*</span>
            </label>
            <input type="password" id="inputPassword" class="input-password" placeholder="******">
            <button type="submit" id="btnRegister" class="btn-register">Cadastrar</button>
            <p id="errorMessage" class="error-message"></p>
        </form>
        <p class="subtitle">Ou</p>
        <button type="submit" id="btnGoogle" class="btn-google">Inscreva-se com Google</button>
        <p>Tem uma conta? <a class= "login" href="/#login">Conecte-se</a></p>
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
        console.log("Vamos Google")
        googleLogin()
            .then(() => {
                window.location.hash = 'feed';
            }).catch((error) => {
                console.log(error);
            })
    });
    return container;
}
