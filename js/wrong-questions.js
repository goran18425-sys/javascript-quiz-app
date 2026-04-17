let pogresnaPitanja = [];
let trenutnoPitanjeIndeks = 0;
let odabranaOpcija = null;

const ucitajPogresnaPitanja = () => {
    pogresnaPitanja = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
    return pogresnaPitanja;
};

const prikaziPogresnaPitanja = () => {
    const lista = document.getElementById('wrong-questions-list');
    const brojac = document.getElementById('wrong-questions-count');
    const practiceBtn = document.getElementById('practice-btn');
    const clearBtn = document.getElementById('clear-btn');
    
    ucitajPogresnaPitanja();
    
    brojac.textContent = `共 ${pogresnaPitanja.length} 道错题`;
    
    if (pogresnaPitanja.length === 0) {
        lista.innerHTML = `
            <div class="no-wrong-questions">
                <p>🎉 太棒了！</p>
                <p>目前没有错题记录</p>
            </div>
        `;
        practiceBtn.style.display = 'none';
        clearBtn.style.display = 'none';
        return;
    }
    
    practiceBtn.style.display = 'block';
    clearBtn.style.display = 'block';
    
    let html = '';
    pogresnaPitanja.forEach((pitanje, index) => {
        html += `
            <div class="wrong-question-item">
                <h4>${index + 1}. ${pitanje.pitanje}</h4>
                <div class="answer-info user-answer">
                    <strong>❌ 你的答案：</strong>${pitanje.korisnikovOdgovor}
                </div>
                <div class="answer-info correct-answer">
                    <strong>✅ 正确答案：</strong>${pitanje.tacanOdgovor}
                </div>
                <div class="category">
                    <strong>📚 分类：</strong>${pitanje.kategorija}
                </div>
            </div>
        `;
    });
    
    lista.innerHTML = html;
};

const obrisiSveGreske = () => {
    if (pogresnaPitanja.length === 0) {
        alert('没有错题可以清空！');
        return;
    }
    
    if (confirm('确定要清空所有错题吗？此操作无法撤销。')) {
        localStorage.removeItem('wrongQuestions');
        prikaziPogresnaPitanja();
        document.getElementById('practice-mode').style.display = 'none';
    }
};

const pocniVezbu = () => {
    ucitajPogresnaPitanja();
    
    if (pogresnaPitanja.length === 0) {
        alert('没有错题可以练习！');
        return;
    }
    
    trenutnoPitanjeIndeks = 0;
    odabranaOpcija = null;
    
    document.getElementById('wrong-questions-list').style.display = 'none';
    document.getElementById('practice-mode').style.display = 'block';
    document.getElementById('practice-total').textContent = pogresnaPitanja.length;
    
    prikaziTrenutnoPitanje();
};

const prikaziTrenutnoPitanje = () => {
    const pitanje = pogresnaPitanja[trenutnoPitanjeIndeks];
    const container = document.getElementById('practice-question');
    const rezultat = document.getElementById('practice-result');
    const dugmici = document.getElementById('practice-buttons');
    
    document.getElementById('practice-current').textContent = trenutnoPitanjeIndeks + 1;
    
    rezultat.style.display = 'none';
    dugmici.style.display = 'none';
    odabranaOpcija = null;
    
    let opcijeHtml = '';
    pitanje.opcije.forEach((opcija, index) => {
        opcijeHtml += `
            <div class="practice-option" onclick="izaberiOpciju(this, '${opcija}')">
                ${opcija}
            </div>
        `;
    });
    
    container.innerHTML = `
        <h4>${pitanje.pitanje}</h4>
        <div class="practice-options">
            ${opcijeHtml}
        </div>
        <div class="action-buttons" style="margin-top: 20px;">
            <button id="check-practice-btn" onclick="proveriVezbu()" style="background: var(--gradient_pozadina); color: white; border: 2px solid var(--ivica);">
                检查答案
            </button>
        </div>
    `;
};

const izaberiOpciju = (element, opcija) => {
    document.querySelectorAll('.practice-option').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    odabranaOpcija = opcija;
};

const proveriVezbu = () => {
    if (!odabranaOpcija) {
        alert('请先选择一个答案！');
        return;
    }
    
    const pitanje = pogresnaPitanja[trenutnoPitanjeIndeks];
    const rezultat = document.getElementById('practice-result');
    const dugmici = document.getElementById('practice-buttons');
    const proveriBtn = document.getElementById('check-practice-btn');
    
    proveriBtn.style.display = 'none';
    rezultat.style.display = 'block';
    dugmici.style.display = 'flex';
    
    if (odabranaOpcija === pitanje.tacanOdgovor) {
        rezultat.className = 'practice-result correct';
        rezultat.innerHTML = `
            ✅ 回答正确！<br>
            <span style="font-size: 0.9em; color: var(--tekst_muted);">这道题你已经掌握了！</span>
        `;
        
        pogresnaPitanja = pogresnaPitanja.filter(p => p.id !== pitanje.id);
        localStorage.setItem('wrongQuestions', JSON.stringify(pogresnaPitanja));
    } else {
        rezultat.className = 'practice-result incorrect';
        rezultat.innerHTML = `
            ❌ 回答错误！<br>
            <span style="font-size: 0.9em;">正确答案是：${pitanje.tacanOdgovor}</span>
        `;
    }
    
    if (trenutnoPitanjeIndeks >= pogresnaPitanja.length - 1) {
        document.getElementById('next-practice-btn').textContent = '完成练习';
    } else {
        document.getElementById('next-practice-btn').textContent = '下一题 ➜';
    }
};

const sledecePitanje = () => {
    if (trenutnoPitanjeIndeks >= pogresnaPitanja.length - 1) {
        zavrsiVezbu();
        return;
    }
    
    trenutnoPitanjeIndeks++;
    prikaziTrenutnoPitanje();
};

const zavrsiVezbu = () => {
    alert('练习完成！答对的题目已从错题库中移除。');
    
    document.getElementById('practice-mode').style.display = 'none';
    document.getElementById('wrong-questions-list').style.display = 'block';
    
    prikaziPogresnaPitanja();
};

document.addEventListener('DOMContentLoaded', () => {
    prikaziPogresnaPitanja();
});