const sectionResult = document.querySelector('.main-shorten');
const form = document.querySelector('.main-shorten-form');
const inputURL = document.querySelector('.main-shorten-form input');

const baseURL = 'https://rel.ink/api/links/';

form.addEventListener('submit', shortenURL);

function shortenURL(e) {
    e.preventDefault();

    if (!inputURL.value) {
        inputURL.parentNode.classList.add('error-input__empty');
    } else {
        inputURL.parentNode.classList.remove('error-input__empty');
        inputURL.value = '';

        fetch(baseURL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: `${inputURL.value}`
            })
        })
        .then(res => {
            return res.json();
        })
        .then(resJson => {
            displayResults(resJson.hashid);
        });        
    };
}

function displayResults(hashid) {
    let resultCard = document.createElement('section');
    resultCard.classList.add('main-shorten-result');
    resultCard.innerHTML = `
    <div class="main-shorten-result-origin">
      <p>${inputURL.value}</p>
    </div>
    <div class="main-shorten-result-final">
      <a href='https://rel.ink/${hashid}'>
        https://rel.ink/${hashid}
      </a>
      <button>Copy</button>
    </div>
    `;
    sectionResult.appendChild(resultCard);
    
    let btn = resultCard.querySelector('button');
    btn.addEventListener('click', function copyURL() {
        let resultURL = `https://rel.ink/${hashid}`;
        navigator.clipboard.writeText(resultURL)
        .then(function btnCopied() {
            btn.innerText = 'Copied!';
            btn.style.backgroundColor = 'hsl(257, 27%, 26%)';             
        })
    });
}