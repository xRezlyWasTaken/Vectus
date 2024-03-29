const { Client, ActionRowBuilder, Collection, GatewayIntentBits, Partials, Events, EmbedBuilder, ShardingManager, AuditLogEvent, Embed, PermissionsBitField, ButtonBuilder, AttachmentBuilder } = require("discord.js");
const fs = require('fs')
const Discord = require('discord.js')
const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});
const config = require("./config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes, ChannelType, PermissionFlagsBits, ButtonStyle } = require('discord-api-types/v10');
const rache = require("rachedb")
const db = new rache({
  "dbName": "db", // DB dosya adımız.
  "dbFolder": "database", // DB klasör adımız.
  "noBlankData": true,
  "readable": true,
  "language": "tr" // "tr" veya "en" yazabilirsiniz
})
const ms = require('ms')

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(config.Bot.Token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

//command-handler
const commands = [];
fs.readdirSync('./commands/').forEach(async dir => {
  const commandFiles = readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${dir}/${file}`);
    console.log(`[ Carnoxis - Komut ] ${file} Yüklendi!`)
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);

  }
})

client.on("ready", async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
  } catch (error) {
    console.error(error);
  }
  console.log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
//

client.login(process.env.token)

client.on("guildCreate", async guild => {
   let entry = await guild.fetchAuditLogs({type: AuditLogEvent.BotAdd}).then(audit => audit.entries.first());
  let dogru = {
      NONE: "Sunucu Doğrulaması Yok.",
      LOW: "Düşük (E-posta Doğrulaması)",
      MEDIUM: "Orta (5 Dk Üyelik)",
      HIGH: "Yüksek (10 Dk Üyelik)",
      VERY_HIGH: "Çok Yüksek (Telefon Doğrulamalı)"
};
  var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
};
  let ses =
              guild.channels.cache.filter(chan => chan.type === ChannelType.Voice).size
let kanalsayı = guild.channels.cache.size
  let yazısayı = guild.channels.cache.filter(chan => chan.type === ChannelType.Text).size;
let duyurusayı = guild.channels.cache.filter(chan => chan.type === ChannelType.News).size;
let cotegory = guild.channels.cache.filter(chan => chan.type === ChannelType.Category).size
let zoom = guild.createdAt.getTime()
let hey = moment(zoom).fromNow()  

const embed = new EmbedBuilder()
.setColor("40ff00")
.setAuthor({name: "Sunucuya Eklendim!", iconURL: guild.iconURL()})
.addFields({name: "Sunucu İsmi", value: guild.name, inline: true})
.addFields({name: "Sunucu ID", value: guild.id, inline: true})
.addFields({name: "Sunucu Oluşturma Tarihi", value: `${moment(guild.createdAt).format("DD")} ${aylar[moment(guild.createdAt).format("MM")]} ${moment(guild.createdAt).format("YYYY")} (${hey})`, inline: true})
.addFields({name: "Sunucu Doğrulama Seviyesi", value: `${dogru[guild.verificationLevel]}`, inline: true})
.addFields({name: "Sunucudaki Üye Sayısı", value: `${guild.members.cache.size}`, inline: true})
.addFields({name: "Sahip ID", value: guild.owner.id, inline: true})
.addFields({name: "Sahip Etiket", value: `<@!${guild.owner.id}>`, inline: true})
.addFields({name: "Botu Ekleyen", value: `<@!${entry.executor.id}>`, inline: true})
.addFields({name: "Botu Ekleyen ID", value: entry.executor.id, inline: true})
.addFields({name: "Sunucudaki Rol Sayısı", value: guild.roles.cache.size, inline: true})
.addFields({name: "Sunucudaki Emoji Sayısı",value: guild.emojis.cache.size, inline: true})
.addFields({name: "Sunucudaki Kanal Sayısı", value: guild.channels.cache.size, inline: true})
.addFields({name: `**Kanallar:** [${kanalsayı}]`, value: `\n<a:twitchbit:801155287842947133> **${ses}** Sesli \n<a:altin2:801155295602409472> **${yazısayı}** Metin \n<:Megafon:840569906487492688> **${duyurusayı}** Duyuru \n<a:altin4:839474872471257090> **${cotegory}** Kategori`, inline: true})
client.channels.cache.get("843456245645049876").send({embeds: [embed]})
})
client.on("guildDelete", async guild => {
  let dogru = {
      NONE: "Sunucu Doğrulaması Yok.",
      LOW: "Düşük (E-posta Doğrulaması)",
      MEDIUM: "Orta (5 Dk Üyelik)",
      HIGH: "Yüksek (10 Dk Üyelik)",
      VERY_HIGH: "Çok Yüksek (Telefon Doğrulamalı)"
};
  var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
};
let zoom = guild.createdAt.getTime()
let hey = moment(zoom).fromNow()  
const embed = new EmbedBuilder()
.setColor("ff0000")
.setAuthor({name: "Sunucudan Atıldım!", iconURL: guild.iconURL()})
.addFields({name: "Sunucu İsmi", value: guild.name, inline: true})
.addFields({name: "Sunucu ID", value: guild.id, inline: true})
.addFields({name: "Sunucu Oluşturma Tarihi", value: `${moment(guild.createdAt).format("DD")} ${aylar[moment(guild.createdAt).format("MM")]} ${moment(guild.createdAt).format("YYYY")} (${hey})`, inline: true})
.addFields({name: "Sunucu Doğrulama Seviyesi", value: `${dogru[guild.verificationLevel]}`, inline: true})
.addFields({name: "Sunucudaki Üye Sayısı", value: `${guild.members.cache.size}`, inline: true})
.addFields({name: "Sahip ID", value: guild.owner.id, inline: true})
.addFields({name: "Sahip Etiket", value: `<@!${guild.owner.id}>`, inline: true})
.addFields({name: "Sunucudaki Rol Sayısı", value: guild.roles.cache.size, inline: true})
.addFields({name: "Sunucudaki Emoji Sayısı",value: guild.emojis.cache.size, inline: true})
.addFields({name: "Sunucudaki Kanal Sayısı", value: guild.channels.cache.size, inline: true})
client.channels.cache.get("843456245645049876").send({embeds: [embed]})
})

client.on('guildMemberAdd', async (member) => {
  let mute = "1131952188160233606"
  let mutelog = "1138906000313819327"
  let logkanal = member.guild.channels.cache.get(mutelog)
  let mutelimi = db.get(`muteli_${member.id}_${member.guild.id}`)
  let süre = db.get(`süre_${member.id}_${member.guild.id}`)
  if (!mutelimi) return;
  if (mutelimi == "true") {
    member.roles.add(mute)

    logkanal.send({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription(`${member} adlı üye susturuluyken sunucudan çık gir yaptığı için tekrar susturuldu`)] })
    setTimeout(function() {
      db.delete(`muteli_${member.guild.id + member.id}`)
      member.roles.remove(mute);
    }, ms(süre));
  }
})

client.on('guildMemberAdd', async (member) => {
  let sistem = db.get(`osistem_${member.guild.id}`)
  let rol = db.get(`otorol_${member.guild.id}`)
  let log = db.get(`otorollog_${member.guild.id}`)
  if (!sistem) return;
  let kanal = member.guild.channels.cache.get(log)
  let role = member.guild.roles.cache.get(rol)
  let sunucu = member.guild

  member.roles.add(role)
  kanal.send({
    content: `<:hg:843452045276086272> ${member} **Hoşgeldin!**\n<a:seviye:843471961316655105> Otomatik Rolün Verildi!\n<a:krmzyldz:843471834938867732> Seninle Beraber \`${sunucu.memberCount}\` kişiyiz! 
                       `
  })
})

