const { EmbedBuilder, ButtonBuilder, SlashCommandBuilder, ChannelType, ButtonStyle, ActionRowBuilder } = require('discord.js')
const Discord = require('discord.js')
const rache = require("rachedb")
const db = new rache({
  "dbName": "db", // DB dosya adımız.
  "dbFolder": "database", // DB klasör adımız.
  "noBlankData": true,
  "readable": true,
  "language": "tr" // "tr" veya "en" yazabilirsiniz
})

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Ban Kaldırıcı')
    .addUserOption(option =>
      option.setName('hedef')
        .setDescription('Lütfen Yasağı Kaldırılacak Hedefi Seçin')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.BanMembers),
  run: async (client, interaction) => {
        const yetkisiz = new EmbedBuilder()
      .setAuthor({ name: "Yetkisiz Kullanım!", iconURL: 'https://media.discordapp.net/attachments/944295908399538187/1138467462967464129/image.png' })
      .setDescription(`
    Bu Komutu Kullanamk İçin \`Üyeleri Yasakla\` Yetkisi Lazım!
    `)
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) return await interaction.reply({ embeds: [yetkisiz] })
    let hedef = interaction.options.getUser('hedef')

    const confirm = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Onayla')
      .setStyle(ButtonStyle.Success);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('İptal')
      .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder()
      .addComponents(cancel, confirm);
    const embed = new EmbedBuilder()
      .setColor(0x00ffff)
      .setAuthor({ name: "Yasak Kaldırma İşlemi", iconURL: interaction.user.avatarURL() })
      .setDescription(`
      Hey! <@!${interaction.user.id}>
      ${hedef} Adlı Üyenin
      **Yasağını Kaldırmak İstediğine Eminmisin?**
      `)
    await interaction.reply({ embeds: [embed], components: [row] })
    const onay = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({ name: "Yasak Kaldırma İşlemi", iconURL: interaction.user.avatarURL() })
      .setDescription(`
      Hey! <@!${interaction.user.id}>
      ${hedef} Yasaklaması Başarıyla Kaldırıldı!
      `)
    const iptal = new EmbedBuilder()
      .setColor(0xff0000)
      .setAuthor({ name: "Yasak Kaldırma İşlemi", iconURL: interaction.user.avatarURL() })
      .addFields(
        { name: "Ban Yetkilisi", value: `<@!${interaction.user.id}>`, inline: true },
        { name: "Yasaklamadan Kurtulamayan", value: `${hedef}`, inline: true }
      )
    const collectorFilter = i => i.user.id === interaction.user.id;
    const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

    if (confirmation.customId === 'confirm') {
        interaction.guild.members.unban(hedef)
        await interaction.editReply({ embeds: [onay], components: [] })
    } else if (confirmation.customId === 'cancel') {
      await interaction.editReply({ embeds: [iptal], components: [] });
    }
  }
}