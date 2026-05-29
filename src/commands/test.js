const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('테스트')
    .setDescription('봇 작동 여부를 테스트합니다.'),
  async execute(interaction) {
    await interaction.reply('Codex 자동화 세팅 완료! 이제 제가 직접 관리합니다.');
  },
};
