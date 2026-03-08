
const modal = document.getElementById('modal');
const overlay = document.querySelector('.overlay');

modal.style.display = 'none';
overlay.style.display = 'none';

const footer = () => {
    modal.style.animation = 'modalLoad 1s 1';
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

const zatvori = () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';

}

