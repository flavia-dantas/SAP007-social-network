import { like, deslike } from '../../lib/config-firestore.js';
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
            <p class="user-post">${post.textPost}</p>
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
         // console.log(Number(numLikes.innerHTML));
         const likePost = post.like
         if(likePost.includes(auth.currentUser.email)){
            deslike(post.id, auth.currentUser.email).then(()=> {
                const showLike = Number(numLikes.innerHTML) -1;
                numLikes.innerHTML = showLike;
                console.log(numLikes,"deslike");
            })
         }else{
            like(post.id, auth.currentUser.email).then(()=>{
                likePost.push(auth.currentUser.email);
                const showLike = Number(numLikes.innerHTML) +1;
                numLikes.innerHTML = showLike;
                // = likePost.length +1;
                console.log(numLikes,"like");
            })
            
         }
    });

    return postsContainer;
};

const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    return date.toLocaleString("pt-br");
};

    // for(let i=0;i < btnLike.length; i++)


 // if(post.like.includes((auth.currentUser.email))){
        //     deslike(post.id, auth.currentUser.email);
        //     post.like.remove(auth.currentUser.email);
        //     numLikes.innerHTML = post.like.length -1;
        // }else{
        //     like(post.id, auth.currentUser.email);
        //     post.like.push(auth.currentUser.email);
        //     numLikes.innerHTML = post.like.length;
        // }









// btnLike.addEventListener('click', async () => {
//     const postLike = post.like

    

//     const userFound = postLike.find(
//         (user) => user === auth.currentUser.emai);
//     if (!userFound){
//         await like(post.id, auth.currentUser.email);
//         const numLikes = Number(showLikes.textContent);
//         showLikes.innerHTML = numLikes + 1;
//         postLike.push(auth.currentUser.email);
//     } else {
//         await deslike(post.id, auth.currentUser.email);
//         const numLikes = Number(showLikes.textContent);
//         showLikes.innerHTML = numLikes - 1;
//         postLike = postLike.map(
//             (user) => user !== auth.currentUser.email);
//     }
// });