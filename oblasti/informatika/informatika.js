
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
        pitanje: 'HTML的全称是什么？',
        opcije: ['A) Hyper Text Markup Language', 'B) High Tech Modern Language', 'C) Home Tool Markup Language', 'D) Hyperlinks and Text Markup Language'],
        tacanOdgovor: 'A) Hyper Text Markup Language',
        objasnjenje: 'HTML是Hyper Text Markup Language（超文本标记语言）的缩写。它是构建网页的标准标记语言，使用标签来描述网页的结构和内容。'
    },
    2: {
        pitanje: '以下哪个不是编程语言？',
        opcije: ['A) Python', 'B) JavaScript', 'C) Photoshop', 'D) Java'],
        tacanOdgovor: 'C) Photoshop',
        objasnjenje: 'Photoshop是Adobe公司开发的图像处理软件，不是编程语言。Python、JavaScript、Java都是常用的编程语言。'
    },
    3: {
        pitanje: '1GB等于多少MB？',
        opcije: ['A) 100MB', 'B) 512MB', 'C) 1000MB', 'D) 1024MB'],
        tacanOdgovor: 'D) 1024MB',
        objasnjenje: '计算机存储容量采用二进制系统，1GB（千兆字节）等于1024MB（兆字节）。这是因为2的10次方等于1024。同样，1MB=1024KB，1KB=1024字节。'
    },
    4: {
        pitanje: '以下哪个是关系型数据库？',
        opcije: ['A) MongoDB', 'B) Redis', 'C) MySQL', 'D) Cassandra'],
        tacanOdgovor: 'C) MySQL',
        objasnjenje: 'MySQL是关系型数据库管理系统（RDBMS），使用表格来存储数据，支持SQL查询语言。MongoDB、Redis、Cassandra都是非关系型数据库（NoSQL）。'
    },
    5: {
        pitanje: 'API的全称是什么？',
        opcije: ['A) Application Programming Interface', 'B) Advanced Programming Interface', 'C) Automated Process Integration', 'D) Application Process Integration'],
        tacanOdgovor: 'A) Application Programming Interface',
        objasnjenje: 'API是Application Programming Interface（应用程序编程接口）的缩写。它是一组定义好的规则和协议，允许不同的软件应用程序之间进行通信和数据交换。'
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
            {el: drugo, tacno: false},
            {el: trece, tacno: true},
            {el: cetvrto, tacno: false}
        ];
    } else if(pitanje === 3){
        return [
            {el: prvo, tacno: false},
            {el: drugo, tacno: false},
            {el: trece, tacno: false},
            {el: cetvrto, tacno: true}
        ];
    } else if(pitanje === 4){
        return [
            {el: prvo, tacno: false},
            {el: drugo, tacno: false},
            {el: trece, tacno: true},
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
    const data = pitanjaData[pitanjeBroj];
    if (!data) return;

    const pogresnoPitanje = {
        id: `informatika_${pitanjeBroj}_${Date.now()}`,
        kategorija: '计算机',
        pitanje: data.pitanje,
        opcije: data.opcije,
        korisnikovOdgovor: korisnikovOdgovor,
        tacanOdgovor: data.tacanOdgovor,
        objasnjenje: data.objasnjenje,
        vreme: new Date().toISOString()
    };

    let pogresnaPitanja = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
    
    const postojece = pogresnaPitanja.find(p => 
        p.kategorija === '计算机' && p.pitanje === data.pitanje
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