/* Script to manipulate menu */
const ham_icon = document.getElementsByClassName('ham')[0];
const menu = document.getElementById('menu');
const search_box = document.getElementsByClassName('search-box')[0];

ham_icon.addEventListener('click', () => {
  /* Handle Hamburguer Icon */
  ham_icon.classList.toggle('fa-bars');
  ham_icon.classList.toggle('fa-times');

  if(ham_icon.classList.contains('fa-times')){
    ham_icon.style.position = 'fixed';
    ham_icon.style.left = '27px';
  }else{
    ham_icon.style.position = 'relative';
    ham_icon.style.left = '0px';
  }

  /* Handle Menu */
  menu.classList.toggle('desktop');

  /* Handle Search Box */
  search_box.classList.toggle('desktop');
})