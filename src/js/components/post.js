import {
  deletePost,
  like,
  dislike,
  editPost,
} from "../../lib/config-firestore.js";

import { auth } from "../../lib/config-auth.js";

export function postComponent(post) {
  const userId = auth.currentUser.uid;
  const postId = post.id;
  const isAuthor = post.user === userId;
  const likePost = post.like;
  const postsContainer = document.createElement("div");
  postsContainer.classList.add("container-post");

  const templatePost = `   
        <div class="user-perfil">
          <h4 class="user-name">${post.userName}</h4>
          <p class="date-post">${post.date}</p>
        </div>
        <div class="post-field">
          <p id="textPlace" class="text-place">${post.textPlace}</p>
          <p id="textCity" class="text-city">${post.textCity}</p>
          <p id="textPost" class="text-post">${post.textPost}</p>
        </div>
        <div class="user-interactions">
            <div class="like-post">
                <button id="btnLike" class="btn-like">
                    <img id="imgLike" class="img-like" ${likePost.includes(userId) ? 'src="./img/icon-like.png"' : 'src="./img/icon-like-empty.png"'} alt="button-like">
                </button>
                <p id="numLikes" class="num-likes">${likePost.length}</p>
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
    if (!likePost.includes(userId)) {
      like(postId, userId).then(() => {
        heart.setAttribute("src", "./img/icon-like.png");
        likePost.push(userId);
        const showLike = Number(numLikes.innerHTML) + 1;
        numLikes.innerHTML = showLike;
      });
    } else {
      dislike(postId, userId).then(() => {
        heart.setAttribute("src", "./img/icon-like-empty.png");
        likePost.splice(userId);
        const showLike = Number(numLikes.innerHTML) - 1;
        numLikes.innerHTML = showLike;
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
      deletePost(postId);
      postsContainer.remove();
    });

    no.addEventListener("click", () => {
      containerModal.classList.add("close-modal");
    });

    return containerModal;
  }

  if (isAuthor) {
    const btnDelete = postsContainer.querySelector("#btnDelete");
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      postsContainer.appendChild(confirmDelete());
    });

    const btnEdit = postsContainer.querySelector("#btnEdit");
    const placeEditable = postsContainer.querySelector("#textPlace");
    const cityEditable = postsContainer.querySelector("#textCity");
    const postEditable = postsContainer.querySelector("#textPost");
    const btnConfirmEdit = postsContainer.querySelector("#btnConfirmEdit");

    btnEdit.addEventListener("click", (e) => {
      e.preventDefault();
      placeEditable.setAttribute("contenteditable", "true");
      cityEditable.setAttribute("contenteditable", "true");
      postEditable.setAttribute("contenteditable", "true");
      postEditable.focus();
    });

    btnConfirmEdit.addEventListener("click", (e) => {
      e.preventDefault();
      const postText = postEditable.textContent;
      const cityText = cityEditable.textContent;
      const placeText = placeEditable.textContent;
      placeEditable.removeAttribute("contenteditable");
      cityEditable.removeAttribute("contenteditable");
      postEditable.removeAttribute("contenteditable");
      editPost(postId, postText, cityText, placeText);
    });
  }

  return postsContainer;
}
