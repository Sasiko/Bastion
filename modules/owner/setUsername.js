/**
 * @file setUsername command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = async (Bastion, message, args) => {
  if (!Bastion.credentials.ownerId.includes(message.author.id)) {
    /**
     * User has missing permissions.
     * @fires userMissingPermissions
     */
    return Bastion.emit('userMissingPermissions', this.help.userTextPermission);
  }

  try {
    if (args.join(' ').length >= 1) {
      await Bastion.user.setUsername(args.join(' '));

      message.channel.send({
        embed: {
          color: Bastion.colors.GREEN,
          description: `${Bastion.user.username}'s username is now set to **${args.join(' ')}**`
        }
      }).catch(e => {
        Bastion.log.error(e);
      });
    }
  }
  catch (e) {
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [ 'setun' ],
  enabled: true
};

exports.help = {
  name: 'setUsername',
  botPermission: '',
  userTextPermission: 'BOT_OWNER',
  userVoicePermission: '',
  usage: 'setUsername <text>',
  example: [ 'setUsername NewUsername' ]
};
