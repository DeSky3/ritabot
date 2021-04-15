// -----------------
// Global variables
// -----------------

// codebeat:disable[LOC,ABC,BLOCK_NESTING,ARITY]
/* eslint-disable no-undef */
const db = require("../../core/db");
const logger = require("../../core/logger");
const sendMessage = require("../../core/command.send");

// -----------------------
// Command code
// -----------------------

module.exports.run = function(data)
{
   // -------------------------------
   // Command allowed by admins only
   // -------------------------------

   Override: if (!process.env.DISCORD_BOT_OWNER_ID.includes(data.message.author.id))
   {
      if (data.message.isAdmin === false)
      {
         data.color = "warn";
         data.text = ":cop:  This command is reserved for server admins.";

         // -------------
         // Send message
         // -------------

         return sendMessage(data);
      }
      break Override;
   }
   // --------------------------------
   // Error if debug param is missing
   // --------------------------------

   if (!data.cmd.params)
   {
      data.color = "error";
      data.text =
         ":warning:  Missing `debug` parameter. Use `" +
         `${data.config.translateCmdShort} help debug\` to learn more.`;

      // -------------
      // Send message
      // -------------

      return sendMessage(data);
   }

   // ----------------
   // Execute setting
   // ----------------

   debug(data);
};

// -------------------------------
// debug varible command handler
// -------------------------------

const debug = function(data)
{
   const commandVariable1 = data.cmd.params.split(" ")[0].toLowerCase();

   if (commandVariable1 === "on")
   {
      console.log("DEBUG: debug variable " + commandVariable1);
      return db.updateWebhookVar(
         data.message.channel.guild.id,
         commandVariable1, //This would be the Webhook ID
         commandVariable1, //this would be the Webhook Token
         true,
         function(err)
         {
            if (err)
            {
               return logger("error", err, "command", data.message.guild.name);
            }
            var outputgh =
            "**```Start Debug mode```**\n" +
            `Debug mode has been Started. \n` +
            `Error Logs will be output to this channel \n\n`;
            data.color = "info";
            data.text = outputgh;

            // -------------
            // Send message
            // -------------

            return sendMessage(data);
         }
      );
   }
   else if (commandVariable1 === "off")
   {
      console.log("DEBUG: debug variable " + commandVariable1);
      return db.removeWebhook(
         data.message.channel.guild.id,
         function(err)
         {
            if (err)
            {
               return logger("error", err, "command", data.message.guild.name);
            }
            var outputoc =
          "**```Stop Debug mode```**\n" +
          `Debug mode has been Stopped. \n` +
          `Error logs will not be shown.\n\n`;
            data.color = "info";
            data.text = outputoc;

            // -------------
            // Send message
            // -------------

            return sendMessage(data);
         }
      );
   }

   data.color = "error";
   data.text =
      ":warning:  **`" + commandVariable1 +
      "`** is not a valid debug option.\n";

   // -------------
   // Send message
   // -------------

   return sendMessage(data);
};