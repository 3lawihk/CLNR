import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv"; 
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from './utils/translations.json';
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(`\r${gradient(["purple", "pink"])(`Connecting${'.'.repeat(ponto)}`)}`);
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang('pt');
  } else {
    setlang('en');
  }
  if (client.guilds.cache.get('1230390791323783168')) {
    if (client.guilds.cache.get('1230390791323783168').channels.cache.get('1238705441517862985')) {
      
      (client.guilds.cache.get('1230390791323783168').channels.cache.get('1238705441517862985') as TextChannel).send({ content: 'Hello world' }).catch(error => {});
    } else {
      console.log('...');
    }
  
  } else {
    console.log(gradient(["red", "orange"])(t('nosvr')));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId('1237859612213116958')
    .setType('PLAYING')
    .setURL('https://discord.gg/3li')
    .setName('☣ 3li')
    .setState('🛠 Running...')
    .setDetails('The best server about selfbots and bots')
    .setAssetsLargeImage('https://cdn.discordapp.com/banners/1237859612213116958/be76751a0153c26adc6f9cc6171adf2e.webp?size=1024&format=webp&width=1024&height=0')
    .setAssetsLargeText('3li Store')
    .setAssetsSmallImage('https://cdn.discordapp.com/avatars/1237859612213116958/06e4225716ea98fabb1e6f446ad3b70f.webp?size=1024&format=webp')
    .setAssetsSmallText('Join')
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t('join'), 'https://discord.gg/3li');
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(gradient(["green", "yellow"])("Your token (Not a bot token)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["green", "green"])("this token is empty"));
      process.kill(1);
    } else {
      
      client.login(input)
        .catch((error) => {
          if (error.message === 'An invalid token was provided.') {
            console.clear();
            console.log(gradient(["green", "yellow"])("Invalid token"));
          } else {
            console.clear();
            console.error(gradient(["red", "orange"])(`Erro ao fazer login: ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'An invalid token was provided.') {
        console.log(gradient(["green", "yellow"])("Invalid token"));
      } else {
        console.clear();
        console.error(gradient(["green", "yellow"])(error.message));
      }
    });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;