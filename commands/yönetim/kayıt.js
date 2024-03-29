const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js')
const ayarlar = require('../../config.js')
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
    .setName('kayıt')
    .setDescription('Kayıt Komutu')
    .addUserOption(option =>
      option.setName('hedef')
        .setDescription('Kayıt Edilecek Hedef')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('isim')
        .setDescription('Hedefin İsmi')
        .setRequired(true)
        .setMaxLength(12)
    )
    .addIntegerOption(option =>
      option.setName('yaş')
        .setDescription('Hedefin Yaşı')
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    let yetkili = db.get(`kayıtyetkili_${interaction.guild.id}`)
    let log = db.get(`kayıtlog_${interaction.guild.id}`)
    let erkek = db.get(`erkekrol_${interaction.guild.id}`)
    let kadın = db.get(`kadınrol_${interaction.guild.id}`)
    let tagData = db.get(`tag-${interaction.guild.id}`)
    let taglıalım = db.get(`kayıttag_${interaction.guild.id}`)
    let chat = db.get(`kayıtchat_${interaction.guild.id}`)
    if (!interaction.member.roles.cache.has(yetkili)) return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] })

    const confirm = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Erkek')
      .setEmoji("🚹")
      .setStyle(ButtonStyle.Secondary);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Kadın')
      .setEmoji("🚺")
      .setStyle(ButtonStyle.Secondary);
    const sil = new ButtonBuilder()
      .setCustomId('iptal')
      .setLabel('İptal')
      .setEmoji("❌")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder()
      .addComponents(confirm, cancel, sil);

    let member = interaction.options.getUser('hedef')
    let user = interaction.guild.members.cache.get(member.id)
    let name = interaction.options.getString('isim')
    let age = interaction.options.getInteger('yaş')

    if (user.roles.cache.get(erkek) || user.roles.cache.get(kadın)) return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`> **Kayıtlı Bir Kullanıcıyı Tekrar Kayıt Edemezsin!**`)] })
    if (user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`> **İşlem Geçersiz Senden Üst/Aynı Pozisyonda Birisini Kayıt Edemezsin!**`)] })
    let Name2 = name.toLocaleLowerCase()[0].toUpperCase() + name.toLocaleLowerCase().substring(1);
    const kyapan = await client.users.fetch(interaction.user.id)
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(0x00ffff)
          .setAuthor({ name: "Kayıt", iconURL: interaction.user.avatarURL() })
          .setDescription(`> **Kullanıcının ismi** \`${taglıalım ?? ""} ${Name2}${age ? ` | ${age}` : ""}\` **Olarak Değiştirilecek!**\n> **Butonlardan Kullanıcının Cinsiyetini Seçiniz.**\n> Kayıt Edilecek Üye ${member}`)
      ],
      components: [row]
    })
    const filter = i => i.user.id === interaction.user.id;
    const confirmation = await interaction.channel.awaitMessageComponent({ filter: filter, time: 60000 });

    if (confirmation.customId === 'confirm') {
      db.add(`erkek-${interaction.user.id}`, 1)
      db.push(`isimler-${member.id}`, `\`${taglıalım ?? ""} ${Name2}${age ? ` | ${age}` : ""}\` (${erkek} <t:${Math.floor(Date.now() / 1000)}> - ${kyapan.username})`);
      db.push(`kayıtlar-${interaction.user.id}`, `\`${taglıalım ?? ""} ${Name2}${age ? ` | ${age}` : ""}\` (${erkek} <t:${Math.floor(Date.now() / 1000)}>)`);
      if (tagData && tagData.some(tag => member.user.displayName.includes(tag))) {

        await user.roles.set([...erkek])
        await user.setNickname(`${taglıalım ?? ""} ${Name2} | ${age}`).catch(e => { console.log(e) })

      } else {

        await user.setNickname(`${taglıalım ?? ""} ${Name2} | ${age}`).catch(e => { console.log(e) })

        await user.roles.set([erkek])
        interaction.guild.channels.cache.get(log).send({ embeds: [new EmbedBuilder().setDescription(`> **<@${member.id}> Kullanıcının ismi** \`${taglıalım ?? ""} ${Name2}${age ? ` | ${age}` : ""}\` **Olarak Değiştirildi** <@&${erkek}> Rolü Verilerek Kayıt Edildi.**`)] })
        await interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`> **<@${member.id}> Kullanıcının ismi** \`${taglıalım ?? ""} ${Name2}${age ? ` | ${age}` : ""}\` **Olarak Değiştirildi** <@&${erkek}> Rolü Verilerek Kayıt Edildi.**`)], components: [] })
        if (interaction.guild.channels.cache.get(chat)) interaction.guild.channels.cache.get(chat).send({ content: `> **${member} Aramıza Hoşgeldin!**` })

      }
    } else if (confirmation.customId === 'cancel') {
      db.add(`kadın-${interaction.user.id}`, 1)
      db.push(`isimler-${member.id}`, `\`${taglıalım ?? ""} ${Name2}${age ? ` | ${age}` : ""}\` (${kadın} <t:${Math.floor(Date.now() / 1000)}> - ${kyapan.username})`);
      db.push(`kayıtlar-${interaction.user.id}`, `\`${taglıalım ?? ""} ${Name2}${age ? ` | ${age}` : ""}\` (${kadın} <t:${Math.floor(Date.now() / 1000)}>)`);
      if (tagData && tagData.some(tag => member.user.displayName.includes(tag))) {

        await user.roles.set([...kadın])
        await user.setNickname(`${taglıalım ?? ""} ${Name2} | ${age}`).catch(e => { console.log(e) })

      } else {

        await user.setNickname(`${taglıalım ?? ""} ${Name2} | ${age}`).catch(e => { console.log(e) })

        await user.roles.set([kadın])
        interaction.guild.channels.cache.get(log).send({ embeds: [new EmbedBuilder().setDescription(`> **<@${member.id}> Kullanıcının ismi** \`${taglıalım ?? ""} ${Name2} | ${age}\` **Olarak Değiştirildi** <@&${kadın}> Rolü Verilerek Kayıt Edildi.**`)] })
        await interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`> **<@${member.id}> Kullanıcının ismi** \`${taglıalım ?? ""} ${Name2} | ${age}\` **Olarak Değiştirildi** <@&${kadın}> Rolü Verilerek Kayıt Edildi.**`)], components: [] })
        if (interaction.guild.channels.cache.get(chat)) interaction.guild.channels.cache.get(chat).send({ content: `> **${member} Aramıza Hoşgeldin!**` })

      }
    } else if (confirmation.customId === 'iptal') {
      await interaction.guild.members.cache.get(member.id).setNickname(`${taglıalım ?? ""} İsim | Yaş`)
      await interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`> **İşlem Başarıyla İptal Edildi!**`)], components: [] })
    }
  }
}