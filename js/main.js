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

    const renderPost = (post) => `<article class="post-card reveal"><small>${post.date} · ${post.category}</small><h3>${post.title}</h3><p>${post.excerpt}</p><a class="text-link" href="journal.html">Read note <span>↗</span></a></article>`;
    const homePosts = document.getElementById("home-posts");
    if (homePosts) homePosts.innerHTML = data.posts.slice(0, 3).map(renderPost).join("");

    const journalPosts = document.getElementById("journal-posts");
    if (journalPosts) journalPosts.innerHTML = data.posts.map(renderPost).join("");

    const workList = document.getElementById("work-list");
    if (workList) workList.innerHTML = data.projects.map((project) => `<article id="${project.id}" class="work-item reveal"><div class="work-image"><img src="${project.image}" alt="${project.title} project preview" loading="lazy"></div><div class="work-copy"><span class="work-index">${project.number} / ${project.category}</span><h2>${project.title}</h2><p>${project.description}</p><ul class="tags">${project.tags.map((tag) => `<li>${tag}</li>`).join("")}</ul><a class="text-link" href="mailto:hello@priyankagautam.dev?subject=${encodeURIComponent(project.title)}">Ask me about it <span>↗</span></a></div></article>`).join("");

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
})();