client.on('messageDelete', async message => {
  const author = message.author
  if (!message.content) return;
  db.set(`snipe_${message.channel.id}`, {
    author: author,
    tag: author.username,
    content: message.content,
    ytarih: moment(message.createdAt),
    starih: moment(Date.now())
  });
  let snipes = db.get(`snipe_${message.channel.id}`)
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.startsWith(".afk")) return;
  if (message.mentions.users.first()) {
    let data = db.get(`afk-${message.mentions.users.first().id}`)
    if (!data) return;
    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`> **${message.mentions.users.first()} "${data.reason}" Sebebiyle <t:${Math.floor(data.time / 1000)}:R> AFK Moduna Geçiş Yaptı!**`).setColor("Random")] })
  } else
    if (db.has(`afk-${message.author.id}`)) {
      let data = db.get(`afk-${message.author.id}`)
      message.member.setNickname(data.nick).catch(err => { })
      db.delete(`afk-${message.author.id}`)
      return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`> **${message.member} Başarıyla AFK Modundan Çıkış Yaptın!**`).setColor("Random")] })
    }
})


const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioResource } = require('@discordjs/voice');
const player = createAudioPlayer();
const { join } = require('path')
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  let sistem = db.get(`seslihgsistem_${newState.guild.id}`)
  let sesli = db.get(`seslikanal_${newState.guild.id}`)
  let yetkili = db.get(`seslihgyetkili_${newState.guild.id}`)
  let kayıtsız = db.get(`seslihgkayıtsız_${newState.guild.id}`)
  if(!sistem) return;
  if(newState.member.roles.cache.has(kayıtsız)) {
  if (newState.member.user.bot || newState.channelId != sesli) return;
  if(newState.channelId == oldState.channelId) return;
  const connection = joinVoiceChannel({
    channelId: newState.channelId,
    guildId: newState.guild.id,
    adapterCreator: newState.guild.voiceAdapterCreator,
  });
  const resource = createAudioResource('./welcome.mp3');
  player.play(resource);

  connection.subscribe(player);
} else if (newState.member.roles.cache.has(yetkili)) {
  if (newState.member.user.bot || newState.channelId != sesli) return;
  if(newState.channelId == oldState.channelId) return;
  const connection = joinVoiceChannel({
    channelId: newState.channelId,
    guildId: newState.guild.id,
    adapterCreator: newState.guild.voiceAdapterCreator,
  });
  const resource = createAudioResource('./staff.mp3');
  player.play(resource);

  connection.subscribe(player);
}
})

