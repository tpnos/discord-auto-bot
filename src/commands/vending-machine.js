const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('자판기생성')
    .setDescription('자동 판매 자판기를 생성합니다.'),

  async execute(interaction) {
    console.log('[command:vending-machine] execute start');

    const embed = new EmbedBuilder()
      .setTitle('구매하기')
      .setDescription('24시간 자동 판매 자판기 입니다')
      .setColor(0xe02f3f);

    const infoButton = new ButtonBuilder()
      .setCustomId('vending_info')
      .setEmoji('👤')
      .setLabel('내 정보')
      .setStyle(ButtonStyle.Danger);

    const chargeButton = new ButtonBuilder()
      .setCustomId('vending_charge')
      .setEmoji('💳')
      .setLabel('충전')
      .setStyle(ButtonStyle.Danger);

    const buyButton = new ButtonBuilder()
      .setCustomId('vending_buy')
      .setEmoji('🛒')
      .setLabel('구매')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(
      infoButton,
      chargeButton,
      buyButton,
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });

    console.log('[command:vending-machine] reply sent');
  },
};
