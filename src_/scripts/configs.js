// =========================
// 🌐 Bot Config
// =========================
const botConfig = {
  botName: "Anya Bot",
  botId: "1234247716243112100",
  description: "A Discord bot that helps manage your server and provides fun features.",
  inviteLink: "https://discord.com/oauth2/authorize?client_id=1234247716243112100&scope=bot&permissions=8",
  supportServer: "https://discord.com/oauth2/authorize?client_id=1234247716243112100&permissions=1689934541355072&integration_type=0&scope=bot",
  redirectUri: "http://127.0.0.1:5500/auth/callback",
  features: [
    "Quest system",
    "Fun commands",
    "Poketwo Helper",
    "Music playback",
    "Moderation tools",
    "Minigames",
  ],
};

// =========================
// Site Config
// =========================
class AppConfig {
  constructor() {
    this.siteTitle = botConfig.botName;
    this.navLinks = [
      { name: "Home", id: "home" },
      { name: "Commands", id: "commands" },
    ];
    this.hero = {
      title: "👋",
      subtitle: "Anya ventures into your server with multiple tools and quests to engage members, bringing communities closer together.",
      inviteText: "Invite Bot"
    };
    this.features = [
      { title: "Poketwo Helper", desc: "Automatically names Poketwo Pokémon and provides Dex information." },
      { title: "User Engagement", desc: "Quests that get members chatting, using emojis, and making friends while earning rewards." },
      { title: "Fun Commands", desc: "Roll dice, hug members, gamble, and more." },
    ];
    this.footer = "© 2025 Anya Bot. All rights reserved.";
  }
}

// =========================
// Layout Elements
// =========================
class LayoutElements {
  static createHeader(config) {
    const header = document.createElement("header");
    header.className = "header";

    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";

    const logo = document.createElement("h1");
    logo.className = "logo";
    logo.textContent = config.siteTitle;

    const botAvatar = document.createElement("img");
    botAvatar.className = "bot-avatar";
    botAvatar.alt = `${config.siteTitle} Avatar`;
    botAvatar.src = "https://cdn.discordapp.com/embed/avatars/0.png";

    const favicon =
      document.querySelector("link[rel*='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = botAvatar.src;
    if (!document.querySelector("link[rel*='icon']")) document.head.appendChild(favicon);

    fetch(`https://discord.com/api/v10/applications/${botConfig.botId}/rpc`)
      .then(r => (r.ok ? r.json() : null))
      .then(botData => {
        if (botData && botData.icon) {
          const url = `https://cdn.discordapp.com/app-icons/${botConfig.botId}/${botData.icon}.png?size=256`;
          botAvatar.src = url;
          favicon.href = url;
        }
      })
      .catch(err => console.warn("[Debug] Failed to fetch bot avatar / favicon:", err));

    logoContainer.append(botAvatar, logo);

    const nav = document.createElement("nav");
    nav.className = "nav";

    config.navLinks.forEach(link => {
      const a = document.createElement("a");
      a.href = "javascript:void(0)";
      a.textContent = link.name;
      a.dataset.pageId = link.id;
      a.addEventListener("click", e => {
        e.preventDefault();
        LayoutElements.handleNavigation(link.id);
      });
      nav.appendChild(a);
    });

    header.append(logoContainer, nav);
    return header;
  }

  static handleNavigation(pageId) {
    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
    document.querySelector(`.nav a[data-page-id="${pageId}"]`).classList.add('active');

    if (pageId === "commands") {
      document.querySelector('.hero').style.display = 'none';
      document.querySelector('.features').style.display = 'none';
      CommandsPage.render("dynamic-zone");
    } else if (pageId === "home") {
      document.querySelector('.hero').style.display = 'flex';
      document.querySelector('.features').style.display = 'grid';
      const zone = document.getElementById("dynamic-zone");
      zone.replaceChildren();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  static createHero(config) {
    const hero = document.createElement("section");
    hero.className = "hero";
    hero.innerHTML = `
      <h2>${config.hero.title}</h2>
      <p>${config.hero.subtitle}</p>
      <div class="hero-buttons">
        <a href="${botConfig.inviteLink}" target="_blank" class="cta">${config.hero.inviteText}</a>
      </div>
    `;
    return hero;
  }

  static createFeatures(config) {
    const features = document.createElement("section");
    features.className = "features";
    config.features.forEach(f => {
      const div = document.createElement("div");
      div.className = "feature";
      div.innerHTML = `
        <h3>${f.title}</h3>
        <p>${f.desc}${f.coming ? '<span class="coming-soon">Coming Soon</span>' : ""}</p>
      `;
      features.appendChild(div);
    });
    return features;
  }

  static createFooter(config) {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `<p>${config.footer}</p>`;
    return footer;
  }
}

// =========================
// Page Loader
// =========================
class PageLoader {
  static async loadPage(scriptPath, containerId = "dynamic-zone") {
    const container = document.getElementById(containerId);
    if (!container) return;
    const existing = document.querySelector(`script[data-dynamic="true"]`);
    if (existing) existing.remove();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptPath;
      script.dataset.dynamic = "true";
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = err => reject(err);
      document.body.appendChild(script);
    });
  }

  static loadCSS(cssPath) {
    if (!cssPath) return;
    const existing = document.querySelector(`link[data-dynamic="true"]`);
    if (existing) existing.remove();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssPath;
    link.dataset.dynamic = "true";
    document.head.appendChild(link);
  }
}

// =========================
// Commands Page (Hover hint removed on click)
// =========================
// =========================
// Commands Page (Dropdown + copyable examples + JSON CSS)
// =========================
class CommandsPage {
  static async loadCommands(jsonPath = "src_/data/pages/commands.json") {
    try {
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error("Failed to fetch commands JSON");
      const data = await res.json();
      return { prefix: data.prefix, cogs: data.cogs || {}, css: data.css || {} };
    } catch {
      return { prefix: ".", cogs: {}, css: {} };
    }
  }