client.on('roleCreate', async (role) => {
  let log = db.get(`rollog_${role.guild.id}`)
  if(!log) return;
  let entry = await role.guild.fetchAuditLogs({type: AuditLogEvent.RoleCreate}).then(audit => audit.entries.first())
         let user = client.users.cache.get(entry.executor.id)
         if(user.id === role.guild.ownerId) return
         if(user.id === client.user.id) return
         
role.delete()      
       client.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setDescription('Rol Koruma sistemi rolü sildi!').setTitle('Dikkat! Bir Rol Oluşturuldu').addFields(
        {name: "Rolü Oluşturan", value: `<@${user.id}>`, inline: true},
        {name: "Silinen Rol", value: `<@&${role.id}>`, inline: true},
       ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})   
         
})
client.on('roleDelete', async (role) => {
  let log = db.get(`rollog_${role.guild.id}`)
  if(!log) return;
  let entry = await role.guild.fetchAuditLogs({type: AuditLogEvent.RoleDelete}).then(audit => audit.entries.first())
         let user = client.users.cache.get(entry.executor.id)
         if(user.id === role.guild.ownerId) return
         if(user.id === client.user.id) return

         const rolePermissions = role.permissions.serialize()
         role.guild.roles.create( { name: role.name, color: role.color, position: role.position, permissions: role.permissions, icon: role.icon, reason : "Silinen rol geri açıldı."}).then(async rol => {
          client.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir Rol Silindi').setDescription(`Rol Koruma Sistemi Rolü Tekrar Oluşturdu`).addFields(
            {name: "Rolü Silen", value: `<@${user.id}>`, inline: true},
            {name: "Yeni Rol", value: `<@&${rol.id}>`, inline: true},
           ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})  
         }) 
          
})

