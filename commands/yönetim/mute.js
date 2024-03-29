const { EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require("discord.js");
const ms = require('ms');
const moment = require('moment');
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
    .setName('mute')
    .setDescription('İstediğiniz Kişiyi Sustur.')
    .addUserOption(option =>
      option
        .setName('hedef')
        .setDescription('Susturulucak hedefi seçin')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('zaman')
        .setDescription('Mute Süresini Yazın')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Sebebi Belirtin')
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    let member = interaction.options.getUser('hedef')
    let user = interaction.guild.members.cache.get(member.id)
    let zaman = interaction.options.getString('zaman')
    let sebep = interaction.options.getString('sebep')


    let mutelog = db.get(`mutelog_${interaction.guild.id}`)
    let logChannel = await interaction.guild.channels.cache.get(mutelog);
    let mutelirol = db.get(`mutelirol_${interaction.guild.id}`)
    let muteci = db.get(`muteyetkili_${interaction.guild.id}`)

    if (!interaction.member.roles.cache.has(muteci)) return interaction.reply({embeds: [
      new EmbedBuilder()
        .setAuthor({ name: "Vectus", avatarURL: "" })
        .setDescription(`
<a:twitchbit:793899916614828062> Bu komudu kullanabilmen için <@&${muteci}> adlı role sahip olman lazım!
`)
        .setFooter({ text: "Vectus", avatarURL: interaction.user.avatarURL() })
        .setTimestamp()
      ]})


    let argument_one = ['saniye', 'dakika', 'saat', 'gün'];

    let zaman1 = interaction.options.getString('zaman')
      .replace('saniye', 'seconds')
      .replace('dakika', 'minutes')
      .replace('saat', 'hours')
      .replace('gün', 'day')

    let reason = 'Bir sebep girilmemiş.';
    if (zaman) reason = sebep
    let end = Date.now() + ms(zaman1);

    db.set(`muteli_${member.id}_${interaction.guild.id}`, true)
    db.set(`süre_${member.id}_${interaction.guild.id}`, zaman1)
    user.roles.add(mutelirol);
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) })
      .setTitle('Birisi susturuldu!')
      .setColor(0xff0000)
      .setDescription(`**• Moderatör**: ${interaction.user}
**• Susturulan**: ${user}
**• Sebep**: ${reason}
**• Bitiş zamanı:**: ${zaman}`);
    await interaction.reply({ content: `Başarılı, ***${member.username}*** susturuldu.` });
    logChannel.send({ embeds: [embed] })
    setTimeout(() => {
      return user.roles.remove(mutelirol).then(() => db.set(`muteli_${member.id}_${interaction.guild.id}`, false) && logChannel.send({
        embeds: [embed.setColor(0x00ff00).setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: ${interaction.user}
**• Susturulan**: ${user}
**• Sebep**: ${reason}`)]
      }));
    }, ms(zaman1));


  }
}