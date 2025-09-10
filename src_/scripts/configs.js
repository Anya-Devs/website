// =========================
// 🌐 Bot Configuration
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
// Site Configuration
// =========================
class AppConfig {
  constructor() {
    this.siteTitle = botConfig.botName;
    this.navLinks = [
      { name: "Home", id: "home" },
      { name: "Commands", id: "commands" },
    ];
    this.hero = {
      title: "Welcome to Anya Bot",
      subtitle: "Anya ventures into your server with multiple tools and quests to engage members, bringing communities closer together.",
      inviteText: "Invite Bot",
      tagline: "🥜 Your friendly neighborhood bot"
    };
    this.features = [
      { title: "Anime", desc: "Search for anime, characters, or get recommendations.", icon: "🎭" },
      { title: "Manga", desc: "Find manga, search chapters, or read on the go.", icon: "📖" },
      { title: "Fun", desc: "Express yourself with hugs, kisses, dances, and more fun commands.", icon: "🎉" },
      { title: "Information", desc: "Check roles, banners, reviews, server info, and more.", icon: "ℹ️" },
      { title: "Pokemon", desc: "Poketwo helper, Pokédex lookups, shiny hunts, and more.", icon: "⚡" },
      { title: "Quest", desc: "Track quests, balance coins, inventory, and rewards.", icon: "🏆" },
      { title: "System", desc: "See bot latency, uptime, memory usage, and ticket system.", icon: "⚙️" }
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

    const favicon = document.querySelector("link[rel*='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = botAvatar.src;
    
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(favicon);
    }

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
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-tagline">${config.hero.tagline}</span>
          <h2>${config.hero.title}</h2>
          <p>${config.hero.subtitle}</p>
          <div class="hero-buttons">
            <a href="${botConfig.inviteLink}" target="_blank" class="cta">${config.hero.inviteText}</a>
            <a href="${botConfig.supportServer}" target="_blank" class="cta secondary">Support Server</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="${config.siteTitle}" class="hero-bot-avatar">
        </div>
      </div>
    `;
    
    // Update hero avatar if available
    fetch(`https://discord.com/api/v10/applications/${botConfig.botId}/rpc`)
      .then(r => (r.ok ? r.json() : null))
      .then(botData => {
        if (botData && botData.icon) {
          const url = `https://cdn.discordapp.com/app-icons/${botConfig.botId}/${botData.icon}.png?size=256`;
          hero.querySelector('.hero-bot-avatar').src = url;
        }
      })
      .catch(err => console.warn("[Debug] Failed to fetch bot avatar for hero:", err));
      
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
        <div class="feature-icon">${f.icon}</div>
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
        const rotateX = (-y / rect.height) * 10;
        const rotateY = (x / rect.width) * 10;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        card.style.boxShadow = `${-x/10}px ${-y/10}px 20px rgba(0,0,0,0.2)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
        thought.style.opacity = 0;
      });

      card.addEventListener("mouseenter", () => {
        thought.style.opacity = 1;
        thought.textContent = InteractiveFeatures.getRandomThought(f.title);
      });

      features.appendChild(card);
    });

    return features;
  }

  static getRandomThought(featureTitle) {
    const thoughts = {
      "Anime": [
        "I wonder which anime character you'll search for next...",
        "Need a new series? I've got recommendations just for you!",
        "Manga or anime... why not both?"
      ],
      "Manga": [
        "Reading manga feels like uncovering hidden treasures!",
        "Which manga chapter are you diving into today?",
        "Some stories hit harder in manga form, don't they?"
      ],
      "Fun": [
        "Roll the dice, hug your friends, or just dance!",
        "Express yourself with a kiss, hug, or even a playful slap!",
        "I love seeing you smile with these fun commands!"
      ],
      "Information": [
        "Knowledge is power—check roles, banners, and more!",
        "Curious about the server? I've got the details!",
        "Reviews help keep everything balanced and fair!"
      ],
      "Pokemon": [
        "I can help you catch 'em all... almost like magic!",
        "Did you know you can track your shiny hunts here?",
        "Pokédex at your service—what Pokémon are you thinking of?"
      ],
      "Quest": [
        "Quests are more fun with friends, don't you think?",
        "Check your balance—maybe it's time to visit the shop!",
        "Every quest completed brings new rewards!"
      ],
      "System": [
        "I'm always online—well, almost. Want to check uptime?",
        "Ping me anytime to see how fast I am!",
        "Behind every bot is a little bit of memory magic."
      ],
      "Default": [
        "I'm thinking about something...",
        "Hmm... what should we do next?",
        "I've got so many commands waiting for you!"
      ] 
    };
    const arr = thoughts[featureTitle] || thoughts["Default"];
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

// =========================
// Enhanced CSS Injection
// =========================
const style = document.createElement("style");
style.textContent = `
:root {
  --primary-color: #2c2c54;
  --secondary-color: #40407a;
  --accent-color: #ffcc00;
  --text-color: #ffffff;
  --card-bg: #1e1e2f;
  --hover-bg: rgba(255, 255, 255, 0.05);
  --transition-speed: 0.3s;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--text-color);
  line-height: 1.6;
  min-height: 100vh;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}



.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--accent-color);
}

