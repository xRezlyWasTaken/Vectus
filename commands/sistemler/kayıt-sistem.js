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
    .setName('kayıt-sistem')
    .setDescription('Kayıt Sistemini Ayarla')
    .addSubcommand(subcommand => 
      subcommand.setName('ayarla')
      .setDescription('Kayıt Sistemini Ayarla')
      .addChannelOption(option =>
        option.setName('log')
          .setDescription('Kayıt Log Kanalını Ayarla')
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText))
      .addRoleOption(option =>
        option.setName('yetkili')
          .setDescription('Kayıt Yetkilisini Ayarla')
          .setRequired(true))
      .addRoleOption(option =>
          option.setName('kayıtsız-rol')
          .setDescription('Kayıtsız Rolünü Ayarla')
          .setRequired(true))
      .addRoleOption(option =>
          option.setName('erkek-rol')
          .setDescription('Erkek Rolünü Ayarla')
          .setRequired(true))
      .addRoleOption(option =>
          option.setName('kadın-rol')
          .setDescription('Kadın Rolünü Ayarla')
          .setRequired(true))
      .addChannelOption(option =>
        option.setName('chat')
        .setDescription('Chat Kanalını Ayarla')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
      .addChannelOption(option =>
        option.setName('kayıt-kanal')
        .setDescription('Kayıt Yapılacak Kanalı Ayarla')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
      )
    .addSubcommand(subcommand =>
      subcommand.setName('sıfırla')
      .setDescription('Kayıt Sistemini Sıfırla'))
    .addSubcommand(subcommand => 
      subcommand.setName('taglı-alım')
      .setDescription('Taglı Alımı Ayarla')
      .addStringOption(option => option.setName('tag').setDescription('Lütfen Tagınızı Giriniz').setMaxLength(2).setRequired(true))
      ),
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `Bu Komutu Kullanmak İçin \`Yönetici\` Yetkisi Lazım` })
    let islem = interaction.options.getSubcommand()
    let kanal = interaction.options.getChannel('log');
    let rol = interaction.options.getRole('yetkili');
    let kayıtsız = interaction.options.getRole('kayıtsız-rol')
    let erkek = interaction.options.getRole('erkek-rol')
    let kadın = interaction.options.getRole('kadın-rol')
    let chat = interaction.options.getChannel('chat')
    let kayıtkanal = interaction.options.getChannel('kayıt-kanal')
    let taglıalım = interaction.options.getString('tag')
    if (islem === "ayarla") {
      db.set(`kayıtsistem_${interaction.guild.id}`, true)
      db.set(`kayıtlog_${interaction.guild.id}`, kanal.id)
      db.set(`kayıtyetkili_${interaction.guild.id}`, rol.id)
      db.set(`kayıtsızrol_${interaction.guild.id}`, kayıtsız.id)
      db.set(`erkekrol_${interaction.guild.id}`, erkek.id)
      db.set(`kadınrol_${interaction.guild.id}`, kadın.id)
      db.set(`kayıtchat_${interaction.guild.id}`, chat.id)
      db.set(`kayıtkanal_${interaction.guild.id}`, kayıtkanal.id)
      const ayarlandı = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Vectus", iconURL: interaction.user.avatarURL() })
        .setDescription(`Kayıt Sistemi Başarıyla Ayarlandı`)
        .addFields(
            { name: "Kayıt Log", value: `${kanal}`, inline: true },
            { name: "Kayıt Yetkili", value: `${rol}`, inline: true },
            { name: "Kayıtsız Rol", value: `${kayıtsız}`, inline: true },
            { name: "Erkek Rol", value: `${erkek}`, inline: true },
            { name: "Kadın Rol", value: `${kadın}`, inline: true },
            { name: "Kayıt Chat", value: `${chat}`, inline: true },
            { name: "Kayıt Kanal", value: `${kayıtkanal}`, inline: true },
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
      Kayıt Sistemini Sıfırlamak İstediğine Eminmisin!
      `)
      await interaction.reply({ embeds: [embed], components: [row] })
      const onay = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Kayıt Sistemi Sıfırlandı!
      `)
      const iptal = new EmbedBuilder()
        .setColor(0xff0000)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Kayıt Sistemini Sıfırlama İşlemi İptal Edildi!
      `)
      const collectorFilter = i => i.user.id === interaction.user.id;
      const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

      if (confirmation.customId === 'confirm') {
        db.delete(`kayıtsistem_${interaction.guild.id}`)
        db.delete(`kayıtlog_${interaction.guild.id}`)
        db.delete(`kayıtyetkili_${interaction.guild.id}`)
        db.delete(`kayıtsızrol_${interaction.guild.id}`)
        db.delete(`erkekrol_${interaction.guild.id}`)
        db.delete(`kadınrol_${interaction.guild.id}`)
        db.delete(`kayıtchat_${interaction.guild.id}`)
        db.delete(`kayıtkanal_${interaction.guild.id}`)
        db.delete(`kayıttag_${interaction.guild.id}`)
        await interaction.editReply({ embeds: [onay], components: [] })
      } else if (confirmation.customId === 'cancel') {
        await interaction.editReply({ embeds: [iptal], components: [] });
      }
    } else if(islem === "taglı-alım") {
      db.set(`kayıttag_${interaction.guild.id}`, taglıalım)
      const ayarlandı = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Vectus", iconURL: interaction.user.avatarURL() })
        .setDescription(`Taglı Alım Başarıyla Ayarlandı`)
        .addFields(
            { name: "Ayarlanan Tag", value: `${taglıalım}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: "Vectus", iconURL: "https://media.discordapp.net/attachments/944295908399538187/1138467462967464129/image.png" })
      interaction.reply({ embeds: [ayarlandı] })
    }
  }
}