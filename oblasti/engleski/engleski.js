
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
        pitanje: 'She ___ to school every day.',
        opcije: ['A) go', 'B) goes', 'C) going', 'D) went'],
        tacanOdgovor: 'B) goes',
        objasnjenje: '这是一般现在时，主语是第三人称单数she，动词需要用第三人称单数形式goes。go用于第一、二人称和复数主语，going是现在分词，went是过去式。'
    },
    2: {
        pitanje: '"Beautiful"的反义词是什么？',
        opcije: ['A) Pretty', 'B) Handsome', 'C) Ugly', 'D) Nice'],
        tacanOdgovor: 'C) Ugly',
        objasnjenje: 'Beautiful（美丽的）的反义词是ugly（丑陋的）。pretty（漂亮的）、handsome（英俊的）、nice（好的）都是近义词或褒义词。'
    },
    3: {
        pitanje: '选择正确的句子：',
        opcije: ['A) She don\'t like apples.', 'B) She doesn\'t likes apples.', 'C) She doesn\'t like apples.', 'D) She not like apples.'],
        tacanOdgovor: 'C) She doesn\'t like apples.',
        objasnjenje: '一般现在时的否定句，主语是第三人称单数she时，要用doesn\'t + 动词原形。正确形式是She doesn\'t like apples。其他选项错误：don\'t用于非第三人称单数，doesn\'t后不应加s，不能直接用not。'
    },
    4: {
        pitanje: '"I have been studying English for 5 years." 这句话是什么时态？',
        opcije: ['A) 现在完成时', 'B) 现在完成进行时', 'C) 过去完成时', 'D) 一般现在时'],
        tacanOdgovor: 'B) 现在完成进行时',
        objasnjenje: '现在完成进行时的结构是have/has been + 现在分词，表示动作从过去开始一直持续到现在，可能还会继续下去。现在完成时是have/has + 过去分词，强调结果。'
    },
    5: {
        pitanje: '选择正确的问句形式：',
        opcije: ['A) Where you go yesterday?', 'B) Where did you went yesterday?', 'C) Where did you go yesterday?', 'D) Where you went yesterday?'],
        tacanOdgovor: 'C) Where did you go yesterday?',
        objasnjenje: '一般过去时的特殊疑问句结构是：疑问词 + did + 主语 + 动词原形 + 其他？yesterday是过去时间状语，要用过去时。正确形式是Where did you go yesterday？其他选项错误：缺少助动词，或动词形式错误。'
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
            {el: prvo, tacno: false},
            {el: drugo, tacno: true},
            {el: trece, tacno: false},
            {el: cetvrto, tacno: false}
        ];
    } else if(pitanje === 2){
        return [
            {el: prvo, tacno: false},
            {el: drugo, tacno: false},
            {el: trece, tacno: true},
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
            {el: drugo, tacno: false},
            {el: trece, tacno: true},
            {el: cetvrto, tacno: false}
        ];
    }
}

const snimiPogresnoPitanje = (pitanjeBroj, korisnikovOdgovor) => {
    const data = pitanjaData[pitanjeBroj];
    if (!data) return;

    const pogresnoPitanje = {
        id: `engleski_${pitanjeBroj}_${Date.now()}`,
        kategorija: '英语',
        pitanje: data.pitanje,
        opcije: data.opcije,
        korisnikovOdgovor: korisnikovOdgovor,
        tacanOdgovor: data.tacanOdgovor,
        objasnjenje: data.objasnjenje,
        vreme: new Date().toISOString()
    };

    let pogresnaPitanja = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
    
    const postojece = pogresnaPitanja.find(p => 
        p.kategorija === '英语' && p.pitanje === data.pitanje
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