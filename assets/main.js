const postList = document.querySelector('.posts-list')
const titleValue = document.getElementById('title-value')
const bodyValue = document.getElementById('body-value')

const btnSubmit = document.querySelector('.btn')


const addPostForm = document.querySelector('.add-post-form')
const renderPost = (posts) => {
    posts.forEach(post => {
        output += `
         <div class="card mt-4 col-md-6 bg-light" >
             <div class="card-body" data-id = ${post._id}>
                 <h5 class="card-title">${post.title}</h5>
                 <h6 class="card-subtitle mb-2 text-body-secondary">${post.date}</h6>
                 <p class="card-text">${post.body}</p>
                 <a href="#" class="card-link" id = "edit-post">Edit</a>
                 <a href="#" class="card-link" id = "delete-post">Delete</a>
               </div>
         </div>
        `
    })
    postList.innerHTML = output
}
let output = ''

const url = 'http://localhost:5000/api/posts'


// get - read post 
// method : get 




fetch(url)
    .then(res => res.json())
    .then(data => {
        renderPost(data);
    })
//  event click 
postList.addEventListener('click', (e) => {
    e.preventDefault();
    let delBtn = e.target.id == 'delete-post';
    let editBtn = e.target.id == 'edit-post';

    let id = e.target.parentElement.dataset.id

    // delete - remove 
    // method delete
    if (delBtn) {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    // edit 
    //  method put . patch 
    if (editBtn) {
        // console.log("edit post")
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent
        let bodyContent = parent.querySelector('.card-text').textContent

        titleValue.value = titleContent
        bodyValue.value = bodyContent


    }
    // update post 
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                body: bodyValue.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())

    })

})
// create - insert new post 
// method - post 
//  event submit 
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value
        })

    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data)
            renderPost(dataArr)
        })
        // reset input field to empty
        titleValue.value =''
        bodyValue.value =''
})