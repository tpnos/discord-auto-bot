const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('봇이 정상 작동하는지 확인합니다.'),

  async execute(interaction) {
    const button = new ButtonBuilder()
      .setCustomId('ping_button')
      .setLabel('버튼 테스트')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      content: 'Pong! 봇이 정상 작동 중입니다.',
      components: [row],
    });
  },
};
