import "../../lib/config-firebase.js";
import { createUser, googleLogin } from "../../lib/config-auth.js";

export default function register() {
  const container = document.createElement("section");
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
            <input type="email" id="inputEmail" class="input-email" placeholder="exemplo@exemplo.com" autocomplete="on"/>
            <label class="label-form">Senha
                <span class="required-item">*</span>
            </label>
            <input type="password" id="inputPassword" class="input-password" placeholder="******" minlength="6" required/>
            <p id="errorMessage" class="error-message"></p>
            <button id="btnRegister" class="btn-register">Cadastrar</button>
            <p class="subtitle">ou</p>
            <button id="btnGoogle" class="btn-google"><img class="google-logo" src="./img/icon-google.png">Inscreva-se com Google</button>
            <p>Tem uma conta? <a class= "option-login" href="#login">Conecte-se</a></p>
        </form>
    </div>
    `;
  container.innerHTML = template;

  const btnRegister = container.querySelector("#btnRegister");
  const email = container.querySelector("#inputEmail");
  const password = container.querySelector("#inputPassword");
  const btnRegisterGoogle = container.querySelector("#btnGoogle");
  const errorMessage = container.querySelector("#errorMessage");

  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    createUser(email.value, password.value)
      .then(() => {
        window.location.hash = "#feed";
      })
      .catch((error) => {
        if (email.value === "" || password.value === "") {
          errorMessage.innerHTML = "Por favor, preencha todos os campos.";
        } else if (error.code === "auth/email-already-in-use") {
          errorMessage.innerHTML = "E-mail já cadastrado";
        } else if (error.code === "auth/uid-already-exists") {
          errorMessage.innerHTML = "E-mail já cadastrado";
        } else if (error.code === "auth/invalid-email") {
          errorMessage.innerHTML = "E-mail inválido";
        } else if (error.code === "auth/weak-password") {
          errorMessage.innerHTML = "Senha fraca";
        } else {
          errorMessage.innerHTML = "Algo deu errado. Tente novamente.";
        }
      });
  });

  btnRegisterGoogle.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("Vamos Google")
    googleLogin()
      .then(() => {
        window.location.hash = "feed";
      }).catch((error) => {
        console.log(error);
      });
  });
  return container;
}