client.on('channelCreate', async (role) => {
  let log = db.get(`kanallog_${role.guild.id}`)
  if(!log) return;
  let entry = await role.guild.fetchAuditLogs({type: AuditLogEvent.ChannelCreate}).then(audit => audit.entries.first())
         let user = client.users.cache.get(entry.executor.id)
         if(user.id === role.guild.ownerId) return
         if(user.id === client.user.id) return
    
         client.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setDescription('Kanal Koruma Sistemi Kanalı Sildi!').setTitle('Dikkat! Bir Kanal Silindi').addFields(
          {name: "Kanalı Oluşturan", value: `<@${user.id}>`, inline: true},
          {name: "Kanal", value: `${role.name}`, inline: true},
         ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})
role.delete()         
         
})
client.on('channelDelete', async (role) => {
  let log = db.get(`kanallog_${role.guild.id}`)
  if(!log) return;
  let entry = await role.guild.fetchAuditLogs({type: AuditLogEvent.ChannelDelete}).then(audit => audit.entries.first())
         let user = client.users.cache.get(entry.executor.id)
         if(user.id === role.guild.ownerId) return
         if(user.id === client.user.id) return
         
         //role.guild.channels.create( { name: role.name, type: ChannelType.GuildText, parent: role.parentId, position: role.rawPosition})
        role.clone().then(kanal => {
          client.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir Kanal Silindi').setDescription('Silinen Kanal Tekrar Oluşturuldu!').addFields(
            {name: "Kanalı Silen", value: `<@${user.id}>`, inline: true},
            {name: "Silinen Kanal", value: `${role.name}`, inline: true},
            {name: "Yeni Kanal", value: `<#${kanal.id}>`, inline: true},
          ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})   
        })
   
          
})

client.on('emojiDelete', async (emoji) => {
  let sistem = db.get(`emojikoruma_${emoji.guild.id}`)
  if(!sistem) return
  let entry = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiDelete }).then(audit => audit.entries.first())
  let user = emoji.guild.members.cache.get(entry.executor.id)
  
  if(user.id == client.user.id) return;
  if(user.id === emoji.guild.ownerId) return
  
  let channel = await db.get(`emojilog_${emoji.guild.id}`)
  
  await emoji.guild.emojis.create({ attachment: emoji.url, name: emoji.name})
  await emoji.guild.channels.cache.get(channel).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir Emoji Silindi').setDescription('Silinen Emoji Tekrar Oluşturuldu').addFields(
    {name: "Emojiyi Silen", value: `${user}`, inline: true},
    {name: "Yeni Emoji", value: `${emoji}`, inline: true},
    {name: "Yeni Emoji İsmi", value: `${emoji.name}`, inline: true},
  ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]}).catch(err => { })
  
  })
  client.on('emojiCreate', async (emoji) => {
    let sistem = db.get(`emojikoruma_${emoji.guild.id}`)
    if(!sistem) return
    let entry = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiCreate }).then(audit => audit.entries.first())
    let user = emoji.guild.members.cache.get(entry.executor.id)
    
    if(user.id == client.user.id) return;
    if(user.id === emoji.guild.ownerId) return
    
    let channel = await db.get(`emojilog_${emoji.guild.id}`)
    
    emoji.guild.channels.cache.get(channel).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir Emoji Oluşturuldu').setDescription('Oluşturulan Emoji Tekrar Silindi').addFields(
      {name: "Emojiyi Oluşturan", value: `${user}`, inline: true},
      {name: "Oluşturulan Emoji İsmi", value: `${emoji.name}`, inline: true},
    ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]}).catch(err => { })
    emoji.delete()
    
    })
  client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
    let sistem = db.get(`emojikoruma_${newEmoji.guild.id}`)
    if(!sistem) return
    let entry = await newEmoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiUpdate }).then(audit => audit.entries.first())
    let user = newEmoji.guild.members.cache.get(entry.executor.id)

    if(user.id == client.user.id) return;
    if(user.id === newEmoji.guild.ownerId) return
    
    let channel = await db.get(`emojilog_${newEmoji.guild.id}`)
    
    await newEmoji.guild.emojis.edit(newEmoji, {name: oldEmoji.name}).then(emoji => {
      newEmoji.guild.channels.cache.get(channel).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir Emoji Değiştirildi').setDescription('Değiştirilen Emoji Tekrar Oluşturuldu').addFields(
        {name: "Emojiyi Değiştiren", value: `${user}`, inline: true},
        {name: "Düzeltilen Emoji", value: `${emoji}`, inline: true},
        {name: "Düzeltilen Emoji İsmi", value: `${emoji.name}`, inline: true},
      ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]}).catch(err => { })
    })
    })
  
  client.on('guildMemberAdd', async (member) => {
    let log = db.get(`botlog_${member.guild.id}`)
    if (!log) return;
    if(!member.user.bot) return;

    let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.BotAdd }).then(audit => audit.entries.first())

    let logkanal = member.guild.channels.cache.get(log)
    logkanal.send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir bot sunucuya eklendi').setDescription('Bot Koruma sistemi başarıyla botu sunucudan attı!').addFields(
      {name: "Botu Ekleyen", value: `${entry.executor}`, inline: true},
      {name: "Eklenen Bot", value: `${member}`, inline: true},
    ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})
    member.kick()
  })

