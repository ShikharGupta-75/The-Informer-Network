
const home = document.getElementById('home');
const logo = document.getElementById('logo');
const newsContainer1 = document.getElementById('top-news-container1');
const newsContainer2 = document.getElementById('top-news-container2');
const categoryContainer = document.getElementById('category-container');
const apiKey = '<ENTER YOUR API KEY>';
const constUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
const inputKeyword = document.getElementById('inputKeyword');
const submitKeyword = document.getElementById('submitKeyword');


home.addEventListener('click', () => {
    displayTopNews(constUrl);
})
logo.addEventListener('click', () => {
    displayTopNews(constUrl);
})


async function fetchNews(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.articles;
        }
        else {
            newsContainer1.innerHTML = `<p>Failed to load news</p>`;
            newsContainer2.innerHTML = `<p>Failed to load news</p>`;
            categoryContainer.innerHTML = `<p>Failed to load news</p>`;
        }
        throw Error('News not loded!!!')
    }
    catch (error) {
        console.error(error);
    }
};

async function displayTopNews(Url) {
    newsContainer1.innerHTML = '';
    newsContainer2.innerHTML = '';

    let articles = await fetchNews(Url);
    let i = 0;

    articles.forEach(article => {
        console.log(article.title);
        const newsItem = document.createElement('div');
        newsItem.classList.add('newsItem', 'col-12', 'mx-auto', 'my-1', 'p-3');

        if (articles.length === 0) {
            newsContainer1.innerHTML = '<p>Try using another keyword.</p>';
            return;
        }

        newsItem.innerHTML =
            `<img src=${article.urlToImage} alt="News Image" class="newsImage ml-0">
            <div class="">
            <p class="small font-italic">${new Date(article.publishedAt)}</p>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank" class="btn btn-outline-primary px-3 py-1">Read More</a>
        </div>
        <div class="w-100 mt-3" style="height: 2px; background-color:#b49898;"></div>
`

        if (article.urlToImage) {
            if (i % 2 == 0) {
                newsContainer1.appendChild(newsItem);
            }
            else {
                newsContainer2.appendChild(newsItem);
            }
        }
        i++;
    });
}

async function displayCategories() {

    categoryContainer.innerHTML = '';

    let categoryArray = ['Finance', 'Politics', 'Entertainment', 'Sports', 'Crime', 'Business', 'technology', 'lifestyle', 'Health', 'Education']
    let categories = await fetchNews(constUrl);

    while (categoryArray.length > 0) {
        let indexNumber = Math.floor(Math.random() * categoryArray.length);
        let category = categoryArray[indexNumber];
        categoryArray.splice(indexNumber, 1);
        console.log(category);

        let categoryUrl = `https://newsapi.org/v2/everything?q=${category.toLowerCase()}&pageSize=1&apiKey=${apiKey}`;

        try {
            let categoryItems = await fetchNews(categoryUrl);
            categoryItems.forEach(item => {
                let itemUrl = item.url;
                let itemImg = item.urlToImage;
                let itemDate = new Date(item.publishedAt);
                let itemTitle = item.title;

                const categoryCard = document.createElement('div');
                categoryCard.classList.add('categoryCard', 'col-12', 'mx-0', 'my-2', 'p-1', 'bg-light', 'rounded');
                categoryCard.setAttribute('id', `${category}`)
                categoryCard.innerHTML =
                    `
                      <a class="row col-12" href='#top-news-container1'><img src="${itemImg}" class="categoryImg h-auto">
                    <div class="categoryText">
                        <p class="m-1 text-danger font-weight-bold">${category}</p>
                        <p class="m-1">${itemTitle}</p>
                        <p class="m-1 small font-italic">${itemDate}</p>
                    </div><a>`

                    categoryCard.addEventListener('click', () => {
                        let userUrl = `https://newsapi.org/v2/everything?q=${categoryCard.id}&pageSize=10&apiKey=${apiKey}`
                
                        displayTopNews(userUrl);
                    })

                categoryContainer.appendChild(categoryCard);
            });
        }
        catch (error) {
            console.error(error);
        }
    }

}

async function displayTopicNews()
{
    let topic1 = document.getElementById('topic-1');
    topic1.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic1.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayTopNews(topicUrl);
    })
    let topic2 = document.getElementById("topic-2");
    topic2.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic2.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayTopNews(topicUrl);
    })
    let topic3 = document.getElementById("topic-3");
    topic3.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic3.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayTopNews(topicUrl);
    })
    let topic4 = document.getElementById("topic-4");
    topic4.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic4.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayTopNews(topicUrl);
    })
    let topic5 = document.getElementById("topic-5");
    topic5.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic5.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayTopNews(topicUrl);
    })
}

document.addEventListener('DOMContentLoaded', () => {

    displayTopNews(constUrl);

    submitKeyword.addEventListener('click', () => {
        if(inputKeyword.value.length > 0){
            let userUrl = `https://newsapi.org/v2/everything?q=${inputKeyword.value}&pageSize=10&apiKey=${apiKey}`;
            if(userUrl.length === 0){
                displayTopNews(constUrl);
                return;
            }
            displayTopNews(userUrl);
        }
    });

    inputKeyword.addEventListener('keypress', (event)=> {
        if(event.key === "Enter"){
            let userUrl=`https://newsapi.org/v2/everything?q=${inputKeyword.value.toLowerCase()}&pageSize=100&apiKey=${apiKey}`;
            if(inputKeyword.value.length){
                displayTopNews(userUrl);
            }
        }
    })
    
    displayCategories();

    
    displayTopicNews();

});
