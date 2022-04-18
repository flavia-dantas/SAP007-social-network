import { likeUpdate } from '../../lib/config-firestore.js';
import { auth } from '../../lib/config-auth.js';

export function postComponent(post) {
    const postsContainer = document.createElement('div');
    postsContainer.classList.add("container-post")
    const templatePost = `   
            <div class="user-perfil">
            <h4 class="user-email">${post.userEmail}</h4>
            <p class="date-post">${post.date}</p>
        </div>
        <div class="post-field">
            <p class="user-post">${post.textPost}</p>
        </div>
        <div class="user-interactions">
            <div class="like-post">
                <button id="btnLike" class="btn-like">
                    <img src="../../img/icon-like-empty.png" alt="button-like">
                </button>
                <span id="numLikes" class="num-likes">${post.like.length}</span>
            </div>
            <div class="edit-post">
                <button id="btnConfirmEdit" class="btn-confirm-edit">
                    <img src="../../img/icon-confirm.png" alt="button-confirm-edit">
                </button>
                <button id="btnEdit" class="btn-edit">
                    <img src="../../img/icon-edit.png" alt="button-edit">
                </button>
            </div>
            <div class="delete-post">
                <button id="btnDelete" class="btn-delete">
                    <img src="../../img/icon-delete.png" alt="button-delete">
                </button>
            </div>
        </div>`
    
    postsContainer.innerHTML = templatePost;
    
    const btnLike = postsContainer.querySelector('#btnLike');

    btnLike.addEventListener('click', () => {

        likeUpdate(post.id, auth.currentUser.email);
      });

    return postsContainer;
}