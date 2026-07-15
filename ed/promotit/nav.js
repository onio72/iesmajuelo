document.addEventListener("DOMContentLoaded", () => {
    const navItems = [
        ["index.html", "Índice"],
        ["eso.html", "Promoción ESO"],
        ["titulacion-eso.html", "Titulación ESO"],
        ["pdc.html", "Acceso a PDC"],
        ["fpb.html", "Acceso a Grado Básico"],
        ["espa.html", "ESPA"],
        ["bachillerato.html", "Bachillerato"],
        ["btopa.html", "BTOPA"],
        ["fp.html", "Promoción FP"],
        ["titulacion-fp.html", "Titulación FP"],
        ["revisiones.html", "Revisiones"]
    ];

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navContainer = document.querySelector("[data-main-nav]");

    if (!navContainer) return;

    navContainer.innerHTML = navItems.map(([href, label]) => {
        const isActive = currentPage === href;

        const classes = isActive
            ? "px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-sm"
            : "px-4 py-2 rounded-full bg-white border border-gray-200 text-secondary text-sm font-semibold hover:border-accent hover:text-accent transition-colors";

        return `<a href="${href}" class="${classes}">${label}</a>`;
    }).join("");
});
