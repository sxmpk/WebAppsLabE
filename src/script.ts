interface StyleConfig {
    name: string;
    fileName: string;
}

const styles: StyleConfig[] = [
    { name: 'Standard', fileName: 'style-standard.css' },
    { name: 'Matrix', fileName: 'style-matrix.css' },
    { name: 'Neon', fileName: 'style-neon.css' }
];

let currentStyle: StyleConfig = styles[0];

const changeStyle = (style: StyleConfig) => {
    const head = document.head;
    const linkId = 'dynamic-css';

    const oldLink = document.getElementById(linkId);

    if (oldLink) {
        head.removeChild(oldLink);
    }

    const newLink = document.createElement('link');
    newLink.id = linkId;
    newLink.rel = 'stylesheet';
    newLink.href = '/' + style.fileName;

    head.appendChild(newLink);

    currentStyle = style;
    console.log(`Zmieniono styl na: ${style.name}`);
};

const generateLinks = () => {
    const container = document.getElementById('style-links-container');

    if (!container) {
        console.error('Błąd: Nie znaleziono kontenera id="style-links-container"');
        return;
    }

    container.innerHTML = ''; // Czyścimy

    // Dodajemy etykietę
    const label = document.createElement('span');
    label.innerText = 'Styl: ';
    label.style.color = '#fff';
    label.style.fontWeight = 'bold';
    container.appendChild(label);

    styles.forEach(style => {
        const link = document.createElement('a');
        link.innerText = `[${style.name}]`;
        link.href = '#';
        link.style.marginLeft = '10px';
        link.style.color = '#fff';
        link.style.textDecoration = 'none';
        link.style.cursor = 'pointer';

        link.addEventListener('click', (event) => {
            event.preventDefault();
            changeStyle(style);
        });

        container.appendChild(link);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    changeStyle(currentStyle);
    generateLinks();
});