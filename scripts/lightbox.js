/* Map potions */
const lightbox = document.getElementsByClassName('lightbox')[0];
const img = lightbox.getElementsByTagName('img')[0];
const potionsGrid = document.getElementsByClassName('grid')[0];
const close = lightbox.getElementsByClassName('close')[0];


document.addEventListener ('keypress', (event) => {
  const keyName = event.key;
  console.log('keypress event \ n \ n' + 'chave:' + keyName);
});

lightbox.addEventListener('click', e => {
  if(e.target == lightbox) lightbox.style.display = 'none';
})

close.addEventListener('click', () => {
  lightbox.style.display = 'none';
})

async function setPotions(){
  const data = await getPotionData();
  data.forEach(potion => {
    createPotion(potion)
  })
  
  const potions = Array.from(document.getElementsByClassName('potion'));
  potions.forEach(potion => {
    potion.addEventListener('click', async () => {
      const name = potion.getElementsByClassName('name')[0].innerHTML;
      const potion_img = potion.getElementsByTagName('img')[0];
      const data = await getPotion(name);
      handleLightbox(data)
      /* Handle lightbox */
      lightbox.style.display = 'flex';
  
      /* Handle potion within lightbox */
      img.src = potion_img.src;
  
    })
  })  
}

function createPotion(potion){
  const div = createElement(potionsGrid, 'div');
  div.classList.toggle('potion');
  const img = createElement(div, 'img');
  img.src = `./assets/products/${potion.image}`;
  const info = createElement(div, 'div');
  info.classList.toggle('info');
  const spanContent = createElement(info, 'span');
  const name = createElement(spanContent, 'span');
  name.classList.toggle('name');
  name.innerHTML = potion.name;
  spanContent.innerHTML = spanContent.innerHTML + ' - ';
  const price = createElement(spanContent, 'span');
  price.classList.toggle('price');
  price.innerHTML = `$${potion.price}`;
}

async function getPotionData(){
  const response = await fetch('./data/potions.json');
  var potionsData = (await response.json()).potions;
  potionsData = Object.entries(potionsData)
  potionsData = potionsData.map(potions => potions[1])
  return potionsData
}

async function getPotion(name){
  const potionsData = await getPotionData();
  const potionData = potionsData.filter(potionData => potionData.name == name)[0]
  return potionData;
}

function createElement(path, type, content){
  const element = document.createElement(type);
  if(content) element.innerHTML = content;
  path.appendChild(element);
  return element;
}

function handleLightbox(data){
  const name = lightbox.getElementsByClassName('name')[0]
  const useeffect = lightbox.getElementsByClassName('use-effect')[0]
  const ingredients = lightbox.getElementsByClassName('ingredients')[0]
  const price = lightbox.getElementsByClassName('price')[0]
  ingredients.innerHTML = ""

  name.innerHTML = data.name
  useeffect.innerHTML = data.effect
  data.ingredients.forEach(ingredient => {
    createElement(ingredients, 'span', ingredient)
  })
  price.innerHTML = `$${data.price}`;
}


setPotions();