const küfür = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "Amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq"]

client.on(Events.MessageCreate, async (message) => {
  let sistem = db.get(`küfürengel_${message.guild.id}`)
  let log = db.get(`küfürlog_${message.guild.id}`)
  if (!sistem) return;

  let content = message.content.split(' ');
  content.forEach(word => {
    if(küfür.some(kelime => kelime === word)) {
      if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        message.delete({timeout: 1000});
        message.reply({content: "**Lütfen Küfür Etme!**"})
        message.guild.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir üye küfür etmeye çalıştı').setDescription('Küfür Engel Sistemi üyenin küfürünü sildi!').addFields(
          {name: "Küfürü Eden", value: `${message.member.user}`, inline: true},
          {name: "Küfür Mesajı", value: `|| ${message} ||`, inline: true},
        ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})
      }
    }
  })
})
client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
  let sistem = db.get(`küfürengel_${newMessage.guild.id}`)
  let log = db.get(`küfürlog_${newMessage.guild.id}`)
  if (!sistem) return;

  if(oldMessage != newMessage) {
    if(küfür.some(kelime => kelime == newMessage)) {
      if(!newMessage.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        newMessage.delete({timeout: 1000});
        newMessage.channel.send({content: "**Mesajı Editleyerek Küfür Etmene İzin Veremem!**"})
        newMessage.guild.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir üye mesajını düzenleyerek küfür etmeye çalıştı').setDescription('Küfür Engel Sistemi üyenin küfürünü sildi!').addFields(
          {name: "Küfürü Eden", value: `${newMessage.member.user}`, inline: true},
          {name: "Küfür Mesajı", value: `|| ${newMessage} ||`, inline: true},
        ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})
      }    
    }
  }
})

const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".rf", ".gd", ".az", ".party", ".gf", "gg/", "gg-"];

client.on(Events.MessageCreate, async (message) => {
  let sistem = db.get(`reklamengel_${message.guild.id}`)
  let log = db.get(`reklamlog_${message.guild.id}`)
  if (!sistem) return;

  let content = message.content.split(' ');
  content.forEach(word => {
    if(reklam.some(kelime => message.content.toLowerCase().includes(kelime))) {
      if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        message.delete({timeout: 1000});
        message.channel.send({content: "**Lütfen Reklam Yapma!**"}).then(x => x.delete({timeout:2000}))
        message.guild.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir üye reklam yapmaya çalıştı').setDescription('Reklam Engel Sistemi üyenin reklamını sildi!').addFields(
          {name: "Reklam Yapan", value: `${message.member.user}`, inline: true},
          {name: "Reklam Mesajı", value: `${message}`, inline: true},
        ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})
      }
    }
  })
})
client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
  let sistem = db.get(`reklamengel_${newMessage.guild.id}`)
  let log = db.get(`reklamlog_${newMessage.guild.id}`)
  if (!sistem) return;

  if(oldMessage != newMessage) {
    if(reklam.some(kelime => kelime == newMessage)) {
      if(!newMessage.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        newMessage.delete({timeout: 1000});
        newMessage.channel.send({content: "**Mesajı Editleyerek Reklam Yapmana İzin Veremem!**"}).then(x => x.delete({timeout:2000}))
        newMessage.guild.channels.cache.get(log).send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir üye mesajını düzenleyerek küfür etmeye çalıştı').setDescription('Küfür Engel Sistemi üyenin küfürünü sildi!').addFields(
          {name: "Reklam Yapan", value: `${newMessage.member.user}`, inline: true},
          {name: "Reklam Mesajı", value: `|| ${newMessage} ||`, inline: true},
        ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})
      }    
    }
  }
})

