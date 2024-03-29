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
    .setName('ban-sistem')
    .setDescription('Ban Sistemini Ayarla')
    .addStringOption(option =>
      option
        .setName('işlem')
        .setDescription('Yapmak İstediğiniz İşlem')
        .setRequired(true)
        .addChoices(
          { name: "ayarla", value: "sistem" },
          { name: "sıfırla", value: "sıfırla" }
        ))
    .addChannelOption(option =>
      option.setName('kanal')
        .setDescription('Ban Log Kanalını Ayarla')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText))
    .addRoleOption(option =>
      option.setName('yetkili')
        .setDescription('Ban Yetkilisini Ayarla')
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `Bu Komutu Kullanmak İçin \`Yönetici\` Yetkisi Lazım` })
    let islem = interaction.options.getString('işlem');
    let kanal = interaction.options.getChannel('kanal');
    let rol = interaction.options.getRole('yetkili');
    if (islem === "sistem") {
      db.set(`bansistem_${interaction.guild.id}`, true)
      db.set(`banlog_${interaction.guild.id}`, kanal.id)
      db.set(`banyetkili_${interaction.guild.id}`, rol.id)
      const ayarlandı = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Vectus", iconURL: interaction.user.avatarURL() })
        .setDescription(`Abone Sistemi Başarıyla Ayarlandı`)
        .addFields(
          { name: "Ban Log", value: `${kanal}`, inline: true },
          { name: "Ban Yetkili", value: `${rol}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: "Vectus", iconURL: "https://media.discordapp.net/attachments/944295908399538187/1138467462967464129/image.png" })
      interaction.reply({ embeds: [ayarlandı] })
    } else if (islem === 'sıfırla') {
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
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Ban Sistemini Sıfırlamak İstediğine Eminmisin!
      `)
      await interaction.reply({ embeds: [embed], components: [row] })
      const onay = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Ban Sistemi Sıfırlandı!
      `)
      const iptal = new EmbedBuilder()
        .setColor(0xff0000)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Ban Sistemini Sıfırlama İşlemi İptal Edildi!
      `)
      const collectorFilter = i => i.user.id === interaction.user.id;
      const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

      if (confirmation.customId === 'confirm') {
        db.delete(`bansistem_${interaction.guild.id}`)
        db.delete(`banlog_${interaction.guild.id}`)
        db.delete(`banyetkili_${interaction.guild.id}`)
        await interaction.editReply({ embeds: [onay], components: [] })
      } else if (confirmation.customId === 'cancel') {
        await interaction.editReply({ embeds: [iptal], components: [] });
      }
    }
  }
}