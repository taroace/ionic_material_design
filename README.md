# ionic_material_design
Basic login page using Ionic and Angular Material (ngMaterial)

# Target
 - Show how to create a login page
 - Show how to build and Ionic application ready to production using gulp and hooks tasks
 - Show how to manipulate maps with Ionic
 - show how to open external apps from Ionic
 - show how to use the device camera

# Documentations
 - Ionic http://ionicframework.com/docs/
 - Angular Material https://material.angularjs.org

# Directives
 - inputClear http://plnkr.co/edit/Dje0l1?p=preview
 - ngMaps http://ngmap.github.io/
 
# Cordova Plugins
  - cordova-plugin-geolocation
  - cordova-plugin-inappbrowser
  - org.apache.cordova.camera

# Before run
 $ npm install<br>
 $ bower install<br>
 (its recommended to remove the auto generated files hooks/uglify-config.json and hooks/after_prepare/uglify.js)
 
# Run on browser
 $ ionic serve

# Before run or compile on device
 $ ionic platform add [android] [ios]<br>

# Compile on device
 $ gulp && ionic build [android] [ios]
 
# Run on device
 $ gulp && ionic run [android] [ios]<br>
  or<br>
 $ gulp && ionic emulate [android] [ios]
 
# Debug on device
 $ adb logcat | grep -i "INFO:CONSOLE"