  static injectSubcommandCSS(cssOverrides = {}) {
    if (document.getElementById("subcommand-css")) return;

    const style = document.createElement("style");
    style.id = "subcommand-css";

    style.textContent = `
      .subcommand {
        display: flex;
        flex-direction: column;
        padding: ${cssOverrides.padding || "0.75rem 1rem"};
        margin-bottom: 0.5rem;
        cursor: pointer;
        transition: background 0.2s ease;
        border-radius: 6px;
        position: relative;
      }

      .subcommand:hover {
        background: ${cssOverrides.hoverBg || "rgba(255,255,255,0.03)"};
      }

      .subcommand-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
      }

      .subcommand .examples {
        display: none;
        margin-top: ${cssOverrides.examplesMarginTop || "0.5rem"};
        padding-left: 1rem;
        max-width: 100%;
        overflow-x: auto;
      }

      .subcommand.active .examples {
        display: block;
      }

      .subcommand .dropdown-icon {
        transition: transform 0.2s ease;
      }

      .subcommand.active .dropdown-icon {
        transform: rotate(90deg);
      }

      .examples li {
        cursor: pointer;
        margin-bottom: 0.25rem;
        word-break: break-word;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
      }

      .examples li:hover {
        background: ${cssOverrides.exampleHoverBg || "rgba(255,255,255,0.05)"};
      }

      code {
        font-family: monospace;
        background: rgba(255,255,255,0.05);
        padding: 0.1rem 0.25rem;
        border-radius: 4px;
      }
    `;

    document.head.appendChild(style);
  }

