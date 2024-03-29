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
    .setName('sayaç')
    .setDescription('Sunucuya Katılan Üyeleri Sayar')
    .addStringOption(option =>
      option
        .setName('işlem')
        .setDescription('Yapmak İstediğiniz İşlem')
        .setRequired(true)
        .addChoices(
          { name: "ayarla", value: "kanal" },
          { name: "sıfırla", value: "sıfırla" },
        ))
    .addChannelOption(option =>
      option.setName('kanal')
        .setDescription('Sayaç Kanalını Ayarla')
        .addChannelTypes(ChannelType.GuildText))
    .addIntegerOption(option =>
      option
        .setName('hedef')
        .setDescription('Sayaç Hedefini Ayarla')),
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `Bu Komutu Kullanmak İçin \`Yönetici\` Yetkisi Lazım` })
    const sayacsayi = db.get(`sayac_${interaction.guild.id}`);
    const sayackanal = interaction.options.getChannel('kanal')
    const kmesaj = db.get(`sayacKM_${interaction.guild.id}`)
    const amesaj = db.get(`sayacAM_${interaction.guild.id}`)
    const islem = interaction.options.getString('işlem')
    const mesaj = interaction.options.getString('mesaj');
    const sayi = interaction.options.getInteger('hedef');
    const kanal = interaction.options.getChannel('kanal');

    if (islem === 'kanal') {
      if (!kanal) return await interaction.reply({ content: "Kanal Seçmediniz Lütfen Kanal Seçin!" })
      if (!sayi) return await interaction.reply({ content: "Sayaç Sayısını Girmediniz Lütfen Girin!" })
      if(sayi <= interaction.guild.memberCount) return await interaction.reply({ content: "Sayaç sayısını sunucu üye sayısından az veya eşit giremezsiniz!" })
      db.set(`sayacK_${interaction.guild.id}`, interaction.options.getChannel('kanal').id)
      db.set(`sayac_${interaction.guild.id}`, interaction.options.getInteger('hedef'))
      const embed = new EmbedBuilder()
        .setColor(0x00ffff)
        .setAuthor({ name: "Kanal Ayarlandı", iconURL: interaction.user.avatarURL() })
        .addFields(
          { name: "Sayaç Kanalı", value: `${interaction.options.getChannel('kanal')}`, inline: true },
          { name: "Sayaç Hedefi", value: `${interaction.options.getInteger('hedef')}`, inline: true },
        )
      await interaction.reply({ embeds: [embed] })
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
      Sayaç Sistemini Sıfırlamak İstediğine Eminmisin!
      `)
      await interaction.reply({ embeds: [embed], components: [row] })
      const onay = new EmbedBuilder()
        .setColor(0x00ff00)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Sayaç Sistemi Sıfırlandı!
      `)
      const iptal = new EmbedBuilder()
        .setColor(0xff0000)
        .setAuthor({ name: "Sıfırlama İşlemi", iconURL: interaction.user.avatarURL() })
        .setDescription(`
      Sayaç Sistemini Sıfırlama İşlemi İptal Edildi!
      `)
      const collectorFilter = i => i.user.id === interaction.user.id;
      const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

      if (confirmation.customId === 'confirm') {
        db.delete(`sayacAM_${interaction.guild.id}`)
        db.delete(`sayacKM_${interaction.guild.id}`)
        db.delete(`sayacK_${interaction.guild.id}`)
        db.delete(`sayac_${interaction.guild.id}`)
        await interaction.editReply({ embeds: [onay], components: [] })
      } else if (confirmation.customId === 'cancel') {
        await interaction.editReply({ embeds: [iptal], components: [] });
      }

    }

  }
}