console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener('DOMContentLoaded', () => {
    fetch(imgUrl)
    .then(res => res.json())
    .then(body => renderImages(body.message));

    fetch(breedUrl)
    .then(res => res.json())
    .then(body => {
        displayBreeds(body.message);
        document.querySelector('#breed-dropdown').addEventListener('change', (e) => filterBreedsByLetter(e, body.message))
    })
})

function renderImages(imgArray){
    imgArray.forEach(imgSource => {
        renderImage(imgSource)
    });
}

function renderImage(imgSource){
    const dogImagesContainer = document.querySelector('#dog-image-container');
    const dogImage = document.createElement('img');
    dogImage.src = imgSource;
    dogImagesContainer.appendChild(dogImage);
}

function displayBreeds(breedsObj){
    const breedsList = document.querySelector('#dog-breeds');
    const breedsArray = Object.keys(breedsObj);
    breedsArray.forEach(breed => {
        const breedListElement = document.createElement('li');
        breedListElement.textContent = breed;
        breedListElement.addEventListener('click', e => changeColor(e));
        breedsList.appendChild(breedListElement);
    })
}

function changeColor(event){
    event.target.style.color = '#356e89';
}

function filterBreedsByLetter(event, breedsObj){
    const breedsList = document.querySelector('#dog-breeds');
    while(breedsList.firstChild){
        breedsList.removeChild(breedsList.firstChild);
    }
    const breedsArray = Object.keys(breedsObj);
    
    const filteredBreedsArray = breedsArray.filter(breed => breed[0].toLowerCase() === event.target.value);
    const filteredBreedsObj = {};
    filteredBreedsArray.forEach(breed => filteredBreedsObj[breed] = '');
    displayBreeds(filteredBreedsObj);
}