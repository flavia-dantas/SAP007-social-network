import {
  deletePost,
  like,
  dislike,
  editPost,
} from "../../lib/config-firestore.js";

import { auth } from "../../lib/config-auth.js";

export function postComponent(post) {
  const userEmail = auth.currentUser.email;

  const isAuthor = post.userEmail === userEmail;
  const likePost = post.like;
  const postsContainer = document.createElement("div");
  postsContainer.classList.add("container-post");

  const convertTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString("pt-br");
  };

  const templatePost = `   
            <div class="user-perfil">
            <h4 class="user-email">${post.userName}</h4>
            <p class="date-post">${(convertTimestamp(post.date))}</p>
        </div>
        <div class="post-field">
            <p id="userPost" class="user-post">${post.textPost}</p>
        </div>
        <div class="user-interactions">
            <div class="like-post">
                <button id="btnLike" class="btn-like">
                    <img id="imgLike" class="img-like" ${likePost.includes(userEmail) ? 'src="./img/icon-like.png"' : 'src="./img/icon-like-empty.png"'} alt="button-like">
                </button>
                <p id="numLikes" class="num-likes">${post.like.length}</p>
            </div>
            ${isAuthor ? `
            <div class="edit-post">
                <button id="btnConfirmEdit" class="btn-confirm-edit">
                    <img src="./img/icon-confirm.png" alt="button-confirm-edit">
                </button>
                <button id="btnEdit" class="btn-edit">
                    <img src="./img/icon-edit.png" alt="button-edit">
                </button>
            </div>
            <div class="delete-post">
                <button id="btnDelete" class="btn-delete">
                    <img src="./img/icon-delete.png" alt="button-delete">
                </button>
            </div> ` : ""}
        </div>`;

  postsContainer.innerHTML = templatePost;

  const btnLike = postsContainer.querySelector("#btnLike");
  const numLikes = postsContainer.querySelector("#numLikes");
  const heart = postsContainer.querySelector("#imgLike");

  btnLike.addEventListener("click", () => {
    if (!likePost.includes(userEmail)) {
      like(post.id, userEmail).then(() => {
        heart.setAttribute("src", "./img/icon-like.png");
        likePost.push(userEmail);
        const showLike = Number(numLikes.innerHTML) + 1;
        numLikes.innerHTML = showLike;
        console.log(numLikes, "like");
      });
    } else {
      dislike(post.id, userEmail).then(() => {
        heart.setAttribute("src", "./img/icon-like-empty.png");
        likePost.splice(userEmail);
        const showLike = Number(numLikes.innerHTML) - 1;
        numLikes.innerHTML = showLike;
        console.log(numLikes, "dislike");
      });
    }
  });

  function confirmDelete() {
    const containerModal = document.createElement("div");
    const template = `
        <div class="modal-container">
            <div id="modal" class="modal">
                <h4 class="dialog" id="dialog">Deseja realmente excluir este post? </h4>                
                <div>
                    <button id="buttonYes" class="button-yes">Sim</button>
                    <button id="buttonNo" class="button-no">Não</button>
                </div>          
            </div>
        </div>`;

    containerModal.innerHTML = template;

    const yes = containerModal.querySelector("#buttonYes");
    const no = containerModal.querySelector("#buttonNo");

    yes.addEventListener("click", () => {
      deletePost(post.id);
      postsContainer.remove();
    });

    no.addEventListener("click", () => {
      containerModal.classList.add("close-modal");
    });

    return containerModal;
  }

  if (isAuthor) {
    const btnDelete = postsContainer.querySelector("#btnDelete");
    console.log(btnDelete);
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      postsContainer.appendChild(confirmDelete());
      console.log(confirmDelete);
    });

    const btnEdit = postsContainer.querySelector("#btnEdit");
    const textEditable = postsContainer.querySelector("#userPost");
    const btnConfirmEdit = postsContainer.querySelector("#btnConfirmEdit");

    btnEdit.addEventListener("click", (e) => {
      e.preventDefault();
      textEditable.setAttribute("contenteditable", "true");
      textEditable.focus();
      console.log(btnEdit, "botão editar");
    });

    btnConfirmEdit.addEventListener("click", (e) => {
      e.preventDefault();
      textEditable.removeAttribute("contenteditable");
      editPost(post.id, textEditable.textContent);
    });
  }

  return postsContainer;
}
