export interface CommandExample {
  usage: string;
  description: string;
}

export interface SubCommand {
  name: string;
  description: string;
  args?: string;
  examples?: CommandExample[];
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  category?: string;
  args?: string;
  hybrid?: boolean;
  aliases?: string[];
  subcommands?: SubCommand[];
  examples?: CommandExample[];
  cooldown?: string;
  permissions?: string;
}

export interface CommandCategory {
  name: string;
  description: string;
  icon: string;
  color: string;
  commands: Command[];
}

export const commandCategories: CommandCategory[] = [
  {
    name: "Anime",
    description: "Anime and manga related commands.",
    icon: "🎌",
    color: "from-rose-500 to-pink-500",
    commands: [
      {
        name: "anime",
        description: "Search for an anime by title or get recommendations.",
        args: "<title>",
        hybrid: true,
        subcommands: [
          {
            name: "search",
            description: "Search for an anime by title.",
            args: "<title>",
            examples: [
              { usage: "anime search Naruto", description: "Searches for the anime 'Naruto'." }
            ]
          },
          {
            name: "recommend",
            description: "Get a random anime recommendation.",
            examples: [
              { usage: "anime recommend", description: "Provides a random anime recommendation." }
            ]
          },
          {
            name: "character",
            description: "Search for an anime character by name.",
            args: "<name>",
            examples: [
              { usage: "anime character Mikasa", description: "Searches for the character 'Mikasa'." }
            ]
          }
        ]
      },
      {
        name: "manga",
        description: "Manga-related commands.",
        hybrid: true,
        subcommands: [
          {
            name: "search",
            description: "Search for a manga by title.",
            args: "<title>",
            examples: [
              { usage: "manga search One Piece", description: "Searches for the manga 'One Piece'." }
            ]
          },
          {
            name: "read",
            description: "Read a manga chapter.",
            args: "<title>",
            examples: [
              { usage: "manga read Spy x Family", description: "Reads 'Spy x Family' manga." }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Fun",
    description: "Playful and reaction commands.",
    icon: "🎮",
    color: "from-pink-500 to-rose-500",
    commands: [
      { name: "8ball", description: "Ask the magic 8-ball a question.", hybrid: true, examples: [{ usage: "8ball Will I win?", description: "Ask the 8-ball a question." }] },
      { name: "pat", description: "Pat another user.", examples: [{ usage: "pat @User", description: "Pats the mentioned user." }] },
      { name: "cuddle", description: "Cuddle with another user.", examples: [{ usage: "cuddle @User", description: "Cuddles with the mentioned user." }] },
      { name: "kiss", description: "Send a kiss to another user.", examples: [{ usage: "kiss @User", description: "Sends a kiss to the mentioned user." }] },
      { name: "hug", description: "Send a hug to another user.", examples: [{ usage: "hug @User", description: "Sends a hug to the mentioned user." }] },
      { name: "bite", description: "Bite another user playfully.", examples: [{ usage: "bite @User", description: "Bites the mentioned user playfully." }] },
      { name: "lick", description: "Lick another user.", examples: [{ usage: "lick @User", description: "Licks the mentioned user." }] },
      { name: "slap", description: "Slap another user.", examples: [{ usage: "slap @User", description: "Slaps the mentioned user." }] },
      { name: "cry", description: "Cry.", examples: [{ usage: "cry", description: "Displays crying animation." }] },
      { name: "slowclap", description: "Slow clap.", examples: [{ usage: "slowclap", description: "Displays slow clapping animation." }] },
      { name: "wave", description: "Wave.", examples: [{ usage: "wave", description: "Displays waving animation." }] },
      { name: "smug", description: "Smug reaction.", examples: [{ usage: "smug", description: "Displays a smug animation." }] },
      { name: "dance", description: "Dance.", examples: [{ usage: "dance", description: "Displays dancing animation." }] },
      { name: "happy", description: "Happy reaction.", examples: [{ usage: "happy", description: "Displays a happy animation." }] },
      { name: "gamble", description: "Gamble coins for a chance to win more.", examples: [{ usage: "gamble 50", description: "Gambles 50 coins for a chance to win more." }] }
    ]
  },
  {
    name: "Information",
    description: "Get server and user information.",
    icon: "ℹ️",
    color: "from-blue-500 to-indigo-500",
    commands: [
      { name: "reviews", description: "Show server reviews.", hybrid: true, examples: [{ usage: "reviews", description: "Displays server reviews." }] },
      { name: "about", description: "Show information about the server.", hybrid: true, examples: [{ usage: "about", description: "Displays info about the server." }] },
      { name: "server", description: "Show server details.", hybrid: true, examples: [{ usage: "server", description: "Displays server information." }] },
      { name: "pfp", description: "Show user's profile picture.", hybrid: true, examples: [{ usage: "pfp @User", description: "Displays the user's profile picture." }] },
      { name: "banner", description: "Show user's banner.", hybrid: true, examples: [{ usage: "banner @User", description: "Displays the user's banner image." }] },
      { name: "invite", description: "Get server invite link.", hybrid: true, examples: [{ usage: "invite", description: "Shows server invite link." }] },
      { name: "perms", description: "Check permissions.", hybrid: true, examples: [{ usage: "perms @User", description: "Displays the user's permissions." }] },
      { name: "roles", description: "List roles in server.", hybrid: true, examples: [{ usage: "roles", description: "Displays all server roles." }] }
    ]
  },
  {
    name: "Pokemon",
    description: "Pokémon tools and utilities.",
    icon: "🔍",
    color: "from-green-500 to-teal-500",
    commands: [
      {
        name: "pt",
        description: "Pokémon trainer utility commands.",
        hybrid: true,
        subcommands: [
          {
            name: "cl",
            description: "Manage your Pokémon collection (max 50).",
            examples: [
              { usage: "pt cl add eevee, pikachu, vulpix", description: "Add Pokémon to your collection." },
              { usage: "pt cl remove eevee, vulpix", description: "Remove Pokémon from your collection." },
              { usage: "pt cl", description: "View your collection." },
              { usage: "pt cl clear", description: "Clear your collection." }
            ]
          },
          {
            name: "sh",
            description: "Manage your shiny hunt.",
            examples: [
              { usage: "pt sh alolan vulpix", description: "Set shiny hunt target." },
              { usage: "pt sh remove", description: "Remove shiny hunt." },
              { usage: "pt sh", description: "View shiny hunt." }
            ]
          },
          {
            name: "tp",
            description: "Ping Pokémon types like fire, water, or grass.",
            examples: [
              { usage: "pt tp fire", description: "Ping for Fire-type Pokémon." }
            ]
          },
          {
            name: "qp",
            description: "Ping Pokémon quest regions like Kanto, Alola, Galar.",
            examples: [
              { usage: "pt qp alola", description: "Ping for Alola region quests." }
            ]
          },
          {
            name: "special",
            description: "Assign special roles for rare/regional Pokémon (requires Manage Server).",
            examples: [
              { usage: "pt special", description: "Configure special roles." }
            ]
          },
          {
            name: "starboard",
            description: "Configure starboard settings (requires Manage Channel).",
            examples: [
              { usage: "pt starboard", description: "Configure starboard." }
            ]
          },
          {
            name: "sc",
            description: "Shiny Protection channels and logging.",
            examples: [
              { usage: "pt sc", description: "View shiny hunt channels." },
              { usage: "pt sc #channel", description: "Protect a channel for shiny hunts." },
              { usage: "pt sc log #channel", description: "Set shiny catch log channel." },
              { usage: "pt sc log remove", description: "Remove shiny log channel." },
              { usage: "pt sc log", description: "View current log channel." }
            ]
          }
        ]
      },
      {
        name: "pokedex",
        description: "Displays Pokémon dex info.",
        aliases: ["dex", "d"],
        hybrid: true,
        args: "<pokemon> [form]",
        examples: [
          { usage: "pokedex pikachu", description: "Displays Pokédex info for Pikachu." },
          { usage: "pokedex shiny charizard", description: "Displays shiny Charizard's info." },
          { usage: "pokedex greninja ash", description: "Displays Ash-Greninja form info." },
          { usage: "dex mewtwo", description: "Alias: Shows Pokédex info for Mewtwo." },
          { usage: "d bulbasaur", description: "Alias: Shows Pokédex info for Bulbasaur." }
        ]
      }
    ]
  },
  {
    name: "Quest",
    description: "Engaging quests and challenges.",
    icon: "🎯",
    color: "from-purple-500 to-pink-500",
    commands: [
      { name: "redirect", description: "Redirect quest commands.", hybrid: true, examples: [{ usage: "redirect", description: "Redirects to relevant quest." }] },
      { name: "quest", description: "Show current quest progress.", hybrid: true, examples: [{ usage: "quest", description: "Displays your quest progress." }] },
      { name: "quest_roles", description: "Show quest role rewards.", hybrid: true, examples: [{ usage: "quest_roles", description: "Displays quest role rewards." }] },
      { name: "inventory", description: "Show your inventory.", hybrid: true, examples: [{ usage: "inventory", description: "Displays your inventory items." }] },
      { name: "balance", description: "Check your coin balance.", hybrid: true, examples: [{ usage: "balance", description: "Displays your current coin balance." }] },
      { name: "shop", description: "Access the shop.", hybrid: true, examples: [{ usage: "shop", description: "Displays available shop items." }] }
    ]
  },
  {
    name: "System",
    description: "Bot and support system commands.",
    icon: "⚙️",
    color: "from-gray-500 to-slate-500",
    commands: [
      { name: "memory", description: "Show bot memory usage.", hybrid: true, examples: [{ usage: "memory", description: "Displays bot memory usage." }] },
      { name: "ping", description: "Show bot ping.", hybrid: true, examples: [{ usage: "ping", description: "Displays bot latency." }] },
      { name: "uptime", description: "Show bot uptime.", hybrid: true, examples: [{ usage: "uptime", description: "Displays how long the bot has been online." }] },
      { name: "credit", description: "Show credits.", hybrid: true, examples: [{ usage: "credit", description: "Displays bot credits." }] },
      {
        name: "ticket",
        description: "Access support tickets.",
        hybrid: true,
        subcommands: [
          {
            name: "create",
            description: "Create a new support ticket in the specified channel.",
            args: "#channel",
            examples: [
              { usage: "ticket create #support", description: "Creates a ticket in #support." }
            ]
          },
          {
            name: "activate",
            description: "Activate the ticket system.",
            examples: [
              { usage: "ticket activate", description: "Activates the ticket system." }
            ]
          },
          {
            name: "delete",
            description: "Delete the ticket system.",
            examples: [
              { usage: "ticket delete", description: "Deletes the ticket system." }
            ]
          },
          {
            name: "edit",
            description: "Edit an existing ticket message using its link.",
            args: "<message link>",
            examples: [
              { usage: "ticket edit https://discord.com/channels/123/456/789", description: "Edits the specified ticket message." }
            ]
          }
        ]
      }
    ]
  }
];

export const prefix = ".";