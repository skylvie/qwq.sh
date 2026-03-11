const params = new URLSearchParams(location.search);
const artParam = params.get("a");

fetch("ascii/big/manifest.json")
    .then(r => r.json())
    .then(files => {
        let file;

        if (artParam) {
            const match = files.find(f => f.replace(/\.txt$/, "") === artParam);
            file = match || files[Math.floor(Math.random() * files.length)];
        } else {
            file = files[Math.floor(Math.random() * files.length)];
        }

        return fetch("ascii/big/" + file);
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
