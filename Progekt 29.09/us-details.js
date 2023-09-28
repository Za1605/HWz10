

let url = new URL(window.location.href)
let split1 = url.pathname.split('/')

let id = new URL(document.URL).searchParams.get('id')
let title = new URL(document.URL).searchParams.get('title')

function  liBuilder(key, value, parent) {
    let li = document.createElement('li')
    li.innerHTML = ` <b>${key}:</b> ${value}`
    parent.append(li)
    li.classList.add('li_user')
}

function ulBuilder(key, object, parent){
    let li = document.createElement('li')
    let ul = document.createElement('ul')
    li.classList.add('li_user')
    parent.append(li)
    li.append(ul)
    recursiveBuild(object, ul)
}

function recursiveBuild(object, parent) {
    for (const key in object) {
        typeof object[key] === 'object' ? ulBuilder(key, object[key], parent) : liBuilder(key, object[key], parent)
    }
}


    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            let main_div_user = document.createElement('div')
            main_div_user.classList.add('main_div_user')
            for (const user of users) {
                let div = document.createElement('div')
                div.classList.add('div_user')
                let {id, name} = user
                let btn = document.createElement('button')
                btn.innerText = 'info User'
                btn.classList.add('btn_users')
                let p = document.createElement('p')
                p.innerText = `ID:${id} 
                 Name: ${name}`
                div.append(p)
                div.classList.add('div_users')
                div.append(btn)
                main_div_user.append(div)
                document.body.append(main_div_user)
                btn.onclick = function (){
                    location.href = `user-details.html?id=${id}`
                }
            }

        })
}


    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(user => {
            let block_info_user = document.createElement('div')
            let div_info_user = document.createElement('div')
            div_info_user.classList.add('div_info_user')
            block_info_user.classList.add('block_info_user')
            let ul = document.createElement('ul')
            let btnPost =  document.createElement('button')
            btnPost.innerText = 'post of current user'
            btnPost.classList.add('btnPost')

            recursiveBuild(user, ul)
            div_info_user.append(ul)
            block_info_user.append(div_info_user, btnPost,)

            btnPost.onclick = function (ev) {
                ev.preventDefault()

                fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                    .then(response => response.json())
                    .then(posts =>{
                        let main_div_post = document.createElement('div')
                        main_div_post.classList.add('main_div_post')
                        for (const postElement of posts) {
                            let divPost = document.createElement('div')
                            divPost.classList.add('divPost')
                            let h2Post = document.createElement('h2')
                            let btnInfoPost = document.createElement('button')
                            btnInfoPost.onclick = function (){
                                location.href = `post-details.html?id=${id}&title=${postElement.title}`
                            }
                            btnInfoPost.innerText = 'Info Post'
                            btnInfoPost.classList.add('btnInfoPost')
                            h2Post.innerText = `${postElement.title}`
                            divPost.append(h2Post, btnInfoPost)
                            main_div_post.append(divPost)

                            document.body.append(main_div_post)
                        }
                        btnPost.setAttribute('disabled', 'disabled');
                    })
                // /users/${id}/posts
            }
            document.body.append(block_info_user)
        })





    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(response => response.json())
        .then(post => {
            let divAllPost = document.createElement('div')
            for (const postElement of post) {
                if (title === postElement.title){
                    let divAllPost = document.createElement('div')
                    divAllPost.classList.add('divAllPost')
                    let ul = document.createElement('ul')
                    for (const key in postElement) {
                        let li = document.createElement('li')
                        li.innerHTML = ` <b>${key}:</b> ${postElement[key]}`
                        li.classList.add('li_user')
                        ul.append(li)
                    }
                    divAllPost.append(ul)
                    document.body.append(divAllPost)
                }
            }
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
                .then((response => response.json()))
                .then(comments =>{
                    let main_comments_post = document.createElement('div')
                    main_comments_post.classList.add('main_comments_post')
                    let comments_post = document.createElement('div')
                    comments_post.classList.add('comments_post')

                    let h1 = document.createElement('h1')
                    h1.innerText = 'Comments Post:'
                    document.body.append(h1)
                    document.body.append(comments_post)
                    for (const element of comments) {
                        let divComments = document.createElement('div')
                        let ul = document.createElement('ul')
                        divComments.classList.add('divComments')
                        for (const key in element) {

                            let li = document.createElement('li')
                            li.classList.add('li_user')
                            li.innerHTML = `<b>${key}</b>: ${element[key]}`
                            ul.append(li)
                            divComments.append(ul)
                        }
                        main_comments_post.append(divComments)
                        document.body.append(main_comments_post)
                    }

                } )

        })