  static createCommandSection(cogName, commands, prefix, cssOverrides = {}) {
    CommandsPage.injectSubcommandCSS(cssOverrides);

    const section = document.createElement("section");
    section.className = "cog-section";
    section.id = cogName;

    const title = document.createElement("h2");
    title.textContent = cogName;
    section.appendChild(title);

    commands.forEach(cmd => {
      const cmdDiv = document.createElement("div");
      cmdDiv.className = "command";

      const args = cmd.args ? ` ${cmd.args}` : "";
      const cmdTitle = document.createElement("h3");
      cmdTitle.textContent = cmd.name + args;
      cmdDiv.appendChild(cmdTitle);

      const desc = document.createElement("p");
      desc.textContent = cmd.description;
      cmdDiv.appendChild(desc);

      if (cmd.examples?.length) {
        const examples = document.createElement("ul");
        examples.className = "examples";
        cmd.examples.forEach(ex => {
          const li = document.createElement("li");
          li.innerHTML = `<code>${prefix}${ex.usage}</code> → ${ex.description}`;
          li.addEventListener("click", e => {
            e.stopPropagation();
            navigator.clipboard.writeText(`${prefix}${ex.usage}`);
            li.style.background = cssOverrides.copiedBg || "rgba(0,255,0,0.1)";
            setTimeout(() => li.style.background = "", 300);
          });
          examples.appendChild(li);
        });
        cmdDiv.appendChild(examples);
      }

      if (cmd.subcommands?.length) {
        const subcommandsContainer = document.createElement("div");
        subcommandsContainer.className = "subcommands-container";

        cmd.subcommands.forEach(sub => {
          const subDiv = document.createElement("div");
          subDiv.className = "subcommand";
          subDiv.setAttribute("data-subcommand", "true");

          const header = document.createElement("div");
          header.className = "subcommand-header";

          const left = document.createElement("div");
          left.style.flex = "1";

          const subArgs = sub.args ? ` ${sub.args}` : "";
          const subTitle = document.createElement("h4");
          subTitle.textContent = sub.name + subArgs;
          left.appendChild(subTitle);

          const subDesc = document.createElement("p");
          subDesc.textContent = sub.description;
          left.appendChild(subDesc);

          header.appendChild(left);

          const icon = document.createElement("span");
          icon.className = "dropdown-icon";
          icon.textContent = "▶"; // arrow symbol
          header.appendChild(icon);

          subDiv.appendChild(header);

          if (sub.examples?.length) {
            const subExamples = document.createElement("ul");
            subExamples.className = "examples";
            sub.examples.forEach(ex => {
              const li = document.createElement("li");
              li.innerHTML = `<code>${prefix}${ex.usage}</code> → ${ex.description}`;
              li.addEventListener("click", e => {
                e.stopPropagation();
                navigator.clipboard.writeText(`${prefix}${ex.usage}`);
                li.style.background = cssOverrides.copiedBg || "rgba(0,255,0,0.1)";
                setTimeout(() => li.style.background = "", 300);
              });
              subExamples.appendChild(li);
            });
            subDiv.appendChild(subExamples);
          }

          subDiv.addEventListener("click", e => {
            e.stopPropagation();
            document.querySelectorAll(".subcommand.active").forEach(active => {
              if (active !== subDiv) active.classList.remove("active");
            });
            subDiv.classList.toggle("active");
          });

          subcommandsContainer.appendChild(subDiv);
        });

        cmdDiv.appendChild(subcommandsContainer);
      }

      section.appendChild(cmdDiv);
    });

    return section;
  }

  static async render(containerId = "dynamic-zone") {
    const zone = document.getElementById(containerId);
    if (!zone) return;

    zone.innerHTML = "<p>Loading commands...</p>";

    const { prefix, cogs, css } = await CommandsPage.loadCommands();
    if (!Object.keys(cogs).length) {
      zone.innerHTML = "<p>No commands found.</p>";
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "commands-wrapper dynamic-section";

    const sidebar = CommandsPage.createSidebar(cogs);
    wrapper.appendChild(sidebar);

    const content = document.createElement("div");
    content.className = "commands-content";

    Object.entries(cogs).forEach(([cogName, commands]) => {
      const section = CommandsPage.createCommandSection(cogName, commands, prefix, css);
      content.appendChild(section);
    });

    wrapper.appendChild(content);
    zone.replaceChildren(wrapper);
  }

  static createSidebar(cogs) {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    Object.keys(cogs).forEach(cogName => {
      const cogLink = document.createElement("a");
      cogLink.href = `#${cogName}`;
      cogLink.textContent = cogName;
      cogLink.addEventListener("click", e => {
        e.preventDefault();
        const targetId = cogLink.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offset = document.querySelector(".header")?.offsetHeight || 0;
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset - 10;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
      sidebar.appendChild(cogLink);
    });
    return sidebar;
  }
}



// =========================
// Initialize Page
// =========================
window.addEventListener("DOMContentLoaded", () => {
  let container = document.getElementById("app");
  if (!container) {
    container = document.createElement("div");
    container.id = "app";
    document.body.appendChild(container);
  }

  if (!container.hasAttribute("data-layout-mounted")) {
    const cfg = new AppConfig();
    container.append(
      LayoutElements.createHeader(cfg),
      LayoutElements.createHero(cfg),
      LayoutElements.createFeatures(cfg)
    );

    const dynamic = document.createElement("main");
    dynamic.id = "dynamic-zone";
    container.append(dynamic, LayoutElements.createFooter(cfg));
    container.setAttribute("data-layout-mounted", "true");

    document.querySelector('.nav a[data-page-id="home"]').classList.add('active');
  }
});

// =========================
// Safe Global Assignment
// =========================
if (typeof window !== "undefined") {
  window.botConfig = botConfig;
  window.AppConfig = AppConfig;
  window.LayoutElements = LayoutElements;
  window.PageLoader = PageLoader;
  window.CommandsPage = CommandsPage;
}
