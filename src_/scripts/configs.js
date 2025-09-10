// =========================
// 🌐 Bot Config
// =========================
const botConfig = {
  botName: "Anya Bot",
  botId: "1234247716243112100",
  description: "A Discord bot that helps manage your server and provides fun features.",
  inviteLink: "https://discord.com/oauth2/authorize?client_id=1234247716243112100&scope=bot&permissions=8",
  supportServer: "https://discord.com/oauth2/authorize?client_id=1234247716243112100&permissions=1689934541355072&integration_type=0&scope=bot",
  redirectUri: "http://127.0.0.1:5500/auth/callback"
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
      title: "🥜",
      subtitle: "Anya ventures into your server with multiple tools and quests to engage members, bringing communities closer together.",
      inviteText: "Invite Bot"
    };
    this.features = [
      { title: "Anime", desc: "Search for anime, characters, or get recommendations." },
      { title: "Manga", desc: "Find manga, search chapters, or read on the go." },
      { title: "Fun", desc: "Express yourself with hugs, kisses, dances, and more fun commands." },
      { title: "Information", desc: "Check roles, banners, reviews, server info, and more." },
      { title: "Pokemon", desc: "Poketwo helper, Pokédex lookups, shiny hunts, and more." },
      { title: "Quest", desc: "Track quests, balance coins, inventory, and rewards." },
      { title: "System", desc: "See bot latency, uptime, memory usage, and ticket system." }
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
      const featuresSection = document.querySelector(".features.interactive-features");
      if (featuresSection) featuresSection.style.display = "grid";
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
    return InteractiveFeatures.createFeatures(config);
  }

  static createFooter(config) {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `<p>${config.footer}</p>`;
    return footer;
  }
}

// =========================
// 🌟 Enhanced Features with 3D Mouse Tracking & Thoughts
// =========================
class InteractiveFeatures {
  static createFeatures(config) {
    const features = document.createElement("section");
    features.className = "features interactive-features";

    config.features.forEach((f, i) => {
      const card = document.createElement("div");
      card.className = "feature-card";
      card.innerHTML = `
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      `;

      const thought = document.createElement("div");
      thought.className = "thought-bubble";
      thought.textContent = InteractiveFeatures.getRandomThought(f.title);
      card.appendChild(thought);

      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 15;
        const rotateY = (x / rect.width) * 15;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        thought.style.opacity = 0;
      });

      card.addEventListener("mouseenter", () => {
        thought.style.opacity = 1;
      });

      features.appendChild(card);
    });

    return features;
  }

  static getRandomThought(featureTitle) {
    const thoughts = {
      "Anime": [
        "I wonder which anime character you’ll search for next...",
        "Need a new series? I’ve got recommendations just for you!",
        "Manga or anime... why not both?"
      ],
      "Manga": [
        "Reading manga feels like uncovering hidden treasures!",
        "Which manga chapter are you diving into today?",
        "Some stories hit harder in manga form, don’t they?"
      ],
      "Fun": [
        "Roll the dice, hug your friends, or just dance!",
        "Express yourself with a kiss, hug, or even a playful slap!",
        "I love seeing you smile with these fun commands!"
      ],
      "Information": [
        "Knowledge is power—check roles, banners, and more!",
        "Curious about the server? I’ve got the details!",
        "Reviews help keep everything balanced and fair!"
      ],
      "Pokemon": [
        "I can help you catch 'em all... almost like magic!",
        "Did you know you can track your shiny hunts here?",
        "Pokédex at your service—what Pokémon are you thinking of?"
      ],
      "Quest": [
        "Quests are more fun with friends, don’t you think?",
        "Check your balance—maybe it’s time to visit the shop!",
        "Every quest completed brings new rewards!"
      ],
      "System": [
        "I’m always online—well, almost. Want to check uptime?",
        "Ping me anytime to see how fast I am!",
        "Behind every bot is a little bit of memory magic."
      ],
      "Default": [
        "I’m thinking about something...",
        "Hmm... what should we do next?",
        "I’ve got so many commands waiting for you!"
      ] 
    };
    const arr = thoughts[featureTitle] || ["I’m thinking about something..."];
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

// =========================
// Enhanced CSS Injection
// =========================
const style = document.createElement("style");
style.textContent = `
.interactive-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-top: 2rem;
  perspective: 1000px;
}
.feature-card {
  background: #1e1e2f;
  padding: 1.2rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  cursor: pointer;
  overflow: visible;
}
.feature-card h3 { margin:0 0 0.5rem 0; font-size:1.2rem; color:#ffcc00;}
.feature-card p { margin:0; font-size:0.95rem; color:#ddd;}
.thought-bubble {
  position:absolute; top:-35px; left:50%; transform:translateX(-50%);
  background:rgba(255,255,255,0.1); backdrop-filter:blur(4px);
  padding:0.4rem 0.8rem; border-radius:12px; font-size:0.85rem; color:#fff;
  white-space:nowrap; opacity:0; pointer-events:none; transition:opacity 0.3s ease;
}
.thought-bubble::after {
  content:''; position:absolute; bottom:-6px; left:50%; transform:translateX(-50%);
  border-width:6px; border-style:solid; border-color: rgba(255,255,255,0.1) transparent transparent transparent;
}
`;
document.head.appendChild(style);

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
