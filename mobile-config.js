// Grundsätzliche App beschreibung
App.info({
  id: 'de.antonlydike.todopush',
  name: 'ToDoPush',
  version: "1.0.2m",
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

App.launchScreens({
  android_mdpi_portrait: 'public/icons/mdpi/launch.portrait.png',
  android_mdpi_landscape: 'public/icons/mdpi/launch.landscape.png',
  android_hdpi_portrait: 'public/icons/hdpi/launch.portrait.png',
  android_hdpi_landscape: 'public/icons/hdpi/launch.landscape.png',
  android_xhdpi_portrait: 'public/icons/xhdpi/launch.portrait.png',
  android_xhdpi_landscape: 'public/icons/xhdpi/launch.landscape.png',
  android_xxhdpi_portrait: 'public/icons/xxhdpi/launch.portrait.png',
  android_xxhdpi_landscape: 'public/icons/xxhdpi/launch.landscape.png'
})

App.setPreference('SplashMaintainAspectRatio', 'true');

// Mehr zur mobilen konfiguration: http://docs.meteor.com/api/mobile-config.html
