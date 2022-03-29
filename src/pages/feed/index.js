import '../../lib/config-firebase.js';
import { userLogout } from '../../lib/config-auth.js';
import { createPost } from '../../lib/config-firestore.js';


export default function feed() {
    const container = document.createElement('div');
    const template = `
    <div class="container-feed">
        <h3>Feed</h3>
        <button id="logoutButton" class="logout-button">Logout</button>
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

    const btnLogout = container.querySelector('#logoutButton');
    const btnPost = container.querySelector('#btnPost');
    const editPost = container.querySelector('#editPost');

    `;
    container.innerHTML = template;

   
    const btnLogout = container.querySelector('#logoutButton');


    btnLogout.addEventListener("click", (e) => {
        e.preventDefault();
        userLogout()
            .then(() => {
                window.location.hash = '#login';
            }).catch((error) => {
                return error;
            });
    })


    btnPost.addEventListener("click", (e) =>{
        e.preventDefault();
        createPost(editPost.value);
        console.log("postado!")
    })

    return container

}
