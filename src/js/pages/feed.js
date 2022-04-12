import '../../lib/config-firebase.js';
import { getPost } from '../../lib/config-firestore.js';
import { gettingPost } from '../components/post.js';

export default function feed() {
    const container = document.createElement('section');
    const template = `
    <h3>Feed</h3>
    <section id="showPost" class="show-post"></section>
    
    `;
    container.innerHTML = template;
    
    const sectionPost = container.querySelector('#showPost');

    const showAllPosts = async () => {
    const allPosts = await getPost();
        allPosts.map(item => {
            const postElement = gettingPost(item);
            sectionPost.appendChild(postElement);
        })
    }  
    showAllPosts();
    return container
}
    
    // btnPost.addEventListener("click", async (e) => {
    //     e.preventDefault();
    //     createPost(editPost.value, auth.currentUser.email);
        
    // })

    // btnLogout.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     userLogout()
    //         .then(() => {
    //             window.location.hash = '#login';
    //         }).catch((error) => {
    //             return error;
    //         });
    // })

 

