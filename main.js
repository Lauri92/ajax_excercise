'use strict';

const form = document.querySelector('#search-form');
const input = document.querySelector('[name=search-field]');
let body = document.querySelector('body');

const doFetch = async (input) => {
  const response = await fetch('http://api.tvmaze.com/search/shows?q=' + input);
  const data = await response.json();
  console.log(data);
  console.log(data.length);

  for (let i = 0; i < data.length; i++) {
    let div = document.createElement('div');
    let name = document.createElement('h1');
    let link = document.createElement('a');
    let summary = document.createElement('p');
    let img = document.createElement('img');

    name.innerHTML = data[i].show.name;

    if (data[i].show.officialSite !== null) {
      link.innerHTML = data[i].show.officialSite;
      link.href = data[i].show.officialSite;
    } else {
      link.innerHTML = 'No website :(';
      link.style.fontStyle = 'italic';
    }
    summary.innerHTML = data[i].show.summary;
    if (data[i].show.image !== null) {
      img.src = data[i].show.image.medium;
    } else {
      img.alt = 'no img';
    }
    div.appendChild(name);
    div.appendChild(link);
    div.appendChild(summary);
    div.appendChild(img);
    body.appendChild(div);

  }

};

form.addEventListener('submit', (evt) => {
  evt.preventDefault(); //No reloading of the page
  console.log(input.value);
  let divs = document.querySelectorAll('div');

  //Clear previous results if they exist
  if (divs.length !== 0) {
    for (let i = 0; i < divs.length; i++) {
      divs[i].parentNode.removeChild(divs[i]);
    }
    //console.log(`Removed ${divs.length} element(s).`);
    console.log(`Removed ${divs.length === 1 ? '1 element' : `${divs.length} elements`} `);
  }
  doFetch(input.value);
});