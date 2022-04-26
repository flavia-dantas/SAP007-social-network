import "../../lib/config-firebase.js";
import { signIn, googleLogin } from "../../lib/config-auth.js";

export default function login() {
  const container = document.createElement("section");
  const template = `
    <div class="container-login">
        <div class="gf-logotipo">
            <img class="logo-gf" src="./img/logo.png" alt="logo">
        </div>
        <h3 class="title">Login</h3>
        <form class="form-login">
            <label class="label-form">E-mail
                <span class="required-item">*</span>
            </label>
            <input type="email" id="inputEmail" class="input-email" placeholder="exemplo@exemplo.com" autocomplete="on" required/>
            <label class="label-form">Senha 
                <span class="required-item">*</span>
            </label>
            <input type="password" id="inputPassword" class="input-password" placeholder="******" minlength="6" required/>
            <p id="errorMessage" class="error-message"></p>
            <button type="submit" id="btnLogin" class="btn-login">Entrar</button>
            <p class="subtitle">ou</p>
            <button id="btnGoogle" class="btn-google"><img class="google-logo" src="./img/icon-google.png">Fazer login com Google</button>
            <p>Não tem uma conta? <a class="option-register" href="#register">Cadastre-se</a></p>
        </form>
    </div>
    `;
  container.innerHTML = template;

  const formLogin = container.querySelector(".form-login");
  const email = container.querySelector("#inputEmail");
  const password = container.querySelector("#inputPassword");
  const btnLoginGoogle = container.querySelector("#btnGoogle");
  const errorMessage = container.querySelector("#errorMessage");

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    signIn(email.value, password.value)
      .then(() => {
        window.location.hash = "#feed";
      })
      .catch((error) => {
        if (email.value === "" || password.value === "") {
          errorMessage.innerHTML = "Por favor, preencha todos os campos.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage.innerHTML = "E-mail inválido.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage.innerHTML = "E-mail não encontrado.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage.innerHTML = "Senha incorreta";
        } else {
          errorMessage.innerHTML = "Algo deu errado. Tente novamente.";
        }
      });
  });

  btnLoginGoogle.addEventListener("click", (e) => {
    e.preventDefault();
    googleLogin()
      .then(() => {
        window.location.hash = "#feed";
      }).catch((error) => {
        console.log(error);
      });
  });
  return container;
}
