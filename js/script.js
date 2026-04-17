const toggle = document.getElementById("togglePitanja");
const setPitanja = document.getElementById("setPitanja");
const nije_dodato = document.getElementById('nije_dodato');

nije_dodato.style.animation = 'none';


toggle.addEventListener("click", () => {
    setPitanja.classList.toggle("show");
    toggle.style.display = 'none';
    
});

izaberiKategoriju = (element, kategorija) => {
    const dostupneKategorije = {
        'istorija': '历史',
        'geografija': '地理'
    };
    
    if (dostupneKategorije[kategorija]) {
        window.location.href = `oblasti/${kategorija}/${kategorija}.html`;
    } else {
        const kategorijaNazivi = {
            'hemija': '化学',
            'fizika': '物理',
            'knjizevnost': '文学',
            'biologija': '生物',
            'sociologija': '社会学',
            'informatika': '计算机',
            'engleski': '英语'
        };
        
        const naziv = kategorijaNazivi[kategorija] || kategorija;
        nije_dodato.innerText = `${naziv}分类的测验即将推出！`;
        
        nije_dodato.style.animation = 'none';      
        void nije_dodato.offsetWidth;   
        nije_dodato.style.animation =  'shake 1s 1';
    }
}

const zatvoriSet = () => {
    setPitanja.classList.toggle("show");
    toggle.style.display = 'block';
    nije_dodato.innerText = ''

}