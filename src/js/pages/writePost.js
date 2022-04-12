import '../../lib/config-firebase.js';
import { auth } from '../../lib/config-auth.js';
import { createPost } from '../../lib/config-firestore.js';

export default function writePost() {
    const container = document.createElement('section');
    const template = `
    <h3>Compartilhe</h3>
    <div class="container-write-post">
        <textarea id="postContent" class="post-content"></textarea>
        <button id="btnPost" class="btn-post">Postar</button>
    </div>`;
    
    container.innerHTML = template;

    const postContent = container.querySelector('#postContent');
    const btnPost = container.querySelector('#btnPost');

    btnPost.addEventListener("click", (e) => {
        e.preventDefault();
        createPost(postContent.value, auth.currentUser.email);
        window.location.hash = '#feed';
    })

    return container
}