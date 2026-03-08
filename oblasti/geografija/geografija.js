
const wrapper = document.getElementById('wrapper')
const pocni_kviz = document.getElementById("pocni_kviz");
const username = document.getElementById('username');
const naslov = document.getElementById('naslov');
const bodovi_tekst = document.getElementById('bodovi');
const prvo = document.getElementById('prvo');
const drugo = document.getElementById('drugo');
const trece = document.getElementById('trece');
const cetvrto = document.getElementById('cetvrto');
const prvo_tekst = document.getElementById('prvo_tekst');
const drugo_tekst = document.getElementById('drugo_tekst');
const trece_tekst = document.getElementById('trece_tekst');
const cetvrto_tekst = document.getElementById('cetvrto_tekst');
const proveri = document.getElementById('proveri');
const sledece = document.getElementById('sledece');
const tacno_netacno = document.getElementById('tacno_netacno');
const vrati = document.getElementById('vrati');
const slicica = document.getElementById('slicica');
const dodatak_bodova = document.getElementById('dodatak_bodova');
const igrac = document.getElementById('igrac');
const unesi_username = document.getElementById('unesi_username');
const timeline_container = document.getElementById('timeline-container');


proveri.innerText = 'Proveri';
sledece.innerText = 'Sledece➜';
let bodovi = 0;
let pitanje = 0;
let tacan_odgovor = 0;
const userValue = username.value;
let moj_username = '';


document.querySelectorAll('.klikabilno').forEach(el => {
    el.style.display = 'none';
});

bodovi_tekst.style.display = 'none';
igrac.style.display = 'none';
timeline_container.style.display = 'none';


pocni_kviz.onclick = () => {
    const inputUsername = username.value.trim();
    if(!inputUsername){ 
        unesi_username.style.animation = 'none';      
        void unesi_username.offsetWidth;             
        unesi_username.style.animation = 'shake 1s 1';
        unesi_username.innerText = 'Morate uneti username!'
        return;     
    }
    moj_username = inputUsername; 
    username.remove(); 
    pocni_kviz.remove(); 
    slicica.remove();
    document.querySelectorAll('.klikabilno').forEach(el => {
        el.style.display = 'flex';
    });
    timeline_container.style.display = 'flex';
    proveri.style.display = 'block';
    bodovi_tekst.style.display = 'flex';
    igrac.style.display = 'flex';
    slicica.style.margin ='10px auto';

    bodovi_tekst.innerText = `Bodovi: ${bodovi}`;        
    igrac.innerText = `Igrac : ${moj_username}`;
    unesi_username.innerText = '';
    
    postaviPitanje();
};



postaviPitanje = () => {
    pitanje++;
    if(pitanje === 1){
        naslov.innerText = `${pitanje}. Koja je najveća država na svetu po površini?`;
        prvo_tekst.innerText ='A) Kina';
        drugo_tekst.innerText = 'B) Kanada';
        trece_tekst.innerText = 'C) Rusija';
        cetvrto_tekst.innerText = 'D) SAD';

    } else if(pitanje === 2){
        naslov.innerText = `${pitanje}. Koja reka je najduža na svetu?`;
        prvo_tekst.innerText = 'A) Nil';
        drugo_tekst.innerText = 'B) Amazonska';
        trece_tekst.innerText = 'C) Misisipi';
        cetvrto_tekst.innerText = 'D) Jangce';
    } else if(pitanje === 3){
        naslov.innerText = `${pitanje}. Koja planina je najviša na svetu?`;
        prvo_tekst.innerText = 'A) K2';
        drugo_tekst.innerText = 'B) Kangchenjunga';
        trece_tekst.innerText = 'C) Mount Everest';
        cetvrto_tekst.innerText = 'D) Lhotse';
    } else if(pitanje === 4){
        naslov.innerText = `${pitanje}. Koji okean je najveći po površini?`;
        prvo_tekst.innerText = 'A) Atlantski';
        drugo_tekst.innerText = 'B) Tihi';
        trece_tekst.innerText = 'C) Indijski';
        cetvrto_tekst.innerText = 'D) Severni ledeni';
    } else if(pitanje === 5){
        naslov.innerText = `${pitanje}. Koja država ima najviše stanovnika?`;
        prvo_tekst.innerText = 'A) Indija';
        drugo_tekst.innerText = 'B) Kina ';
        trece_tekst.innerText = 'C) SAD';
        cetvrto_tekst.innerText = 'D) Indonezija';
    }
    [prvo, drugo, trece, cetvrto].forEach(r => r.checked = false);
    document.querySelectorAll('.klikabilno').forEach(l => l.classList.remove('bold'));
    tacno_netacno.innerText = '';
    sledece.style.display = 'none';
    proveri.style.display = 'block';


    updateTimeline(pitanje);

}



