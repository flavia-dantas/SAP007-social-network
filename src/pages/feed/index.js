import '../../lib/config-firebase.js';
import { userLogout } from '../../lib/config-auth.js';
import { createPost } from '../../lib/config-firestore.js';


export default function feed() {
    const container = document.createElement('div');
    const template = `
    <div class="container-feed">
        <h3>Feed</h3>
        <button id="btnLogout" class="btn-logout">Logout</button>
    </div>

    <div class="container-post" id="">
        <textarea id="editPost" class="edit-Post"></textarea>
        <button id="btnPost" class="btn-post">Postar</button>
        <button id="editButton" class="edit-button">Editar</button>
        <button id="deleteButton" class="delete-button">Excluir</button>
        <textarea id="post" class="post"></textarea>
    </div>
    `;
    container.innerHTML = template;

    const btnLogout = container.querySelector('#btnLogout');
    const btnPost = container.querySelector('#btnPost');
    const editPost = container.querySelector('#editPost');

    btnPost.addEventListener("click", (e) => {
        e.preventDefault();
        createPost(editPost.value);
        console.log("postado!");
    })


    btnLogout.addEventListener("click", (e) => {
        e.preventDefault();
        userLogout()
            .then(() => {
                window.location.hash = '#login';
            }).catch((error) => {
                return error;
            });
    })

    return container

}
