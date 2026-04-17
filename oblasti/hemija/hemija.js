
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


proveri.innerText = '检查答案';
sledece.innerText = '下一题➜';
let bodovi = 0;
let pitanje = 0;
let tacan_odgovor = 0;
const userValue = username.value;
let moj_username = '';

const pitanjaData = {
    1: {
        pitanje: '水的化学式是什么？',
        opcije: ['A) H₂O', 'B) CO₂', 'C) O₂', 'D) NaCl'],
        tacanOdgovor: 'A) H₂O',
        objasnjenje: '水的化学式是H₂O，表示一个水分子由2个氢原子和1个氧原子组成。CO₂是二氧化碳，O₂是氧气，NaCl是氯化钠（食盐）。'
    },
    2: {
        pitanje: '以下哪种物质是金属？',
        opcije: ['A) 硫', 'B) 铁', 'C) 碳', 'D) 磷'],
        tacanOdgovor: 'B) 铁',
        objasnjenje: '铁是一种金属元素，具有良好的导电性、导热性和延展性。硫、碳、磷都是非金属元素。'
    },
    3: {
        pitanje: '以下哪个是化学变化？',
        opcije: ['A) 冰融化成水', 'B) 酒精挥发', 'C) 铁生锈', 'D) 玻璃破碎'],
        tacanOdgovor: 'C) 铁生锈',
        objasnjenje: '化学变化是指产生新物质的变化。铁生锈时，铁与氧气和水反应生成了新物质——铁锈（氧化铁）。其他选项都是物理变化，没有产生新物质。'
    },
    4: {
        pitanje: '氧气的化学式是什么？',
        opcije: ['A) O', 'B) O₂', 'C) O₃', 'D) H₂O'],
        tacanOdgovor: 'B) O₂',
        objasnjenje: '氧气的化学式是O₂，表示一个氧气分子由2个氧原子组成。O是氧元素符号，O₃是臭氧，H₂O是水。'
    },
    5: {
        pitanje: '以下哪种物质是酸？',
        opcije: ['A) 氢氧化钠', 'B) 盐酸', 'C) 氯化钠', 'D) 氢氧化钙'],
        tacanOdgovor: 'B) 盐酸',
        objasnjenje: '盐酸（HCl）是一种强酸。氢氧化钠（NaOH）和氢氧化钙（Ca(OH)₂）是碱，氯化钠（NaCl）是盐。酸在水溶液中能解离出氢离子（H⁺）。'
    }
};

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
        unesi_username.innerText = '请输入用户名！'
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

    bodovi_tekst.innerText = `分数：${bodovi}`;        
    igrac.innerText = `玩家：${moj_username}`;
    unesi_username.innerText = '';
    
    postaviPitanje();
};



postaviPitanje = () => {
    pitanje++;
    const data = pitanjaData[pitanje];
    if (data) {
        naslov.innerText = `${pitanje}. ${data.pitanje}`;
        prvo_tekst.innerText = data.opcije[0];
        drugo_tekst.innerText = data.opcije[1];
        trece_tekst.innerText = data.opcije[2];
        cetvrto_tekst.innerText = data.opcije[3];
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
            {el: prvo, tacno: true},
            {el: drugo, tacno: false},
            {el: trece, tacno: false},
            {el: cetvrto, tacno: false}
        ];
    } else if(pitanje === 2){
        return [
            {el: prvo, tacno: false},
            {el: drugo, tacno: true},
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
            {el: prvo, tacno: false},
            {el: drugo, tacno: true},
            {el: trece, tacno: false},
            {el: cetvrto, tacno: false}
        ];
    }
}

const snimiPogresnoPitanje = (pitanjeBroj, korisnikovOdgovor) => {
    const data = pitanjaData[pitanjeBroj];
    if (!data) return;

    const pogresnoPitanje = {
        id: `hemija_${pitanjeBroj}_${Date.now()}`,
        kategorija: '化学',
        pitanje: data.pitanje,
        opcije: data.opcije,
        korisnikovOdgovor: korisnikovOdgovor,
        tacanOdgovor: data.tacanOdgovor,
        objasnjenje: data.objasnjenje,
        vreme: new Date().toISOString()
    };

    let pogresnaPitanja = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
    
    const postojece = pogresnaPitanja.find(p => 
        p.kategorija === '化学' && p.pitanje === data.pitanje
    );
    
    if (!postojece) {
        pogresnaPitanja.push(pogresnoPitanje);
        localStorage.setItem('wrongQuestions', JSON.stringify(pogresnaPitanja));
    }
};

proveri.onclick = () => {
    const opcije = getOpcije(pitanje); 
    const izabrana = opcije.find(opt => opt.el.checked);

    if(!izabrana){
        tacno_netacno.style.color = '#374151'
        tacno_netacno.innerText = '请选择一个答案！';
        return;
    }
    
    proveri.style.display = 'none';
    sledece.style.display = 'block';

    const korisnikovOdgovor = izabrana.el.nextElementSibling.innerText;
    const data = pitanjaData[pitanje];

    if(izabrana.tacno){
        tacno_netacno.innerHTML = `恭喜 ${moj_username}，回答正确！<br><span style="font-size: 0.9em; color: var(--tekst_muted);">${data.objasnjenje}</span>`;
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
        tacno_netacno.innerHTML = `回答错误！<br><span style="font-size: 0.9em; color: var(--tekst_muted);">${data.objasnjenje}</span>`;
        tacno_netacno.style.color = '#EF4444';
        
        snimiPogresnoPitanje(pitanje, korisnikovOdgovor);
        
        wrapper.style.animation = 'none';      
        void wrapper.offsetWidth;
        wrapper.style.animation = 'netacanOdgovor 1s 1';
    }
    bodovi_tekst.innerText = `分数：${bodovi}`;

    if(pitanje === 5){
        sledece.innerText = '测验结束';
        sledece.onclick = krajKviza;
    }
};
krajKviza = () => {
    let procenat =  (tacan_odgovor / pitanje) * 100;
    procenat = (procenat.toFixed(2));
    if(bodovi === (pitanje * 10)) {
        naslov.innerHTML = `恭喜 ${moj_username}，测验完成！<br>所有问题都回答正确！<h3>得分：${bodovi}/${pitanje*10}</h3><h3>${procenat}%</h3>`;
    }else if(bodovi === 0){
        naslov.innerHTML = `${moj_username}，测验完成！<br>很遗憾，没有答对任何题目！<h3>得分：${bodovi}/${pitanje*10}</h3><h3>${procenat}%</h3>`;
    }else {
        naslov.innerHTML = `<h2>恭喜 ${moj_username}，测验完成！</h2><h3>得分：${bodovi}/${pitanje*10}</h3><h3>${procenat}%</h3>`;
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
    tacno_netacno.innerHTML = '<a href="../../index.html">⬅返回首页</a>';
    vrati.remove();
}

sledece.onclick = postaviPitanje;

document.querySelectorAll(".klikabilno").forEach(el => {
    el.addEventListener("click", () => {
        document.querySelectorAll('.klikabilno').forEach(l => l.classList.remove('bold'));
        el.classList.add('bold');
    });
});