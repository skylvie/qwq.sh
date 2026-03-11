fetch('/88x31/manifest.json')
    .then(r => r.json())
    .then(files => {
        const container = document.getElementById('buttons');
        files.forEach(file => {
            if (file === '<separator>') {
                const br = document.createElement('div');
                br.className = 'button-separator';
                container.appendChild(br);
                return;
            }

            const img = document.createElement('img');
            img.src = '/88x31/' + file;
            img.alt = file.replace(/\.[^.]+$/, '');
            img.width = 88;
            img.height = 31;
            container.appendChild(img);
        });
    });