.bot-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color var(--transition-speed);
}

.nav a:hover, .nav a.active {
  background-color: var(--hover-bg);
  color: var(--accent-color);
}

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--text-color);
  text-align: left;
  margin-bottom: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  gap: 3rem;
}

.hero-text {
  flex: 1;
}

.hero-tagline {
  display: inline-block;
  background: rgba(255, 204, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
  font-weight: 500;
}

.hero-text h2 {
  font-size: 2.8rem;
  margin: 0 0 1.2rem 0;
  color: var(--text-color);
  line-height: 1.2;
}

.hero-text p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-buttons .cta {
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: var(--primary-color);
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all var(--transition-speed) ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hero-buttons .cta.secondary {
  background: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
}

.hero-buttons .cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(255, 204, 0, 0.4);
}

.hero-buttons .cta.secondary:hover {
  background: rgba(255, 204, 0, 0.1);
}

.hero-image {
  flex: 0 0 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-bot-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid var(--accent-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  transition: transform var(--transition-speed);
}

.hero-bot-avatar:hover {
  transform: scale(1.05);
}

.interactive-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem auto;
  perspective: 1000px;
  max-width: 1200px;
  padding: 0 1rem;
}

.feature-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform var(--transition-speed) ease, 
              box-shadow var(--transition-speed) ease,
              background var(--transition-speed) ease;
  position: relative;
  cursor: pointer;
  overflow: visible;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-card:hover {
  background: #252540;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.feature-card h3 { 
  margin: 0 0 1rem 0; 
  font-size: 1.4rem; 
  color: var(--accent-color);
  text-align: center;
}

.feature-card p { 
  margin: 0; 
  font-size: 1rem; 
  color: #ddd;
  line-height: 1.6;
  text-align: center;
}

.thought-bubble {
  position: absolute; 
  top: -45px; 
  left: 50%; 
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.15); 
  backdrop-filter: blur(10px);
  padding: 0.6rem 1.2rem; 
  border-radius: 18px; 
  font-size: 0.9rem; 
  color: var(--text-color);
  white-space: nowrap; 
  opacity: 0; 
  pointer-events: none; 
  transition: opacity var(--transition-speed) ease;
  z-index: 10;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.thought-bubble::after {
  content: ''; 
  position: absolute; 
  bottom: -8px; 
  left: 50%; 
  transform: translateX(-50%);
  border-width: 8px; 
  border-style: solid; 
  border-color: rgba(255, 255, 255, 0.15) transparent transparent transparent;
}

.footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

/* Commands Page Styles */
.commands-wrapper {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
}

.sidebar {
  flex: 0 0 250px;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.sidebar a {
  display: block;
  padding: 0.8rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  transition: background var(--transition-speed);
}

.sidebar a:hover {
  background: var(--hover-bg);
  color: var(--accent-color);
}

.commands-content {
  flex: 1;
}

.cog-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cog-section h2 {
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.command {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: background var(--transition-speed);
}

.command:hover {
  background: rgba(0, 0, 0, 0.3);
}

.command h3 {
  color: var(--accent-color);
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.command p {
  margin-bottom: 1rem;
  color: #ddd;
}

.subcommand {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 8px;
  position: relative;
  background: rgba(0, 0, 0, 0.1);
}

.subcommand:hover {
  background: rgba(255, 255, 255, 0.05);
}

.subcommand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
}

.subcommand h4 {
  color: #fff;
  margin-bottom: 0.5rem;
}

.subcommand .dropdown-icon {
  transition: transform 0.3s ease;
  color: var(--accent-color);
}

.subcommand.active .dropdown-icon {
  transform: rotate(90deg);
}

.examples {
  display: none;
  margin-top: 1rem;
  padding-left: 1rem;
  max-width: 100%;
  overflow-x: auto;
}

.subcommand.active .examples {
  display: block;
}

.examples li {
  cursor: pointer;
  margin-bottom: 0.5rem;
  word-break: break-word;
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  transition: background 0.2s ease;
  list-style-type: none;
  background: rgba(255, 255, 255, 0.05);
}

.examples li:hover {
  background: rgba(255, 255, 255, 0.1);
}

code {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

@media (max-width: 968px) {
  .commands-wrapper {
    flex-direction: column;
  }
  
  .sidebar {
    position: static;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-text h2 {
    font-size: 2.2rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .interactive-features {
    grid-template-columns: 1fr;
  }
  
  .hero-bot-avatar {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .nav {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hero-text h2 {
    font-size: 1.8rem;
  }
  
  .hero-text p {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-buttons .cta {
    width: 100%;
    text-align: center;
  }
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
        padding: ${cssOverrides.padding || "1rem"};
        margin-bottom: 0.8rem;
        cursor: pointer;
        transition: background 0.2s ease;
        border-radius: 8px;
        position: relative;
        background: rgba(0, 0, 0, 0.1);
      }

      .subcommand:hover {
        background: ${cssOverrides.hoverBg || "rgba(255,255,255,0.05)"};
      }

      .subcommand-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.8rem;
      }

      .subcommand .examples {
        display: none;
        margin-top: ${cssOverrides.examplesMarginTop || "1rem"};
        padding-left: 1rem;
        max-width: 100%;
        overflow-x: auto;
      }

      .subcommand.active .examples {
        display: block;
      }

      .subcommand .dropdown-icon {
        transition: transform 0.3s ease;
        color: var(--accent-color);
      }

      .subcommand.active .dropdown-icon {
        transform: rotate(90deg);
      }

      .examples li {
        cursor: pointer;
        margin-bottom: 0.5rem;
        word-break: break-word;
        border-radius: 6px;
        padding: 0.5rem 0.8rem;
        transition: background 0.2s ease;
        list-style-type: none;
        background: rgba(255, 255, 255, 0.05);
      }

      .examples li:hover {
        background: ${cssOverrides.exampleHoverBg || "rgba(255,255,255,0.1)"};
      }

      code {
        font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
        background: rgba(255,255,255,0.1);
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9rem;
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
            li.style.background = cssOverrides.copiedBg || "rgba(0,255,0,0.15)";
            li.textContent = "Copied!";
            setTimeout(() => {
              li.style.background = "";
              li.innerHTML = `<code>${prefix}${ex.usage}</code> → ${ex.description}`;
            }, 1000);
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
          subDesc.style.color = "#bbb";
          subDesc.style.margin = "0";
          left.appendChild(subDesc);

          header.appendChild(left);

          const icon = document.createElement("span");
          icon.className = "dropdown-icon";
          icon.textContent = "▶";
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
                li.style.background = cssOverrides.copiedBg || "rgba(0,255,0,0.15)";
                li.textContent = "Copied!";
                setTimeout(() => {
                  li.style.background = "";
                  li.innerHTML = `<code>${prefix}${ex.usage}</code> → ${ex.description}`;
                }, 1000);
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

    zone.innerHTML = "<p style='text-align: center; padding: 2rem;'>Loading commands...</p>";

    const { prefix, cogs, css } = await CommandsPage.loadCommands();
    if (!Object.keys(cogs).length) {
      zone.innerHTML = "<p style='text-align: center; padding: 2rem;'>No commands found.</p>";
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
    
    const title = document.createElement("h3");
    title.textContent = "Categories";
    title.style.marginBottom = "1rem";
    title.style.color = "var(--accent-color)";
    sidebar.appendChild(title);
    
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
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset - 20;
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
  window.CommandsPage = CommandsPage;
}