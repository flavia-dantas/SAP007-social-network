import "../../lib/config-firebase.js";
import { auth } from "../../lib/config-auth.js";
import { createPost } from "../../lib/config-firestore.js";
import { navbar } from "../components/navbar.js";
import { header } from "../components/header.js";

export default function writePost() {
  const container = document.createElement("section");
  const template = `    
    <div class="container-write-post">
        <p>Compartilhe sua indicação</p>
        <label class="label-form">Nome do Estabelecimento:
                <span class="required-item">*</span>
        </label>
        <input type="text" id="inputPlace" class="input-place">
        <label class="label-form">Cidade:
                <span class="required-item">*</span>
        </label>
        <input type="text" id="inputCity" class="input-city">
         <label class="label-form">Sua indicação:
                <span class="required-item">*</span>
        </label>
        <textarea id="postContent" class="post-content"></textarea>
        <p id="errorMessage" class="error-message"></p>
        <button id="btnPost" class="btn-post">Postar</button>
    </div>`;

  container.appendChild(header());
  container.innerHTML += template;
  container.appendChild(navbar());

  const postContent = container.querySelector("#postContent");
  const btnPost = container.querySelector("#btnPost");
  const errorMessage = container.querySelector("#errorMessage");
  const inputPlace = container.querySelector("#inputPlace");
  const inputCity = container.querySelector("#inputCity");

  btnPost.addEventListener("click", (e) => {
    e.preventDefault();
    if (postContent.value === "" || inputCity.value === "" || inputPlace.value === "") {
      errorMessage.innerHTML = "O campo está vazio, verifique.";
    } else if (inputCity.value.length < 2 && inputPlace.value.length < 2) {
      errorMessage.innerHTML = "Cidade e Estabelecimento deverão ser maior que 2 caracteres";
    } else if (postContent.value.length < 20) {
      errorMessage.innerHTML = "Sua indicação deverá ser maior que 20 caracteres";
    } else {
      createPost(inputCity.value, inputPlace.value, postContent.value, auth.currentUser.name);
      window.location.hash = "#feed";
    }
  });

  return container;
}
