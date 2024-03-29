const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sunucu-bilgi')
    .setDescription('Hedef Üyenin Bilgileri'),
  run: async (client, interaction) => {
    const sunucu = interaction.guild
    let rolsayı = sunucu.roles.cache.size - 1
    let rahatsız = sunucu.members.cache.filter(dnd => dnd.presence && (dnd.presence.status == "dnd")).size
    let boşta = sunucu.members.cache.filter(idle => idle.presence && (idle.presence.status == "idle")).size
    let aktif = sunucu.members.cache.filter(idle => idle.presence && (idle.presence.status == "online")).size
    let görünmez = sunucu.members.cache.filter(offline => offline.presence && (offline.presence.status ==  "offline")).size
    let botsayı = sunucu.members.cache.filter(m => m.user.bot).size;
    let yazısayı = sunucu.channels.cache.filter(chan => chan.type === ChannelType.GuildVoice).size;
    let duyurusayı = sunucu.channels.cache.filter(chan => chan.type === ChannelType.GuildNews).size;
    let cotegory = sunucu.channels.cache.filter(chan => chan.type === ChannelType.GuildCategory).size
let ses = sunucu.channels.cache.filter(chan => chan.type === ChannelType.GuildVoice).size
let emojisayı = sunucu.emojis.cache.size
    let kanalsayı = sunucu.channels.cache.size
let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    sunucu.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let roller = sunucu.roles.cache.map(r => r).join(' ') ? sunucu.roles.cache.map(r => r).join(', ') : "Hiç Rol Yok"
    if(rolsayı > 20) {
    roller = "Sunucunun Rolleri Çok Fazla!"
    } else {
      roller = sunucu.roles.cache.map(r => r).join(' ') ? sunucu.roles.cache.map(r => r).join(', ') : "Hiç Rol Yok"
    }
    let ppurl = interaction.guild.iconURL({dynamic: true})
if(ppurl == null) {
ppurl = "https://media.discordapp.net/attachments/1177688438158405652/1190005146961322034/Discord-Profil-Fotografi-Buyutme-Nasil-Yapilir.png"
} else {
  ppurl = interaction.guild.iconURL({dynamic: true})
}
    const avatar = new ButtonBuilder()
      .setLabel('PP Url')
      .setStyle(ButtonStyle.Link)
      .setURL(ppurl)

    const butonlar = new ActionRowBuilder().addComponents(avatar)

    const embed = new EmbedBuilder()
      .setColor(0x00ffff)
      .addFields(
        { name: "<a:tac2:802309471296290817> Sunucu İsmi", value: `${sunucu.name}`, inline: true },
        { name: ":id: Sunucunun ID'si", value: `${sunucu.id}`, inline: true },
        { name: ":bust_in_silhouette: Sunucu Sahibi", value: `<@!${sunucu.ownerId}>`, inline: true },
        { name: ":zzz: K.U Kanalı ", value: `${sunucu.afkChannel ?? "Ayarlanmamış"}`, inline: true },
        { name: ":stopwatch: K.U Zaman Aşımı", value: `${sunucu.afkTimeout}`, inline: true },
        { name: `:shield: Doğrulama Seviyesi`, value: `${sunucu.verificationLevel}`, inline: true},
        { name: "<a:boost:843471830157361173> Boost Sayısı", value: `${sunucu.premiumSubscriptionCount}`, inline: true },
        { name: `<a:twitchbit:801155287842947133> Üyeler: [${sunucu.memberCount}]`, value: `\n<a:tamam:806136101529059338> **${aktif}** Çevrim içi \n<a:bekle:806136101244239882> **${boşta}** Boşta \n<a:dnd:840568452052811776> **${rahatsız}** Rahatsız etmeyin \n<a:offline:840568568004345916> **${görünmez}** Çevrım dışı \n:robot: **${botsayı}** Bot`, inline: true },
        { name: `<:okiareti:839814512915906580> Emojiler: [${emojisayı}]`, value: `\n**${Animated}** Hareketli \n**${EmojiCount}** Hareketsiz`, inline: true },
        { name: `<a:seviye:843471961316655105> Kanallar: [${kanalsayı}]`, value: `\n<a:twitchbit:801155287842947133> **${ses}** Sesli \n<a:altin2:801155295602409472> **${yazısayı}** Metin \n<:Megafon:840569906487492688> **${duyurusayı}** Duyuru \n<a:altin4:843472088126717952> **${cotegory}** Kategori`, inline: true },
        { name: `<a:altin2:801155295602409472> Roller: [${rolsayı}]`, value: `${roller}`, inline: true},
        { name: `<a:altin2:801155295602409472> Sunucu Oluşturma Tarihi`, value: `<t:${parseInt(sunucu.createdTimestamp / 1000)}> (<t:${parseInt(sunucu.createdTimestamp / 1000)}:R>)`, inline: true},
      )
      .setThumbnail(sunucu.iconURL({ dynamic: true }))
      .setTitle(`${sunucu.name} Bilgileri`)
      .setImage(interaction.guild.bannerURL())

    interaction.reply({
      embeds: [embed],
      components: [butonlar]
    });
  }
}