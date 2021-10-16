const themeswitch = document.querySelector('.theme-switch')
const themeColor = localStorage.getItem('theme')
const themeIcon = document.getElementById('theme-icon')
const navList = document.querySelector('.close')
document.cookie = "HttpOnly;SameSite=None,Secure";

if (!themeColor) {
    document.documentElement.setAttribute('theme', 'light')
} else if (themeColor == "dark") {
    themeIcon.classList.replace('fa-moon', 'fa-sun')
    document.documentElement.setAttribute('theme', 'dark')
}

$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
        
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
  
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
});


themeswitch.addEventListener('click', function () {

    const theme = localStorage.getItem('theme')
    if (theme == 'light') {
        themeIcon.classList.replace('fa-moon', 'fa-sun')
        document.documentElement.setAttribute('theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon')
        document.documentElement.setAttribute('theme', 'light')
        localStorage.setItem('theme', 'light')
    }
})

document.addEventListener('click', async function (el) {
    if (el.target.classList.contains('chara-img')) {
        const charaDetail = document.querySelector('.chara-detail')
        const modalTitle = document.querySelector('.modal-title')
        const detail = await getDetail(el.target.id)
        modalTitle.innerHTML = `<img class="element-img" src="https://api.genshin.dev/elements/${detail.vision.toLowerCase()}/icon"> ${detail.name}`
        charaDetail.innerHTML = newCard(detail,el.target.id)
    }

    if(el.target.classList.contains('fa-bars') || el.target.classList.contains('nav-items')) {
        navList.classList.toggle('slide')
    }
})

function getDetail(chara) {
    return fetch(`https://api.genshin.dev/characters/${chara}`)
            .then(response => response.json())
}

function getImage(chara) {
    return fetch(`https://api.genshin.dev/characters/${chara}/card`)
}

function newCard(chara,name) {
    return `<div class="row">
                <div class="col-md-5">
                    <img class="modal-img ms-3" src="https://api.genshin.dev/characters/${name}/card">
                </div>
                <div class="col-md-7">
                <table class="table">
                    <tr>
                        <td>Vision</td>
                        <td>${chara.vision}</td>
                    </tr>
                    <tr>
                        <td>Weapon</td>
                        <td>${chara.weapon}</td>
                    </tr>
                    <tr>
                        <td>Nation</td>
                        <td>${chara.nation}</td>
                    </tr>
                    <tr>
                        <td>Affiliation</td>
                        <td>${chara.affiliation}</td>
                    </tr>
                    <tr>
                        <td>Elemental Skill</td>
                        <td>${chara.skillTalents[1].name}</td>
                    </tr>
                    <tr>
                        <td>Elemental Burst</td>
                        <td>${chara.skillTalents[2].name}</td>
                    </tr>
                    <tr>
                        <td>Rarity</td>
                        <td>${rarityCount(chara)}</td>
                    </tr>
                </table>
                <p>${chara.description}</p>
                </div>
            </div>`
}

function rarityCount(chara) {
    let star = ''
    for(i=0; i<chara.rarity; i++) {
        star += `<div class="sea_char_stars_wrap"><svg class="sea_char_stars" width="30" height="30"><path d="M 15.000 21.000 L 22.053 24.708 L 20.706 16.854 L 26.413 11.292 L 18.527 10.146 L 15.000 3.000 L 11.473 10.146 L 3.587 11.292 L 9.294 16.854 L 7.947 24.708 L 15.000 21.000" stroke="#000" stroke-width="1" fill="yellow"></path></svg></div>`
    }
    return star
}