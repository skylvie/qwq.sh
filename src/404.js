fetch("/ascii/manifest.json")
    .then(r => r.json())
    .then(files => {
        const file = files[Math.floor(Math.random() * files.length)];
        return fetch("/ascii/" + file);
    })
    .then(r => r.text())
    .then(text => {
        const pre = document.getElementById("art");
        pre.textContent = text;

        const lines = text.split("\n");
        const numLines = lines.length;
        const maxCols = Math.max(...lines.map(l => l.length));

        const maxH = window.innerHeight * 0.3;
        const maxW = pre.parentElement.clientWidth;

        const sizeByH = maxH / (numLines * 1.2);
        const sizeByW = maxW / (maxCols * 0.6);
        const fontSize = Math.min(sizeByH, sizeByW, 10);

        pre.style.fontSize = fontSize + "px";
    });
