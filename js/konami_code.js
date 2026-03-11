(function () {
    const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"];
    const LABELS = ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A", "↵"];
    const FACES = [
        "owo", "uwu", "qwq", "o.o",
        ":3", ":3c", ">:3",
        ">w<", ">.<", ">~<", ">///<",
        "^-^", "^_^",  "=^.^=", "(=^･ω･^=)", "(*^ω^*)",
        // "rawr", "mrrp", "mrow", "meow", "nyaa", "arf",
        // "haiii", "hewwo", "hiii",
        // "mizuki", "mizuena", "emunene", "yuri",
        // "gumi", "miku", "teto",
        "🩷", "💜", "🏳️‍⚧️", "🏳️‍🌈"

    ];
    const COLORS = ["#cba6f7", "#89dceb", "#f38ba8", "#a6e3a1", "#fab387", "#f9e2af"];
    let idx = 0;
    let active = false;

    const indicator = document.createElement("div");
    indicator.style.cssText = `
        position: fixed; bottom: 1ch; right: 1.5ch;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.7em; pointer-events: auto; z-index: 9999;
        display: flex; gap: 0.4ch; cursor: pointer; user-select: none;
    `;
    const keyEls = LABELS.map(label => {
        const span = document.createElement("span");
        span.textContent = label;
        span.style.cssText = `color: #313244; transition: color 0.15s;`;
        indicator.appendChild(span);
        return span;
    });
    document.body.appendChild(indicator);

    let hideTimer;

    function updateIndicator() {
        keyEls.forEach((el, i) => {
            el.style.color = i < idx ? "#cba6f7" : "#313244";
        });

        clearTimeout(hideTimer);

        if (idx === 0) hideTimer = setTimeout(() => {
            keyEls.forEach(el => el.style.color = "#313244");
        }, 1000);
    }

    indicator.addEventListener("click", () => {
        idx++;
        updateIndicator();

        if (idx === CODE.length) {
            idx = 0;
            setTimeout(updateIndicator, 200);
            burst();
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === CODE[idx]) {
            idx++;
            updateIndicator();

            if (idx === CODE.length) {
                idx = 0;
                setTimeout(updateIndicator, 200);
                burst();
            }
        } else {
            idx = e.key === CODE[0] ? 1 : 0;
            updateIndicator();
        }
    });

    function burst() {
        if (active) return;
        active = true;

        window.dispatchEvent(new CustomEvent("konami"));

        setInterval(() => {
            const count = 14 + Math.floor(Math.random() * 10);
            for (let i = 0; i < count; i++) spawn();
        }, 350);
    }

    function randPos() {
        const centered = Math.random() < 0.5;

        if (centered) {
            const x = (Math.random() + Math.random()) / 2;
            const y = (Math.random() + Math.random()) / 2;
            return { x: 20 + x * 60, y: 20 + y * 60 };
        }

        return { x: Math.random() * 100, y: Math.random() * 100 };
    }

    function spawn() {
        const el = document.createElement("div");
        el.textContent = FACES[Math.floor(Math.random() * FACES.length)];
        const { x, y } = randPos();
        el.style.cssText = `
            position: fixed;
            left: ${x}vw;
            top: ${y}vh;
            font-size: ${0.8 + Math.random() * 2.4}em;
            color: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
            opacity: ${0.3 + Math.random() * 0.7};
            transform: rotate(${-40 + Math.random() * 80}deg);
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap;
            transition: opacity ${0.8 + Math.random() * 0.8}s ease;
            font-family: "IBM Plex Mono", monospace;
        `;
        document.body.appendChild(el);

        requestAnimationFrame(() => requestAnimationFrame(() => {
            el.style.opacity = "0";
        }));

        setTimeout(() => el.remove(), 2000);
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    const CATPPUCCIN = [
        "#cba6f7",
        "#f38ba8",
        "#fab387",
        "#f9e2af",
        "#a6e3a1",
        "#94e2d5",
        "#89dceb",
        "#89b4fa",
        "#b4befe",
        "#f5c2e7"
    ];

    const title = document.querySelector(".title");
    if (!title) return;

    const chars = title.textContent.split("");
    title.textContent = "";

    const spans = chars.map(ch => {
        const span = document.createElement("span");
        span.textContent = ch;
        span.style.transition = "color 0.6s ease";
        title.appendChild(span);
        return span;
    });

    function randomColor() {
        return CATPPUCCIN[Math.floor(Math.random() * CATPPUCCIN.length)];
    }

    function recolor() {
        spans.forEach(span => {
            span.style.color = randomColor();
        });
    }

    recolor();
    setInterval(recolor, 800);
});

window.addEventListener("konami", function () {
    const style = document.createElement("style");
    style.textContent = `
        @keyframes rainbow-flow {
            from { background-position: 0% 50%; }
            to   { background-position: 100% 50%; }
        }
        #art {
            background: linear-gradient(90deg,
                #ff0000, #ff6600, #ffcc00, #00dd00, #0099ff, #7700ff, #ff00cc,
                #ff0000, #ff6600, #ffcc00, #00dd00, #0099ff, #7700ff, #ff00cc,
                #ff0000
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent !important;
            animation: rainbow-flow 4s linear infinite;
        }
    `;
    document.head.appendChild(style);
});