client.on(Events.WebhooksUpdate, async (channel) => {
  let sistem = db.get(`webhooksistem_${channel.guild.id}`)
  let log = db.get(`webhooklog_${channel.guild.id}`)
  let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.WebhookCreate }).then(audit => audit.entries.first())
  if(!sistem) return;
  if(entry.executor.id == channel.guild.ownerId) return;
  if(entry.executor.id == client.user.id) return;

  let logkanal = channel.guild.channels.cache.get(log)
  logkanal.send({embeds: [new EmbedBuilder().setColor(0xff0000).setTitle('Dikkat! Bir üye webhook açmaya çalıştı!').setDescription('Webhook Koruma Sistemi webhooku sildi').addFields(
    {name: "Kullanıcı Bilgisi", value: `**Kullanıcı:** ${entry.executor}\n **ID:** \`${entry.executor.id}\`\n **TAG:** \`${entry.executor.username}\``, inline: true},
    {name: "Webhooku Bilgisi", value: `**Webhook Kanalı:** <#${channel.id}>\n \`Webhook Silindi\`!`, inline: true},
  ).setThumbnail(client.user.displayAvatarURL()).setTimestamp().setFooter({text: "Vectus Koruma"})]})
  channel.fetchWebhooks().then((webhooks) => {
    webhooks.forEach((wh) => wh.delete());
});
})

const path = require('path')
const Canvas = require('canvas')
  , Font = Canvas.Font
client.on(Events.GuildMemberAdd, async (member) => {
  let sistem = db.get(`hg-bbsistem_${member.guild.id}`)
  let log = db.get(`hg-bblog_${member.guild.id}`)
  let logkanal = member.guild.channels.cache.get(log)
  if(!sistem) return;
  if(!log) return;
  const canvas = Canvas.createCanvas(1920, 1080)
  const ctx = canvas.getContext('2d')
  Canvas.registerFont('Vermin Vibes V.otf', { family: 'Vermin Vibes V'})

  const isim = member.user.username.toUpperCase()

  ctx.strokeText(`${isim}`, 800, 900)


  const arka = await Canvas.loadImage('./hg.png')
  ctx.drawImage(arka, 0, 0, canvas.width, canvas.height)

  ctx.font = '95px "Vermin Vibes V"'
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`${isim}`, 970, 176)

  ctx.font = '50px "Vermin Vibes V"'
  ctx.fillStyle = '#00FFFF'
  ctx.textAlign = 'star';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`Üye Sayısı: ${member.guild.memberCount}`, 1560, 1000)
  ctx.fillText(`📥`, 1310, 987)

  ctx.beginPath()
  ctx.arc(960, 483, 241, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()
  const uyepp = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "png" }))
  ctx.drawImage(uyepp, 719, 242, 482, 482)

  const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "31.png"})

  logkanal.send({ files: [attachment]})
})

client.on(Events.GuildMemberRemove, async (member) => {
  let sistem = db.get(`hg-bbsistem_${member.guild.id}`)
  let log = db.get(`hg-bblog_${member.guild.id}`)
  let logkanal = member.guild.channels.cache.get(log)
  if(!sistem) return;
  if(!log) return;
  const canvas = Canvas.createCanvas(1920, 1080)
  const ctx = canvas.getContext('2d')
  Canvas.registerFont('Vermin Vibes V.otf', { family: 'Vermin Vibes V'})

  const isim = member.user.username.toUpperCase()

  ctx.strokeText(`${isim}`, 800, 900)


  const arka = await Canvas.loadImage('./bb.png')
  ctx.drawImage(arka, 0, 0, canvas.width, canvas.height)

  ctx.font = '95px "Vermin Vibes V"'
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`${isim}`, 970, 176)

  ctx.font = '50px "Vermin Vibes V"'
  ctx.fillStyle = '#00FFFF'
  ctx.textAlign = 'star';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`Üye Sayısı: ${member.guild.memberCount}`, 1560, 1000)
  ctx.fillText(`📥`, 1310, 987)

  ctx.beginPath()
  ctx.arc(960, 483, 241, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()
  const uyepp = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "png" }))
  ctx.drawImage(uyepp, 719, 242, 482, 482)

  const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "31.png"})

  logkanal.send({ files: [attachment]})
})

