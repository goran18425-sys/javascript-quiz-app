
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
    if(pitanje === 1){
        naslov.innerText = `${pitanje}. 哪个国家是世界上面积最大的国家？`;
        prvo_tekst.innerText ='A) 中国';
        drugo_tekst.innerText = 'B) 加拿大';
        trece_tekst.innerText = 'C) 俄罗斯';
        cetvrto_tekst.innerText = 'D) 美国';

    } else if(pitanje === 2){
        naslov.innerText = `${pitanje}. 哪条河流是世界上最长的河流？`;
        prvo_tekst.innerText = 'A) 尼罗河';
        drugo_tekst.innerText = 'B) 亚马逊河';
        trece_tekst.innerText = 'C) 密西西比河';
        cetvrto_tekst.innerText = 'D) 长江';
    } else if(pitanje === 3){
        naslov.innerText = `${pitanje}. 哪座山峰是世界上最高的山峰？`;
        prvo_tekst.innerText = 'A) K2';
        drugo_tekst.innerText = 'B) 干城章嘉峰';
        trece_tekst.innerText = 'C) 珠穆朗玛峰';
        cetvrto_tekst.innerText = 'D) 洛子峰';
    } else if(pitanje === 4){
        naslov.innerText = `${pitanje}. 哪个大洋是世界上面积最大的大洋？`;
        prvo_tekst.innerText = 'A) 大西洋';
        drugo_tekst.innerText = 'B) 太平洋';
        trece_tekst.innerText = 'C) 印度洋';
        cetvrto_tekst.innerText = 'D) 北冰洋';
    } else if(pitanje === 5){
        naslov.innerText = `${pitanje}. 哪个国家是世界上人口最多的国家？`;
        prvo_tekst.innerText = 'A) 印度';
        drugo_tekst.innerText = 'B) 中国';
        trece_tekst.innerText = 'C) 美国';
        cetvrto_tekst.innerText = 'D) 印度尼西亚';
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

const snimiPogresnoPitanje = (pitanjeBroj, korisnikovOdgovor) => {
    const pitanjaData = {
        1: {
            pitanje: '哪个国家是世界上面积最大的国家？',
            opcije: ['A) 中国', 'B) 加拿大', 'C) 俄罗斯', 'D) 美国'],
            tacanOdgovor: 'C) 俄罗斯'
        },
        2: {
            pitanje: '哪条河流是世界上最长的河流？',
            opcije: ['A) 尼罗河', 'B) 亚马逊河', 'C) 密西西比河', 'D) 长江'],
            tacanOdgovor: 'A) 尼罗河'
        },
        3: {
            pitanje: '哪座山峰是世界上最高的山峰？',
            opcije: ['A) K2', 'B) 干城章嘉峰', 'C) 珠穆朗玛峰', 'D) 洛子峰'],
            tacanOdgovor: 'C) 珠穆朗玛峰'
        },
        4: {
            pitanje: '哪个大洋是世界上面积最大的大洋？',
            opcije: ['A) 大西洋', 'B) 太平洋', 'C) 印度洋', 'D) 北冰洋'],
            tacanOdgovor: 'B) 太平洋'
        },
        5: {
            pitanje: '哪个国家是世界上人口最多的国家？',
            opcije: ['A) 印度', 'B) 中国', 'C) 美国', 'D) 印度尼西亚'],
            tacanOdgovor: 'A) 印度'
        }
    };

    const data = pitanjaData[pitanjeBroj];
    if (!data) return;

    const pogresnoPitanje = {
        id: `geografija_${pitanjeBroj}_${Date.now()}`,
        kategorija: '地理',
        pitanje: data.pitanje,
        opcije: data.opcije,
        korisnikovOdgovor: korisnikovOdgovor,
        tacanOdgovor: data.tacanOdgovor,
        vreme: new Date().toISOString()
    };

    let pogresnaPitanja = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
    
    const postojece = pogresnaPitanja.find(p => 
        p.kategorija === '地理' && p.pitanje === data.pitanje
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

    if(izabrana.tacno){
        tacno_netacno.innerText = `恭喜 ${moj_username}，回答正确！`;
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
        tacno_netacno.innerText = '回答错误！';
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