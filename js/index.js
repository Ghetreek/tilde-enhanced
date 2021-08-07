// init storage
var storage = null

if (typeof(browser) !== 'undefined') {
  storage = new FirefoxStorage()
} else if (typeof(chrome) !== 'undefined') {
  storage = new ChromeStorage()
} else {
  storage = new LocalStorage()
}

const config = new Config()

var lol = null

;(async () => {
await config.init()

const queryParser = new QueryParser()

const influencers = config.get('influencers').map(influencerConfig => {
  return new {
    Default: DefaultInfluencer,
    Commands: CommandsInfluencer,
    DuckDuckGo: DuckDuckGoInfluencer,
    History: HistoryInfluencer,
  } [influencerConfig.name]({
    defaultSuggestions: config.get('defaultSuggestions'),
    limit: influencerConfig.limit,
    parseQuery: queryParser.parse,
    commands: config.get('commands')
  });
});

const suggester = new Suggester(influencers)

const help = new Help(suggester)

const form = new Form(suggester, queryParser, help)

new Clock(help.toggle)

lol = () => { form.invert() }

})()