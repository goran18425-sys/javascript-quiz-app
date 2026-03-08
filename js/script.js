const toggle = document.getElementById("togglePitanja");
const setPitanja = document.getElementById("setPitanja");
const nije_dodato = document.getElementById('nije_dodato');

nije_dodato.style.animation = 'none';


toggle.addEventListener("click", () => {
    setPitanja.classList.toggle("show");
    toggle.style.display = 'none';
    
});

oblast = (dugme) => {
    let ispis = dugme.innerText;
    let poslednje_slovo = ispis.substring(ispis.length - 1);
    console.log(poslednje_slovo);
    if(poslednje_slovo === 'a'){
        ispis_final = ispis.substring(0, ispis.length-1);
        nije_dodato.innerText = `Jos nije dodat kviz iz ${ispis_final}e`;

    }
    if(ispis === 'Engleski'){
        nije_dodato.innerText = `Jos nije dodat kviz iz Engleskog`;
    }else if(ispis === 'Knjizevnost'){
        nije_dodato.innerText = `Jos nije dodat kviz iz Knjizevnosti`;
    }

    nije_dodato.style.animation = 'none';      
    void nije_dodato.offsetWidth;   
    nije_dodato.style.animation =  'shake 1s 1';
}

const zatvoriSet = () => {
    setPitanja.classList.toggle("show");
    toggle.style.display = 'block';
    nije_dodato.innerText = ''

}