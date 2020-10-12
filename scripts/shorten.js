const sectionResult = document.querySelector('.main-shorten');
const form = document.querySelector('.main-shorten-form');
const inputURL = document.querySelector('.main-shorten-form-input_wrapper input');
const errorMsg = document.querySelector('.main-shorten-form-input_wrapper p');

const baseURL = 'https://rel.ink/api/links/';

form.addEventListener('submit', shortenURL);

function shortenURL(e) {
    e.preventDefault();

    if (!inputURL.value) {
        inputURL.style.border = '2px solid hsl(0, 87%, 67%)';
        inputURL.style.color = 'hsl(0, 87%, 67%)';
        errorMsg.style.height = '2rem';
        errorMsg.textContent = 'Please enter a link!';
    } else {
        errorMsg.style.height = '1.5rem';
        errorMsg.textContent = '';
        inputURL.style.border = 'none';
        inputURL.style.color = 'unset';

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
        })
        .then( () => {
            inputURL.value = '';
        });
    };
}

function displayResults(hashid) {
    let resultURL = `https://rel.ink/${hashid}`;
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
        navigator.clipboard.writeText(resultURL)
        .then(function btnCopied() {
            btn.innerText = 'Copied!';
            btn.style.backgroundColor = 'hsl(257, 27%, 26%)';             
        });
    });
}