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
