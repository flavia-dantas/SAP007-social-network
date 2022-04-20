import { deletePost, like, deslike, editPost } from '../../lib/config-firestore.js';
import { auth } from '../../lib/config-auth.js';

export function postComponent(post) {
    const postsContainer = document.createElement('div');
    postsContainer.classList.add("container-post")
    const templatePost = `   
            <div class="user-perfil">
            <h4 class="user-email">${post.userEmail}</h4>
            <p class="date-post">${(convertTimestamp(post.date))}</p>
        </div>
        <div class="post-field">
            <p id="userPost" class="user-post">${post.textPost}</p>
        </div>
        <div class="user-interactions">
            <div class="like-post">
                <button id="btnLike" class="btn-like">
                    <img src="../../img/icon-like-empty.png" alt="button-like">
                </button>
                <p id="numLikes" class="num-likes">${post.like.length}</p>
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
    const numLikes = postsContainer.querySelector('#numLikes');

    btnLike.addEventListener('click', () => {
        const likePost = post.like
        if (likePost.includes(auth.currentUser.email)) {
            deslike(post.id, auth.currentUser.email).then(() => {
                likePost.splice(auth.currentUser.email);
                const showLike = Number(numLikes.innerHTML) - 1;
                numLikes.innerHTML = showLike;
                console.log(numLikes, "deslike");
            })
        } else {
            like(post.id, auth.currentUser.email).then(() => {
                likePost.push(auth.currentUser.email);
                const showLike = Number(numLikes.innerHTML) + 1;
                numLikes.innerHTML = showLike;
                console.log(numLikes, "like");
            })
        }
    });

    const btnDelete = postsContainer.querySelector('#btnDelete');
    btnDelete.addEventListener("click", (e) => {
        e.preventDefault();
        deletePost(post.id);
        postsContainer.remove();
    });


    const btnEdit = postsContainer.querySelector('#btnEdit');
    const textEditable = postsContainer.querySelector('#userPost');
    const btnConfirmEdit = postsContainer.querySelector('#btnConfirmEdit');

    btnEdit.addEventListener("click", (e) => {
        e.preventDefault();
        textEditable.setAttribute('contenteditable', 'true');

    })

    btnConfirmEdit.addEventListener("click", (e) => {
        e.preventDefault();
        editPost(post.id, textEditable.textContent);
    })

    return postsContainer;
};

const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    return date.toLocaleString("pt-br");
};

