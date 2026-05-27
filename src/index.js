require('dotenv').config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
} = require('discord.js');

const pingCommand = require('./commands/ping');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    // Slash command interaction
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return interaction.reply({
          content: '알 수 없는 명령어입니다.',
          ephemeral: true,
        });
      }

      return await command.execute(interaction);
    }

    // Button interaction
    if (interaction.isButton()) {
      if (interaction.customId === 'ping_button') {
        return await interaction.reply({
          content: '버튼 클릭 성공!',
          ephemeral: true,
        });
      }
    }
  } catch (error) {
    console.error(error);

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

client.login(process.env.DISCORD_TOKEN);
