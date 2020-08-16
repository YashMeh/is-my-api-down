const axios = require("axios");
const CronJob = require("cron").CronJob;
const { WebClient } = require("@slack/web-api");

//Setting environment variable
const URL = process.env.URL || "http://localhost:3000/api/status";
const token = process.env.SLACK_TOKEN;
const intervalMin = process.env.MINUTE || 5;
const channel = process.env.CHANNEL;

// Initialize
const bot = new WebClient(token);

var job = new CronJob(
  `${intervalMin} * * * * *`,
  () => {
    axios
      .get(URL)
      .then((res) => {
        if (res.status !== 200) {
          var timestamp = new Date(Date.now());
          bot.chat
            .postMessage({
              text: "Unpredicted Behaviour :heavy_exclamation_mark:",
              attachments: [
                {
                  text: `Status code received ${
                    "```" + res.status + "```"
                  } Time-${timestamp.toString()}`,
                },
              ],
              channel: channel,
            })
            .then((botRes) => {
              console.log("unpredicted message posted");
            })
            .catch((botErr) => {
              throw botErr;
            });
        }
      })
      .catch((err) => {
        console.log("not-fine");
        var timestamp = new Date(Date.now());
        bot.chat
          .postMessage({
            text: "API Down :boom: :heavy_exclamation_mark: :boom:",
            attachments: [
              {
                text: ` ${"```" + err + "```"} Time-${timestamp.toString()}`,
              },
            ],
            channel: process.env.CHANNEL,
          })
          .then((botRes) => {
            console.log("not-fine message posted");
          })
          .catch((botErr) => {
            throw botErr;
          });
      });
  },
  null,
  true
);
job.start();