const moment1 = require('moment-timezone')
client.on(Events.GuildMemberAdd, async (member) => {
  let sayac = await db.get(`sayac_${member.guild.id}`);
  if(!sayac) return;
  let skanal = await db.get(`sayacK_${member.guild.id}`);
  let logkanal = member.guild.channels.cache.get(skanal)
  if(!logkanal) return;

  const canvas = Canvas.createCanvas(1920, 1080)
  const ctx = canvas.getContext('2d')
  Canvas.registerFont('Vermin Vibes V.otf', { family: 'Vermin Vibes V'})
  

  const isim = member.user.username

  const arka = await Canvas.loadImage('./sayac-hg.png')
  ctx.drawImage(arka, 0, 0, canvas.width, canvas.height)

  if(member.guild.memberCount >= sayac) {
    ctx.font = '35px "Vermin Vibes V"'
    ctx.fillStyle = '#ff0000'
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#f5f5f5'
    ctx.fillText(`${isim}`, 360, 520)

    ctx.font = '55px "Vermin Vibes V"'
    ctx.fillStyle = '#00ffff'
    ctx.textAlign = 'center'
    ctx.fillText(`${sayac} kişi olduk! <:gzeltik:763772446654332968> Sayaç sıfırlandı!`, 1060, 902)
  
    ctx.font = '35px Arial'
    ctx.fillStyle = '#ff0000'
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#f5f5f5'
    ctx.fillText(`${moment1(member.user.createdTimestamp).locale('tr').tz("Europe/Istanbul").format("YYYY Do MMMM, h:mm:ss")}`, 1580, 517)

    ctx.beginPath()
    ctx.arc(960, 483, 241, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    const uyepp = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "png" }))
    ctx.drawImage(uyepp, 719, 242, 482, 482)

    const attachment1 = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "31.png"})
    logkanal.send({files: [attachment1]})
  } else {

  ctx.font = '55px "Vermin Vibes V"'
  ctx.fillStyle = '#00ffff'
  ctx.textAlign = 'center'
  ctx.fillText(`Hedef Üye: ${sayac} | Üye Sayısı: ${member.guild.memberCount} | Kalan: ${sayac - member.guild.memberCount}`, 1000, 902)

  ctx.font = '35px "Vermin Vibes V"'
  ctx.fillStyle = '#ff0000'
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`${isim}`, 360, 520)

  ctx.font = '35px Arial'
  ctx.fillStyle = '#ff0000'
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`${moment1(member.user.createdTimestamp).locale('tr').tz("Europe/Istanbul").format("YYYY Do MMMM, h:mm:ss")}`, 1580, 517)

  ctx.beginPath()
  ctx.arc(960, 483, 241, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()
  const uyepp = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "png" }))
  ctx.drawImage(uyepp, 719, 242, 482, 482)

  const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "31.png"})
  logkanal.send({files: [attachment]})
  }
})
client.on(Events.GuildMemberRemove, async (member) => {
  let sayac = await db.get(`sayac_${member.guild.id}`);
  let skanal = await db.get(`sayacK_${member.guild.id}`);
  let logkanal = member.guild.channels.cache.get(skanal)
  if(!skanal) return;
  if(!logkanal) return;
  const canvas = Canvas.createCanvas(1920, 1080)
  const ctx = canvas.getContext('2d')
  Canvas.registerFont('Vermin Vibes V.otf', { family: 'Vermin Vibes V'})

  const isim = member.user.username

  const arka = await Canvas.loadImage('./sayac-bb.png')
  ctx.drawImage(arka, 0, 0, canvas.width, canvas.height)

  ctx.font = '55px "Vermin Vibes V"'
  ctx.fillStyle = '#00ffff'
  ctx.textAlign = 'center'
  ctx.fillText(`Hedef Üye: ${sayac} | Üye Sayısı: ${member.guild.memberCount} | Kalan: ${sayac - member.guild.memberCount}`, 1000, 902)

  ctx.font = '35px "Vermin Vibes V"'
  ctx.fillStyle = '#ff0000'
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`${isim}`, 360, 520)

  ctx.font = '35px Arial'
  ctx.fillStyle = '#ff0000'
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#f5f5f5'
  ctx.fillText(`${moment1(member.user.createdTimestamp).locale('tr').tz("Europe/Istanbul").format("YYYY Do MMMM, h:mm:ss")}`, 1580, 517)

  ctx.beginPath()
  ctx.arc(960, 483, 241, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()
  const uyepp = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "png" }))
  ctx.drawImage(uyepp, 719, 242, 482, 482)

  const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "31.png"})
  logkanal.send({files: [attachment]})
})