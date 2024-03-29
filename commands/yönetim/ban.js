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
    .setName('ban')
    .setDescription('Ban Atıcı')
    .addUserOption(option =>
      option.setName('hedef')
        .setDescription('Lütfen Banlanıcak Hedefi Seçin')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Sebep Giriniz (opsiyonel)')

    )
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.BanMembers),
  run: async (client, interaction) => {

    var sarilmak = ["https://cdn.discordapp.com/attachments/854117147146715146/1139685808094335059/200w.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1139685827325202543/bongocat-banhammer.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1139685858228850688/falling-funny-people-ban-hammer-ifg0194r7gtbqzgx.gif", "https://cdn.discordapp.com/attachments/854117147146715146/1139685869377290250/banned-and-you-are-banned.gif"];

    let random = sarilmak[Math.floor(Math.random() * sarilmak.length)]
    let sistem = db.get(`bansistem_${interaction.guild.id}`)
    if (sistem === true) {
    let yetkili = db.get(`banyetkili_${interaction.guild.id}`)
    let log = db.get(`banlog_${interaction.guild.id}`)
    const yetkisiz = new EmbedBuilder()
      .setAuthor({ name: "Yetkisiz Kullanım!", iconURL: 'https://media.discordapp.net/attachments/944295908399538187/1138467462967464129/image.png' })
      .setDescription(`
    Bu Komutu Kullanamk İçin @&${yetkili}> Rolü Lazım!
    `)
    if (!interaction.member.roles.cache.has(yetkili)) return await interaction.reply({ embeds: [yetkisiz] })
    let hedef = interaction.options.getUser('hedef')
    let sebep = interaction.options.getString('sebep')

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
      .setAuthor({ name: "Yasaklama İşlemi", iconURL: interaction.user.avatarURL() })
      .setDescription(`
      Hey! <@!${interaction.user.id}>
      ${hedef} Adlı Üyeyi \`${sebep ?? "Sebep Girilmemiş"}\` Sebebiyle
      **Banlamak İstediğine Eminmisin?**
      `)
    await interaction.reply({ embeds: [embed], components: [row] })
    const onay = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({ name: "Yasaklama İşlemi", iconURL: interaction.user.avatarURL() })
      .setDescription(`
      Hey! <@!${interaction.user.id}>
      ${hedef} Başarıyla Banlandı!
      `)
      .setImage(random)
    const log1 = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({ name: "Yasaklama İşlemi", iconURL: interaction.user.avatarURL() })
      .addFields(
        { name: "Ban Yetkilisi", value: `<@!${interaction.user.id}>`, inline: true },
        { name: "Banlanan", value: `${hedef}`, inline: true }
      )
    const iptal = new EmbedBuilder()
      .setColor(0xff0000)
      .setAuthor({ name: "Yasaklama İşlemi", iconURL: interaction.user.avatarURL() })
      .addFields(
        { name: "Ban Yetkilisi", value: `<@!${interaction.user.id}>`, inline: true },
        { name: "Yasaklamadan Kurtulan", value: `${hedef}`, inline: true }
      )
    const collectorFilter = i => i.user.id === interaction.user.id;
    const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

    if (confirmation.customId === 'confirm') {
      if (!log) {
        interaction.guild.members.ban(hedef)
        await interaction.editReply({ embeds: [onay], components: [] })
      } else {
        interaction.guild.members.ban(hedef)
        await interaction.editReply({ embeds: [onay], components: [] })
        await interaction.guild.channels.cache.get(log).send({ embeds: [log1] })
      }
    } else if (confirmation.customId === 'cancel') {
      await interaction.editReply({ embeds: [iptal], components: [] });
    }
    } else {
        const yetkisiz = new EmbedBuilder()
      .setAuthor({ name: "Yetkisiz Kullanım!", iconURL: 'https://media.discordapp.net/attachments/944295908399538187/1138467462967464129/image.png' })
      .setDescription(`
    Bu Komutu Kullanamk İçin \`Üyeleri Yasakla\` Yetkisi Lazım!
    `)
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) return await interaction.reply({ embeds: [yetkisiz] })
    let hedef = interaction.options.getUser('hedef')
    let sebep = interaction.options.getString('sebep')

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
      .setAuthor({ name: "Yasaklama İşlemi", iconURL: interaction.user.avatarURL() })
      .setDescription(`
      Hey! <@!${interaction.user.id}>
      ${hedef} Adlı Üyeyi \`${sebep ?? "Sebep Girilmemiş"}\` Sebebiyle
      **Banlamak İstediğine Eminmisin?**
      `)
    await interaction.reply({ embeds: [embed], components: [row] })
    const onay = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({ name: "Yasaklama İşlemi", iconURL: interaction.user.avatarURL() })
      .setDescription(`
      Hey! <@!${interaction.user.id}>
      ${hedef} Başarıyla Banlandı!
      `)
      .setImage(random)
    const iptal = new EmbedBuilder()
      .setColor(0xff0000)
      .setAuthor({ name: "Yasaklama İşlemi", iconURL: interaction.user.avatarURL() })
      .addFields(
        { name: "Ban Yetkilisi", value: `<@!${interaction.user.id}>`, inline: true },
        { name: "Yasaklamadan Kurtulan", value: `${hedef}`, inline: true }
      )
    const collectorFilter = i => i.user.id === interaction.user.id;
    const confirmation = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

    if (confirmation.customId === 'confirm') {
        interaction.guild.members.ban(hedef)
        await interaction.editReply({ embeds: [onay], components: [] })
    } else if (confirmation.customId === 'cancel') {
      await interaction.editReply({ embeds: [iptal], components: [] });
    }
    }
  }
}