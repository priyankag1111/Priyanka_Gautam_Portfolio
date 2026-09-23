(function () {
    const data = window.portfolioData || { projects: [], posts: [] };
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".menu-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const nav = document.getElementById(button.getAttribute("aria-controls"));
            const open = nav.classList.toggle("open");
            button.setAttribute("aria-expanded", open);
            button.querySelector("span").textContent = open ? "×" : "+";
        });
    });

    document.querySelectorAll(".site-nav a").forEach((link) => {
        if (link.getAttribute("href") === currentPage) link.classList.add("active");
    });

    const emailCard = document.createElement("div");
    emailCard.className = "email-card-backdrop";
    emailCard.hidden = true;
    emailCard.innerHTML = `<div class="email-card" role="dialog" aria-modal="true" aria-labelledby="email-card-title"><button class="email-card-close" type="button" aria-label="Close email card">&times;</button><p class="eyebrow">Let's connect</p><h2 id="email-card-title">Send me a note.</h2><p class="email-card-address">priyanka.apr@gmail.com</p><a class="button button-dark" href="mailto:priyanka.apr@gmail.com">Open email app <span>&#8599;</span></a></div>`;
    document.body.appendChild(emailCard);

    const closeEmailCard = () => { emailCard.hidden = true; };
    document.querySelectorAll('.footer-links a[href^="mailto:"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            emailCard.hidden = false;
            emailCard.querySelector(".email-card-close").focus();
        });
    });
    emailCard.querySelector(".email-card-close").addEventListener("click", closeEmailCard);
    emailCard.addEventListener("click", (event) => { if (event.target === emailCard) closeEmailCard(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !emailCard.hidden) closeEmailCard(); });

    const renderPost = (post) => `<article class="post-card reveal"><small>${post.date} · ${post.category}</small><h3>${post.title}</h3><p>${post.excerpt}</p><a class="text-link" href="journal.html">Read note <span>↗</span></a></article>`;
    const homePosts = document.getElementById("home-posts");
    if (homePosts) homePosts.innerHTML = data.posts.slice(0, 1).map(renderPost).join("");

    const renderRetailMetrics = (report) => {
        const container = document.getElementById("retail-metrics");
        if (!container || !report) return;

        const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
        const avgMargin = report.performance?.avg_margin_pct ?? 0;
        const revenue = report.performance?.total_revenue ?? 0;
        const capital = report.inventory_alerts?.excess_capital_tied_up ?? 0;
        const risk = report.inventory_alerts?.stockout_est_revenue_at_risk ?? 0;
        const recs = report.pricing_recommendations?.length ?? 0;

        container.innerHTML = `
            <article class="retail-card">
                <div class="label">Revenue</div>
                <div class="value">${money(revenue)}</div>
                <div class="meta">Trailing 30 days</div>
            </article>
            <article class="retail-card">
                <div class="label">Avg margin</div>
                <div class="value">${avgMargin}%</div>
                <div class="meta">Portfolio margin health</div>
            </article>
            <article class="retail-card">
                <div class="label">Excess stock</div>
                <div class="value">${money(capital)}</div>
                <div class="meta">Capital tied up</div>
            </article>
            <article class="retail-card">
                <div class="label">Pricing actions</div>
                <div class="value">${recs}</div>
                <div class="meta">Recommended changes</div>
            </article>
        `;
    };

    const loadRetailMetrics = async () => {
        const container = document.getElementById("retail-metrics");
        if (!container) return;

        try {
            const response = await fetch("http://127.0.0.1:5000/api/retail-summary", { mode: "cors" });
            if (!response.ok) throw new Error("Backend unavailable");
            const report = await response.json();
            renderRetailMetrics(report);
        } catch (error) {
            container.innerHTML = '<div class="retail-status">Live agent data is not connected yet. Start the backend at http://127.0.0.1:5000/api/retail-summary to enable the live metrics.</div>';
        }
    };

    loadRetailMetrics();

    const journalPosts = document.getElementById("journal-posts");
    if (journalPosts) journalPosts.innerHTML = data.posts.map(renderPost).join("");

    const workList = document.getElementById("work-list");
    if (workList) workList.innerHTML = data.projects.map((project) => `<article id="${project.id}" class="work-item reveal"><div class="work-image"><img src="${project.image}" alt="${project.title} project preview" loading="lazy"></div><div class="work-copy"><span class="work-index">${project.number} / ${project.category}</span><h2>${project.title}</h2><p>${project.description}</p><ul class="tags">${project.tags.map((tag) => `<li>${tag}</li>`).join("")}</ul><a class="text-link" href="mailto:hello@priyankagautam.dev?subject=${encodeURIComponent(project.title)}">Ask me about it <span>↗</span></a></div></article>`).join("");

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
})();
