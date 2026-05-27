require('dotenv').config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  REST,
  Routes,
} = require('discord.js');

const pingCommand = require('./commands/ping');
const vendingMachineCommand = require('./commands/vending-machine');

const commands = [
  pingCommand,
  vendingMachineCommand,
];

const commandPayloads = commands.map((command) => command.data.toJSON());

function logEnvironmentStatus() {
  console.log('[env] DISCORD_TOKEN:', process.env.DISCORD_TOKEN ? 'set' : 'missing');
  console.log('[env] CLIENT_ID:', process.env.CLIENT_ID ? 'set' : 'missing');
  console.log('[env] GUILD_ID:', process.env.GUILD_ID ? 'set' : 'missing');
}

async function registerSlashCommands() {
  const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
  const commandNames = commandPayloads.map((command) => `/${command.name}`);

  console.log('[commands] Registration attempt:', commandNames.join(', '));

  if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
    console.warn('[commands] Registration skipped: DISCORD_TOKEN, CLIENT_ID, or GUILD_ID is missing.');
    return;
  }

  try {
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commandPayloads },
    );

    console.log('[commands] Registration succeeded:', commandNames.join(', '));
  } catch (error) {
    console.error('[commands] Registration failed.');
    console.error(error.stack || error);
  }
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
for (const command of commands) {
  client.commands.set(command.data.name, command);
}

console.log('[startup] Discord bot process starting...');
logEnvironmentStatus();
console.log('[commands] Loaded commands:', [...client.commands.keys()].map((name) => `/${name}`).join(', '));

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`[startup] Logged in as ${readyClient.user.tag}`);
  await registerSlashCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
  console.log('[interaction] Received:', {
    id: interaction.id,
    type: interaction.type,
    commandName: interaction.isChatInputCommand() ? interaction.commandName : undefined,
    customId: interaction.isButton() ? interaction.customId : undefined,
    guildId: interaction.guildId,
    channelId: interaction.channelId,
  });

  try {
    // Slash command interaction
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        console.warn('[interaction] Unknown command:', interaction.commandName);
        return interaction.reply({
          content: '알 수 없는 명령어입니다.',
          ephemeral: true,
        });
      }

      console.log('[interaction] Executing command:', `/${interaction.commandName}`);
      return await command.execute(interaction);
    }

    // Button interaction
    if (interaction.isButton()) {
      console.log('[interaction] Button customId:', interaction.customId);

      if (interaction.customId === 'ping_button') {
        return await interaction.reply({
          content: '버튼 클릭 성공!',
          ephemeral: true,
        });
      }

      const vendingButtonReplies = {
        vending_info: '내 정보 기능은 준비 중입니다.',
        vending_charge: '충전 기능은 준비 중입니다.',
        vending_buy: '구매 기능은 준비 중입니다.',
      };

      const vendingReply = vendingButtonReplies[interaction.customId];

      if (vendingReply) {
        return await interaction.reply({
          content: vendingReply,
          ephemeral: true,
        });
      }

      console.warn('[interaction] Unknown button customId:', interaction.customId);
      return await interaction.reply({
        content: '알 수 없는 버튼입니다.',
        ephemeral: true,
      });
    }

    console.warn('[interaction] Unsupported interaction type:', interaction.type);
    if (interaction.isRepliable()) {
      return await interaction.reply({
        content: '지원하지 않는 interaction입니다.',
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error('[interaction] Handling failed.');
    console.error(error.stack || error);

    const errorMessage = {
      content: '처리 중 오류가 발생했습니다.',
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error('[startup] Discord login failed.');
  console.error(error.stack || error);
  process.exit(1);
});
