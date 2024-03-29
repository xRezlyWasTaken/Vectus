const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('İstediğiniz Kişinin Avatarını Atar.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('Avatarını Almak İstediğin Kişiyi Seç')),
  run: async (client, interaction) => {
    let user = interaction.options.getUser('hedef') ?? interaction.user;
    let userAvatar = user.displayAvatarURL({ size: 512 })

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'ın Avatarı'`)
      .setImage(`${userAvatar}`)
      .setTimestamp()

    const button = new ButtonBuilder()
      .setLabel('PNG Link')
      .setStyle(ButtonStyle.Link)
      .setURL(`${user.displayAvatarURL({ size: 512 }).replace("png")}`)

    const button1 = new ButtonBuilder()
      .setLabel('GIF Link')
      .setStyle(ButtonStyle.Link)
      .setURL(`${user.displayAvatarURL({ dynamic: true, size: 512 }).replace("gif")}`)

    const row = new ActionRowBuilder().addComponents(button, button1)

    await interaction.reply({
      embeds: [embed],
      components: [row]
    })
  }
}