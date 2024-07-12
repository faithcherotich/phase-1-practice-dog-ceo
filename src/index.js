 console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedsUrl = "https://dog.ceo/api/breeds/list/all";
let allBreeds = {};
const fetchAndDisplayImages = () => {
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        const imageContainer = document.getElementById("dog-image-container");
        imageContainer.innerHTML = ''; 
  
        data.message.forEach(imgUrl => {
          const imgElement = document.createElement('img');
          imgElement.src = imgUrl;
          imgElement.alt = 'Random Dog';
          imgElement.style.width = '200px';
          imgElement.style.margin = '10px';
  
          imageContainer.appendChild(imgElement);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  };
  
  
  const displayBreeds = (breeds) => {
    const breedsList = document.getElementById("dog-breeds");
    breedsList.innerHTML = ''; 
  
    for (const breed in breeds) {
      const breedItem = document.createElement('li');
      breedItem.innerText = breed;
  
      
      breedItem.addEventListener('click', () => {
        breedItem.style.color = 'blue'; 
      });
  
      breedsList.appendChild(breedItem);
    }
  };
  
 
  const fetchAndDisplayBreeds = () => {
    fetch(breedsUrl)
      .then(response => response.json())
      .then(data => {
        allBreeds = data.message;
        displayBreeds(allBreeds);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  };
  
  
  const filterBreeds = (letter) => {
    const filteredBreeds = {};
    for (const breed in allBreeds) {
      if (letter === 'all' || breed.startsWith(letter)) {
        filteredBreeds[breed] = allBreeds[breed];
      }
    }
    displayBreeds(filteredBreeds);
  };
  
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayImages();
    fetchAndDisplayBreeds();
    
   
    const breedFilter = document.getElementById('breed-filter');
    breedFilter.addEventListener('change', (event) => {
      filterBreeds(event.target.value);
    });
  });