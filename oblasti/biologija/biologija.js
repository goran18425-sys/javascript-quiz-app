
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
        pitanje: '人体最大的器官是什么？',
        opcije: ['A) 心脏', 'B) 肝脏', 'C) 皮肤', 'D) 大脑'],
        tacanOdgovor: 'C) 皮肤',
        objasnjenje: '皮肤是人体最大的器官，成年人的皮肤面积约为1.5-2平方米，重量约占体重的16%。皮肤具有保护、调节体温、感知外界刺激等多种功能。'
    },
    2: {
        pitanje: '以下哪种血型被称为"万能供血者"？',
        opcije: ['A) A型', 'B) B型', 'C) O型', 'D) AB型'],
        tacanOdgovor: 'C) O型',
        objasnjenje: 'O型血被称为"万能供血者"，因为O型血的红细胞表面没有A或B抗原，可以输给任何血型的人。而AB型血被称为"万能受血者"，可以接受任何血型的血液。'
    },
    3: {
        pitanje: '光合作用主要发生在植物的哪个部位？',
        opcije: ['A) 根部', 'B) 茎部', 'C) 叶片', 'D) 果实'],
        tacanOdgovor: 'C) 叶片',
        objasnjenje: '光合作用主要发生在植物的叶片中。叶片细胞含有大量的叶绿体，叶绿体中的叶绿素能够吸收光能，将二氧化碳和水转化为有机物（如葡萄糖）和氧气。'
    },
    4: {
        pitanje: '以下哪种是遗传物质？',
        opcije: ['A) 蛋白质', 'B) DNA', 'C) 脂肪', 'D) 碳水化合物'],
        tacanOdgovor: 'B) DNA',
        objasnjenje: 'DNA（脱氧核糖核酸）是生物的主要遗传物质，包含了生物体发育、生长和功能运作所需的遗传信息。DNA分子呈双螺旋结构，由核苷酸组成。'
    },
    5: {
        pitanje: '人体消化食物的主要器官是什么？',
        opcije: ['A) 胃', 'B) 小肠', 'C) 大肠', 'D) 肝脏'],
        tacanOdgovor: 'B) 小肠',
        objasnjenje: '小肠是人体消化食物和吸收营养物质的主要器官。小肠长度约5-6米，内壁有许多皱襞和绒毛，大大增加了吸收面积。食物在小肠中被彻底消化，营养物质被吸收进入血液。'
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
            {el: drugo, tacno: false},
            {el: trece, tacno: true},
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
        id: `biologija_${pitanjeBroj}_${Date.now()}`,
        kategorija: '生物',
        pitanje: data.pitanje,
        opcije: data.opcije,
        korisnikovOdgovor: korisnikovOdgovor,
        tacanOdgovor: data.tacanOdgovor,
        objasnjenje: data.objasnjenje,
        vreme: new Date().toISOString()
    };

    let pogresnaPitanja = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
    
    const postojece = pogresnaPitanja.find(p => 
        p.kategorija === '生物' && p.pitanje === data.pitanje
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