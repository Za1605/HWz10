//В index.html
//1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
//2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
//3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули


fetch('http://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => {
        const block = document.getElementsByClassName('wrap')[0];
        for (const user of users) {
            const user_block = document.createElement('div');
            user_block.innerText = `${user.id} ${user.name}`;
            block.appendChild(user_block);

            const button = document.createElement('button');
            button.innerText = 'more info';
            user_block.appendChild(button);

            button.onclick = () => {
                location.href = `user-details.html?userId=${user.id}`;
            }
        }
    })

if fileName === ('us-details.html'){
    const userId = new URL(location.href).searchParams.get('userId');

    fetch(`http://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => res.json())
        .then((user) => {
            console.log(user)
            const block = document.getElementsByClassName('wrap')[0];
            const ul = document.createElement('ul');
            recursiveBuild(user, ul);
            block.appendChild(ul);
        });

    function liCreator(key, value, parent) {
        const li = document.createElement('li');
        li.innerHTML = `<b>${key}:</b> ${value}`;
        parent.appendChild(li);
    }

    function ulBuilder(key, object, parent) {
        const li = document.createElement('li');
        const ul = document.createElement('ul');
        li.innerHTML = `<b>${key}:</b>`;
        parent.appendChild(li);
        li.appendChild(ul);
        recursiveBuild(object, ul);
    }

    function recursiveBuild(object, parent) {
        for (const key in object) {
            typeof object[key] === 'object'
                ? ulBuilder(key, object[key], parent)
                : liCreator(key, object[key], parent)
        }
    }
}

if fileName === ('post details'){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(response => response.json())
        .then(post => {
             let postss = document.createElement('div');
            for (const post of posts) {
                {
                    if (title === postEl.title){
                        let postAll = document.createElement('div')
                        postAll.classList.add('postss')
                        let ul = document.createElement('ul');
                        for (const key in postEl) {
                           let li = document.createElement('li')
                           li.innerHTML =  `<b>${key}:</b>  ${postEl[key]}`
                            li.classList.add('li_user')
                            ul.append(li)
                        }
                     postAll.append(ul)
                      document.body.append(postss)
                    }
                }
            }

        }
}
