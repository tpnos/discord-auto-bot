require('dotenv').config();

const { REST, Routes } = require('discord.js');
const pingCommand = require('./commands/ping');

const commands = [
  pingCommand.data.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function main() {
  const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

  if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
    throw new Error('DISCORD_TOKEN, CLIENT_ID, GUILD_ID를 .env에 모두 입력하세요.');
  }

  console.log('🔄 Slash command 등록 중...');

  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands },
  );

  console.log('✅ Slash command 등록 완료: /ping');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
