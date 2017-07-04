// Grundsätzliche App beschreibung
App.info({
  id: 'de.antonlydike.todopush',
  name: 'ToDoPush',
  version: "1.0.1",
  description: "A simple ToDo app with a twist",
  author: "Anton Lydike",
  email: "dev@antonlydike.de"
});

// Pfad zu den App-Icons. Unterschiedliche Größen für unterschiedliche Handys
// Das Icon wurde mit diesem Generator erstellt:
// https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=text&foreground.text.text=test&foreground.text.font=Roboto&foreground.space.trim=1&foreground.space.pad=0.35&foreColor=rgb(222%2C%2079%2C%2079)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=hrect&effects=shadow&name=icon
App.icons({
  android_mdpi: "public/icons/mdpi/todopush.png",
  android_hdpi: "public/icons/hdpi/todopush.png",
  android_xhdpi: "public/icons/xhdpi/todopush.png",
  android_xxhdpi: "public/icons/xxhdpi/todopush.png",
  android_xxxhdpi: "public/icons/xxxhdpi/todopush.png"
})

// Mehr zur mobilen konfiguration: http://docs.meteor.com/api/mobile-config.html
