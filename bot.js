const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const token = '5901117440:AAEXS83rIJoX-GvD8yC4XIlUPHapw6Yim88';

const currencyAPIKey = '088d2c9a0edb3ce0ecbfea57';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const welcomeMessage = 'Welcome to the Currency Conversion Bot! To get the top 10 country conversion rates, use the /rates command followed by a currency code (e.g., /rates USD).';
  bot.sendMessage(msg.chat.id, welcomeMessage);
});

bot.on("message", (msg) => {
  console.log(msg);
  if(msg.text=="hii"||msg.text=="hello"){
    bot.sendMessage(msg.chat.id, "hello");
  }

  request('https://v6.exchangerate-api.com/v6/088d2c9a0edb3ce0ecbfea57/latest/'+msg.text, (error, response, body) => {
    if (error) {
      bot.sendMessage(msg.chat.id, 'An error occurred while retrieving the conversion rates.');
    }

    const data = JSON.parse(body);

    if (data.result === 'error') {
      bot.sendMessage(msg.chat.id, 'Invalid currency code...');
    }
    else{
      const a = ["USD","EUR","JPY","GBP","CHF","CAD","AUD","NZD","CNY","INR"];

      bot.sendMessage(msg.chat.id,` 1  ${msg.chat.id}  10 popular currencies is ::`);

      a.forEach(function(entry) {
        bot.sendMessage(msg.chat.id,entry+"  "+ data.conversion_rates[entry]);
      });

    }
  });
});