const timeline = document.getElementById('timeline');
const ukupnaPitanja = 5; 

updateTimeline = (pitanje) => {
    const procent = (pitanje / ukupnaPitanja) * 100; 
    timeline.style.width = procent + '%';        
}

getOpcije = (pitanje) => {
    if(pitanje === 1){
        return [
            {el: prvo, tacno: false},
            {el: drugo, tacno: false},
            {el: trece, tacno: true},
            {el: cetvrto, tacno: false}
        ];
    } else if(pitanje === 2){
        return [
            {el: prvo, tacno: true},
            {el: drugo, tacno: false},
            {el: trece, tacno: false},
            {el: cetvrto, tacno: false}
        ];
    } else if(pitanje === 3){
        return [
            {el: prvo, tacno: false},
            {el: drugo, tacno: false},
            {el: trece, tacno: true},
            {el: cetvrto, tacno: false}
        ];
    } else if(pitanje === 4){
        return [
            {el: prvo, tacno: false},
            {el: drugo, tacno: true},
            {el: trece, tacno: false},
            {el: cetvrto, tacno: false}
        ];
    } else if(pitanje === 5){
        return [
            {el: prvo, tacno: true},
            {el: drugo, tacno: false},
            {el: trece, tacno: false},
            {el: cetvrto, tacno: false}
        ];
    }
}

proveri.onclick = () => {
    const opcije = getOpcije(pitanje); 
    const izabrana = opcije.find(opt => opt.el.checked);

    if(!izabrana){
        tacno_netacno.style.color = '#374151'
        tacno_netacno.innerText = 'Morate nešto da izaberete!';
        return;
    }
    
    proveri.style.display = 'none';
    sledece.style.display = 'block';

    if(izabrana.tacno){
        tacno_netacno.innerText = `Bravo ${moj_username} tacan odgovor!`;
        tacno_netacno.style.color = '#22C55E';
        bodovi += 10;
        
        dodatak_bodova.style.animation = 'none';      
        void dodatak_bodova.offsetWidth;
        dodatak_bodova.style.animation = 'bodoviIzlaz 2s ease-in-out 1';
        
        wrapper.style.animation = 'none';      
        void wrapper.offsetWidth;
        wrapper.style.animation = 'tacanOdgovor 1s 1';
        tacan_odgovor ++;
    } else {
        tacno_netacno.innerText = 'Netacan odgovor!';
        tacno_netacno.style.color = '#EF4444';
        
        wrapper.style.animation = 'none';      
        void wrapper.offsetWidth;
        wrapper.style.animation = 'netacanOdgovor 1s 1';
    }
    bodovi_tekst.innerText = `Bodovi: ${bodovi}`;

    if(pitanje === 5){
        sledece.innerText = 'Kraj kviza';
        sledece.onclick = krajKviza;
    }
};
krajKviza = () => {
    let procenat =  (tacan_odgovor / pitanje) * 100;
    procenat = (procenat.toFixed(2));
    if(bodovi === (pitanje * 10)) {
        naslov.innerHTML = `Cestitam ${moj_username} kviz je završen!<br>Na sva pitanja ste dali tacan odgovor!<h3>Broj bodova: ${bodovi}/${pitanje*10}</h3><h3>${procenat}%</h3>`;
    }else if(bodovi === 0){
        naslov.innerHTML = `${moj_username} kviz je završen!<br>Ni na jedno pitanje niste dali tacan odgovor!<h3>Broj bodova: ${bodovi}/${pitanje*10}</h3><h3>${procenat}%</h3>`;
    }else {
        naslov.innerHTML = `<h2>Cestitam ${moj_username} kviz je završen!</h2><h3>Broj bodova: ${bodovi}/${pitanje*10}</h3><h3>${procenat}%</h3>`;
    }
    
    
    [prvo_tekst, drugo_tekst, trece_tekst, cetvrto_tekst].forEach(el => el.innerText = '');
    document.querySelectorAll('.klikabilno').forEach(el => {
        el.style.display = 'none';
    });
    proveri.style.display = 'none';
    sledece.style.display = 'none';
    bodovi_tekst.style.display = 'none'
    igrac.style.display = 'none';
    timeline_container.style.display = 'none';


    tacno_netacno.style.color = '#111827'
    tacno_netacno.innerHTML = '<a href="../../index.html">⬅Vrati se na pocetnu</a>';
    vrati.remove();
}

sledece.onclick = postaviPitanje;

document.querySelectorAll(".klikabilno").forEach(el => {
    el.addEventListener("click", () => {
        document.querySelectorAll('.klikabilno').forEach(l => l.classList.remove('bold'));
        el.classList.add('bold');
    });
});