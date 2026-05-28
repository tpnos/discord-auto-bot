require('dotenv').config();

const { REST, Routes } = require('discord.js');
const pingCommand = require('./commands/ping');
const vendingMachineCommand = require('./commands/vending-machine');
const testCommand = require('./commands/test');

const commands = [
  pingCommand.data.toJSON(),
  vendingMachineCommand.data.toJSON(),
  testCommand.data.toJSON(),
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

  console.log(`✅ Slash command 등록 완료: ${commands.map(c => `/${c.name}`).join(', ')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
