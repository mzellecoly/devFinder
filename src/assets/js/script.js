// Script Login
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
// Fin Script Login


// const categoryTitle = document.querySelectorAll('.category-title');
// const allCategoryPosts = document.querySelectorAll('.all');

// for(let i = 0; i < categoryTitle.length; i++){
//     categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));
// }

// function filterPosts(item){
//     changeActivePosition(item);
//     for(let i = 0; i < allCategoryPosts.length; i++){
//         if(allCategoryPosts[i].classList.contains(item.attributes.id.value)){
//             allCategoryPosts[i].style.display = "block";
//         } else {
//             allCategoryPosts[i].style.display = "none";
//         }
//     }
// }

// function changeActivePosition(activeItem){
//     for(let i = 0; i < categoryTitle.length; i++){
//         categoryTitle[i].classList.remove('active');
//     }
//     activeItem.classList.add('active');
// };
