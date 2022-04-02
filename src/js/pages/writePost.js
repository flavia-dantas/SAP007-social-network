import '../../lib/config-firebase.js';
import { auth } from '../../lib/config-auth.js';
import { createPost } from '../../lib/config-firestore.js';

export default function writePost() {
    const container = document.createElement('section');
    const template = `
    
    <h3>Share</h3>
    <div class="container-post">
    <textarea id="editPost" class="edit-Post"></textarea>
    <button id="btnPost" class="btn-post">Postar</button>
    
    </div>

`;
    container.innerHTML = template;

    const editPost = container.querySelector('#editPost');
    const btnPost = container.querySelector('#btnPost');

    btnPost.addEventListener("click", (e) => {
        e.preventDefault();
        createPost(editPost.value, auth.currentUser.email);
        window.location.hash = '#feed';
    })

    return container
}