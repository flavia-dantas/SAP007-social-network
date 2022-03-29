import '../../lib/config-firebase.js';
import { signIn } from '../../lib/config-auth.js';

export default function login() {
    const container = document.createElement('div');
    const template = `

    <div class="container-login">
        <div class="logo"></div>
        <h3>Login</h3>
        <form class="form-login">
            <label class="label-form">E-mail
                <span class="required-item">*</span>
            </label>
            <input type="email" id="inputEmail" class="input-email" placeholder="exemplo@exeplo.com" required>
            <label class="label-form">Senha 
                <span class="required-item">*</span>
            </label>
            <input type="password" id="inputPassword" class="input-password" placeholder="******" required>
            <button type="submit" id="btnLogin" class="btn-login">Entrar</button>
            <p id="errorMessage" class="error-message"></p>
            <p class="subtitle">OU</p>
            <button type="submit" id="bntGoogle" class="btn-google">Continuar com Google</button>
            <p>Não tem uma conta? <a href="/#register">Cadastre-se</a></p>
        </form>
    </div>
        `;
    container.innerHTML = template;

    const email = container.querySelector('#inputEmail');
    const password = container.querySelector('#inputPassword');
    const btnSignIn = container.querySelector('#btnLogin');
    const btnRegisterGoogle = container.querySelector('#bntGoogle');
     

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
    return container

}  