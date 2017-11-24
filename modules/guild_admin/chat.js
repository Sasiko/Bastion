/**
 * @file chat command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = async (Bastion, message) => {
  if (!message.member.hasPermission(this.help.userTextPermission)) {
    /**
     * User has missing permissions.
     * @fires userMissingPermissions
     */
    return Bastion.emit('userMissingPermissions', this.help.userTextPermission);
  }

  if (!Bastion.credentials.cleverbotAPIkey) {
    /**
     * Error condition is encountered.
     * @fires error
     */
    return Bastion.emit('error', Bastion.strings.error(message.guild.language, 'noCredentials'), Bastion.strings.error(message.guild.language, 'noCredentials', true, 'Cleverbot API'), message.channel);
  }

  try {
    let guildSettings = await Bastion.db.get(`SELECT chat FROM guildSettings WHERE guildID=${message.guild.id}`);

    let color, chatStats;
    if (guildSettings.chat) {
      await Bastion.db.run(`UPDATE guildSettings SET chat=0 WHERE guildID=${message.guild.id}`);
      color = Bastion.colors.RED;
      chatStats = 'Disabled chat in this server. Now I\'m gonna miss talking with you. :disappointed:';
    }
    else {
      await Bastion.db.run(`UPDATE guildSettings SET chat=1 WHERE guildID=${message.guild.id}`);
      color = Bastion.colors.GREEN;
      chatStats = 'Enabled chat in this server. Now I\'ll respond if anyone mentions me, Ain\'t that cool? :sunglasses:';
    }

    message.channel.send({
      embed: {
        color: color,
        description: chatStats
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  catch (e) {
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'chat',
  botPermission: '',
  userTextPermission: 'ADMINISTRATOR',
  userVoicePermission: '',
  usage: 'chat',
  example: []
};
