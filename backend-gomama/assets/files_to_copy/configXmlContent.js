const configCustomer = require('../../api-screen/configCustomerLogo.json');

const configXmlContent = `
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.apextiming.${configCustomer.folderName}" version="${configCustomer.version}" android-versionCode="5" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">
    <name>${configCustomer.appName}</name>
    <description>Gokarts Web App By Apex Timing</description>
    <author email="webmaster@apex-timing.com" href="http://www.apex-timing.com">Apex Timing</author>
    
    <content src="index.html" />

    <preference name="DisallowOverscroll" value="true" />
    <preference name="android-minSdkVersion" value="24" />
    <preference name="android-targetSdkVersion" value="34" />


    <!-- <preference name="phonegap-version" value="cli-8.0.0" /> --> <!-- pour phonegap -->
    
    <preference name="Orientation" value="portrait" />



    <preference name="SplashScreenDelay" value="0"/> <!-- Pour elever le splash screen de démarage delay de 0s -->

    <preference name="prerendered-icon" value="true" /><!-- test pour l'icon -->


    <preference name="android-build-tool" value="gradle" />
    <!-- Pour les config de pref: https://cordova.apache.org/docs/en/latest/config_ref/#preference -->

    <preference name="target-device" value="handset" /> <!-- handset/tablet/universal  handset pour iphone only -->
    <preference name="SuppressesLongPressGesture" value="true" />
<!--    <preference name="Suppresses3DTouchGesture" value="true" /> --> <!-- Ne pas le mettre le laisser sur false par default car sinon il empèche les onclick et champs textes -->
    <preference name="BackupWebStorage" value="local" />

    <preference name="ErrorUrl" value="offline.html"/> <!-- en cas d'ereur de l'app -->


    <plugin name="cordova-plugin-wkwebview-engine" source="npm"  /> <!-- Pour pouvoir utiliser wkwebview IOS -->
    <!-- <plugin name="cordova-plugin-migrate-localstorage" source="npm" /> --> <!-- Pour migrer le local storage dans wkwebview -->
    <plugin name="cordova-plugin-wkwebview-cookie-sync" source="npm"  /> <!-- Pour corriger le bug des cookies qui ne ce mettent pas a la premiere ouverture de l'app -->
    <platform name="ios"> <!-- Pour utiliser les WKWebView au lieu des UIWebView -->
        <preference name="WKWebViewOnly" value="true" />

        <feature name="CDVWKWebViewEngine">
            <param name="ios-package" value="CDVWKWebViewEngine" />
        </feature>

        <preference name="CordovaWebViewEngine" value="CDVWKWebViewEngine" />
    </platform>

    <!-- https://www.npmjs.com/package/phonegap-plugin-push/v/2.3.0 / versions-> https://github.com/phonegap/phonegap-plugin-push/blob/HEAD/docs/INSTALLATION.md   -->
    <!-- j'ai changer spec="1.9.0" en spec="2.3.0" car ça ne voulait plus compiler avec cli-8.0.0 ....... --> <!-- j'ai changer spec="1.6.0" en spec="1.9.0" car ça ne voulait plus compiler avec cli-6.5.0 ....... -->
<!--     <plugin name="phonegap-plugin-push" source="npm" spec="2.3.0" > 
        <variable name="SENDER_ID" value="505578118943" />
    </plugin>
    <platform name="ios">
      <resource-file src="GoogleService-Info.plist" />
    </platform>
    <platform name="android">
      <resource-file src="google-services.json" target="app/google-services.json" />
    </platform> -->
    <!-- j'ai ajouté ça car la version de phonegap-plugin-push spec="2.3.0" ne prend plus en compte la variable name="SENDER_ID"  --> 
    <platform name="ios" custom="push">
        <!-- mise en place de fcm à la place depuis android 13 cordova 12 cordova-android@12.0.1 -->
<!--         <plugin name="phonegap-plugin-push" source="npm" spec="2.3.0">
            <param name="SENDER_ID" value="505578118943" />
        </plugin> -->
        <resource-file src="www/GoogleService-Info.plist" />
    </platform>

    <platform name="android" custom="push">
        <plugin name="cordova-android-support-gradle-release" spec="https://github.com/dpa99c/cordova-android-support-gradle-release.git" />
        <!-- mise en place de fcm à la place depuis android 13 cordova 12 cordova-android@12.0.1 -->
<!--         <plugin name="phonegap-plugin-push" source="npm" spec="2.1.3">
            <param name="SENDER_ID" value="505578118943" />
        </plugin> -->
        <plugin name="cordova-android-play-services-gradle-release" spec="https://github.com/dpa99c/cordova-android-play-services-gradle-release.git" />
        <plugin name="cordova-android-firebase-gradle-release" spec="https://github.com/dpa99c/cordova-android-firebase-gradle-release.git"/>
        <resource-file src="www/google-services.json" target="/app/google-services.json" />
    </platform>


<!--
<plugin name="cordova-plugin-fcm-config" source="npm" />-->
<!-- <plugin name="cordova-plugin-fcm" source="npm"  /> -->
 <!-- <plugin name="cordova-plugin-velda-devicefeedback" source="npm"  />  -->

<!-- <plugin name="cordova-plugin-firebase" source="npm"  /> spec="0.1.20" -->

<!-- compilation des certificat apple -> https://www.youtube.com/watch?v=v2PB3egShMU -->


    <plugin name="cordova-plugin-battery-status" source="npm" />
    <plugin name="cordova-plugin-camera" source="npm" spec="2.4.1">
        <variable name="CAMERA_USAGE_DESCRIPTION" value="Allow the app to access your camera for create a profile photo" />
        <variable name="NSPHOTOLIBRARYUSAGEDESCRIPTIONENTRY" value="For create a profile photo" />
        <variable name="PHOTOLIBRARY_USAGE_DESCRIPTION" value="Allow the app to access your photos for create a profile photo" />
    </plugin>

    <!-- <plugin name="cordova-plugin-media-capture" source="npm" spec="3.0.3"> --> <!-- spec="1.4.3" mise a jour en 3.0.3 pour cordova 10.0.0  -->
    <plugin name="cordova-plugin-media-capture" source="npm"> <!-- utilise par defaut la dernière version car cordova-plugin-file 7.0.0 requière une version superieur a media-capture 3.0.3 avec cordova 10.0.0 semble bon sans spec avec la version cordova 11.0.0 -->
        <variable name="CAMERA_USAGE_DESCRIPTION" value="Allow the app to access your camera for create a profile photo" />
        <variable name="PHOTOLIBRARY_USAGE_DESCRIPTION" value="Allow the app to access your photos for create a profile photo" />
    </plugin>


    <!-- <plugin name="cordova-plugin-console" source="npm"  /> --> <!-- [DEPRECATED] avec cordova ios@5.1.1  -->
    <!-- <plugin name="cordova-plugin-contacts" source="npm"  spec="2.3.1"/> --> <!-- Non utilisé pour le moment -->
    <platform name="ios">  <!-- depuis la version cordova 10.0.0 il n'est pas ajouter avec cette ligne je le force dans le .bat donc je le met que pour ios -->     
        <!-- <plugin name="cordova-plugin-device" source="npm"  /> -->
    </platform>
    <!-- <plugin name="cordova-plugin-device-motion" source="npm"  /> --> <!-- avec cli-8.0.0 -> [DEPRECATED] With the W3C Device Motion and Orientation API now being supported on iOS, Android and Windows device -->
    <!-- <plugin name="cordova-plugin-device-orientation" source="npm"  /> --> <!-- avec cli-8.0.0 -> [DEPRECATED] With the W3C Device Motion and Orientation API now being supported on iOS, Android and Windows device -->
    <plugin name="cordova-plugin-dialogs" source="npm"  />
    
    <!-- <platform name="ios"> <!- - depuis la version cordova 10.0.0 la bonne version file 6.0.2 ne ce met pas et file-transfer mauvaise version je le force dans le .bat donc je le met que pour ios - ->     
        <plugin name="cordova-plugin-file" source="npm" />  <!- - spec="6.0.2" forcé dans le .bat car ne marchait pas ici - ->
        <!- - <plugin name="cordova-plugin-file-transfer"  source="npm"/> - -> <!- - source="npm" spec="1.7.1" spec="1.6.3" - ->
    </platform> -->
    <plugin name="cordova-plugin-file" source="npm" /> <!-- ce met normalement avec cordova 11.0.0 avec android -->
    
    <plugin name="cordova-plugin-geolocation" source="npm"  />
    <plugin name="cordova-plugin-globalization" source="npm"  />
    <plugin name="cordova-plugin-inappbrowser" source="npm"  />

    <!-- <plugin name="cordova-plugin-media" source="npm"  spec="5.0.3"/> --> <!-- spec="3.0.1" mise a jour en 5.0.3 pour cordova 10.0.0  -->
     <plugin name="cordova-plugin-media" source="npm"  /> <!-- semble être bon avec cordova 11.0.0 --> 

    <plugin name="cordova-plugin-network-information" source="npm"  />
    <platform name="ios"> <!-- que pour ios depuis la version cordova 11.0.0 plus besoin pour android -->
        <plugin name="cordova-plugin-splashscreen" source="npm"  />
    </platform>
    <plugin name="cordova-plugin-statusbar" source="npm"  />
    <plugin name="cordova-plugin-vibration" source="npm"  />
    <platform name="ios"> <!-- aparement déja inclu dans la version cordova 10.0.0 -->
        <!-- <plugin name="cordova-plugin-whitelist" source="npm"  />  -->
    </platform>

    <!-- <plugin name="cordova-plugin-phonecaller" source="npm"  /> -->
    <plugin name="cordova-plugin-androidx-adapter" source="npm"  /> <!-- pour les vieux plugin qui ne prennent pas en charge androidx depuis 10.0.0 -->

    <platform name="android">
        <preference name="AndroidXEnabled" value="true" /> <!-- ajouté pour cordova 11.0.0 /android 10.1.2 SDK 31 android 12 -->
    </platform>




    <platform name="android">
        <icon density="ldpi" src="www/images/android/icon_36.png" />
        <icon density="mdpi" src="www/images/android/icon_48.png" />
        <icon density="hdpi" src="www/images/android/icon_72.png" />
        <icon density="xhdpi" src="www/images/android/icon_96.png" />
        <icon density="xxhdpi" src="www/images/android/icon_144.png" />
        <icon density="xxxhdpi" src="www/images/android/icon_192.png" />
<!--         <splash density="land-ldpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="land-mdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="land-hdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="land-xhdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="land-xxhdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="land-xxxhdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="port-ldpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="port-mdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="port-hdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="port-xhdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="port-xxhdpi" src="www/images/logo_apex_timing_3.png" />
        <splash density="port-xxxhdpi" src="www/images/logo_apex_timing_3.png" /> -->



 <!--        <preference name="android-manifest/application/@android:hardwareAccelerated" value="true" />
        <preference name="android-manifest/@android:hardwareAccelerated" value="true" /> -->

<!--         <config-file target="AndroidManifest.xml" parent="/manifest">
            <uses-feature android:glEsVersion="0x00010001" android:required="true" />
            <application android:hardwareAccelerated="true"></application>
         </config-file> -->

<!--           <config-file platform="android" parent="/manifest" mode="merge">
            <uses-feature android:glEsVersion="0x00010001" android:required="true" />
           <application android:hardwareAccelerated="true" />
        </config-file> -->


<!--     <resource-file src="www/images/no_internet_connection.png" target="res/drawable-mdpi/no_internet_connection.png" />
    <resource-file src="www/images/no_internet_connection.png" target="res/drawable-hdpi/no_internet_connection.png" /> -->
<!--         <resource-file src="www/images/icon.png" target="res/drawable-xhdpi/icon.png" />
        <resource-file src="www/images/icon.png" target="src/assets/img/icon.png" />
        <resource-file src="www/images/icon.png" target="platforms/android/res/drawable/icon.png" /> -->
<!--     <resource-file src="www/images/no_internet_connection.png" target="res/drawable-xxhdpi/no_internet_connection.png" />
    <resource-file src="www/images/no_internet_connection.png" target="res/drawable-xxxhdpi/no_internet_connection.png" /> -->

        <!-- <preference name="AndroidWindowSplashScreenAnimatedIcon" value="www/images/android/splashscreen.xml" /> --> <!-- depuis cordova 12 cordova-android@12.0.1 image ou image xml -->
        <preference name="AndroidWindowSplashScreenAnimatedIcon" value="www/images/android/splashscreen.png" /><!-- depuis cordova 12 cordova-android@12.0.1 -->
        <preference name="AndroidWindowSplashScreenBackground" value="#000000" /><!-- depuis cordova 12 cordova-android@12.0.1 -->

    </platform>


    <!-- <icon src="www/images/logo_apex_timing_4_57.png" /> -->

    <preference name="StatusBarBackgroundColor" value="#000000"/>
    <preference name="StatusBarOverlaysWebView" value="false"/> <!-- ne passe pas sous la bare même sous iphone 10 car bug sur iphone <10 si il y a cordova remet le paramettre de config aulieu de celui set par javascript -->
    <preference name="StatusBarStyle" value="lightcontent" />

    <platform name="ios">
        <!-- <preference name="fullscreen" value="true" /> -->

        <!-- Depuis le cli 7.0.1 les préférences de statusbar ne sont plus prise en compte, pour palier au bug la couleur est initialisé dans le javascript de la première page - -> semble remarcher avec cordova 11.0.0 -->
        <!-- <preference name="StatusBarOverlaysWebView" value="true"/> -->
        <!-- <preference name="StatusBarBackgroundColor" value="#000000"/> -->
        <!-- <preference name="StatusBarStyle" value="default" /> --> <!-- pour le text de la status bar en noir pour les iphone 10+ <preference name="StatusBarStyle" value="lightcontent" /> -->
        <!-- <preference name="StatusBarOverlaysWebView" value="false"/> -->
        <!-- <preference name="StatusBarStyle" value="lightcontent" /> -->

        <!-- pour le cli-8.0.0 j'ai enlever le www/ du src (www/images/ios...) car sinon il ne trouvait plus les image à la compilation -->
        <icon platform="ios" src="www/images/ios/icon-29.png" width="29" height="29" />
        <icon platform="ios" src="www/images/ios/icon-40.png" width="40" height="40" />
        <icon platform="ios" src="www/images/ios/icon-50.png" width="50" height="50"/>
        <icon platform="ios" src="www/images/ios/icon-57.png" width="57" height="57" />
        <icon platform="ios" src="www/images/ios/icon-60.png" width="60" height="60" />
        <icon platform="ios" src="www/images/ios/icon-72.png" width="72" height="72" />
        <icon platform="ios" src="www/images/ios/icon-76.png" width="76" height="76" />

        <icon platform="ios" src="www/images/ios/icon-29@2x.png" width="58" height="58" />
        <icon platform="ios" src="www/images/ios/icon-40@2x.png" width="80" height="80" />
        <icon platform="ios" src="www/images/ios/icon-50@2x.png" width="100" height="100" />        
        <icon platform="ios" src="www/images/ios/icon-57@2x.png" width="114" height="114" />
        <icon platform="ios" src="www/images/ios/icon-60@2x.png" width="120" height="120" />        
        <icon platform="ios" src="www/images/ios/icon-72@2x.png" width="144" height="144" />  
        <icon platform="ios" src="www/images/ios/icon-76@2x.png" width="152" height="152" />
        <icon platform="ios" src="www/images/ios/icon-83.5@2x.png" width="167" height="167" />

        <icon platform="ios" src="www/images/ios/icon-29@3x.png" width="87" height="87" />
        <icon platform="ios" src="www/images/ios/icon-60@3x.png" width="180" height="180" />   

        <icon platform="ios" src="www/images/ios/icon.png" width="1024" height="1024" /><!-- j'ai renomé icon-1024.png en icon.png car sinon il le prenait pas en compte -> le png ne doit pas avoir de transparence ni d'alpha... apple avait besoin de l'image 1024 pour pouvoir être publié -->
        
        <splash platform="ios" src="www/images/ios/Default-568h@2x~iphone.png" width="640" height="1136" />
        <splash platform="ios" src="www/images/ios/Default-667h.png" width="750" height="1334" />
        <splash platform="ios" src="www/images/ios/Default-736h.png" width="1242" height="2208" />
        <splash platform="ios" src="www/images/ios/Default-2436h.png" width="1125" height="2436" />
        <splash platform="ios" src="www/images/ios/Default-Landscape-736h.png" width="2208" height="1242" />
        <splash platform="ios" src="www/images/ios/Default-Landscape-2436h.png" width="2436" height="1125" />
        <splash platform="ios" src="www/images/ios/Default-Landscape@2x~ipad.png" width="2048" height="1536" />
        <splash platform="ios" src="www/images/ios/Default-Landscape~ipad.png" width="1024" height="768" />
        <splash platform="ios" src="www/images/ios/Default-Portrait@2x~ipad.png" width="1536" height="2048" />
        <splash platform="ios" src="www/images/ios/Default-Portrait~ipad.png" width="768" height="1024" />
        <splash platform="ios" src="www/images/ios/Default@2x~iphone.png" width="640" height="960" />
        <splash platform="ios" src="www/images/ios/Default~iphone.png" width="320" height="480" />
    </platform>






















<!-- 
<preference name="AndroidPersistentFileLocation" value="Compatibility" /> -->






    <access origin="*" />
    <access origin="tel:*" launch-external="yes"/>
    <access origin="tel://*" launch-external="yes"/>
    <access origin="geo:*" launch-external="yes"/>
    <access origin="mailto:*" launch-external="yes"/>
    <access origin="sms:*" launch-external="yes"/>
    <access origin="market:*" launch-external="yes"/>

<!--     <access origin="mailto:*" launch-external="true" />
    <access origin="tel:*" launch-external="true" />
    <access origin="sms:*" launch-external="true" />
    <access origin="geo:*" launch-external="true" />
    <access origin="maps:*" launch-external="true" /> -->

    <allow-navigation href="*" subdomains="true" />
    <preference name="websecurity" value="disable" />

    <allow-navigation href="http://*/*" />
    <allow-navigation href="https://*/*" />
    <allow-navigation href="tel:*" />
    <allow-navigation href="sms:*" />
    <allow-navigation href="mailto:*" />
    <allow-navigation href="geo:*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>

    
    <!-- ne pas le mettre dans un <platform name="android"> sinon ça ne marche pas --> 
    <!-- Pour le probleme ERR_CLEARTEXT_NOT_PERMITTED depuis android 9, le site en http sont bloqué par défault  -->
    <!-- <edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
        <application android:usesCleartextTraffic="true" />
    </edit-config> -->
    <platform name="android"> <!-- Pour le probleme ERR_CLEARTEXT_NOT_PERMITTED depuis android 9, le site en http sont bloqué par défault  -->
        <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
            <application android:usesCleartextTraffic="true" />
        </edit-config>
    </platform>

    <feature name="IntentAndNavigationFilter">
        <param name="ios-package" value="CDVIntentAndNavigationFilter"/>
        <param name="onload" value="true"/>
    </feature>


    <plugin name="cordova-plugin-android-permissions" source="npm" />
    <platform name="android"> <!-- Pour ajouter la permission à l'app d'utiliser la camera ajouté pour la v2 de l'app -->
<!--         <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/uses-permission" xmlns:android="http://schemas.android.com/apk/res/android">
            <uses-permission android:name="android.permission.CAMERA" />
        </edit-config> -->
        <!--  Il est ajouté automatiquement avec le plugin phonegap-plugin-barcodescanner avec la v4 --> 
    </platform>





    <platform name="ios">
    <!-- Pour ajouter la permission à l'app d'utiliser la camera ajouté pour la v2 de l'app -->
        <config-file target="*-Info.plist" parent="NSCameraUsageDescription">
            <string>This app needs access to the camera to take photos.</string>
        </config-file>
    </platform>


    <!-- Pour que playsinline dans la balise video fonctionne sur ios ajouté pour la v2 de l'app -->
    <preference name="AllowInlineMediaPlayback" value="true"/>


     <platform name="android"> <!-- depuis SDK 31 android 12 les noeud activity et service doivent avoir me noeud android:exported -->
<!--         <edit-config file="app/src/main/AndroidManifest.xml" target="/manifest/application/activity" mode="merge">
            <activity android:exported="true" />
        </edit-config> -->
        <!-- n'arrive pas a ajouter android:exported au service de merge du plugin dans son plugin.xml -> ajouté avec le .bat  -->
<!--         <edit-config file="app/src/main/AndroidManifest.xml" target="/manifest/application/service" mode="merge">
            <service android:exported="true" />
        </edit-config> -->
    </platform>

<!-- juste testé jamais utilisé
    <platform name="android"> 
        <preference name="GradlePluginGoogleServicesEnabled" value="true" />
        <preference name="GradlePluginGoogleServicesVersion" value="4.3.8" />
    </platform>
 -->




    <!-- ajouté pour la v4 de l'app -->
    <plugin name="cordova-plugin-buildinfo" source="npm" />
    <plugin name="cordova-plugin-app-version" source="npm" />

    <!-- ajouté pour la v4 de l'app mais pas testé -->
    <plugin name="cordova-plugin-screen-orientation" source="npm" />
    <platform name="android"> <!-- ajouter dans cordova 12 cordova-android@12.0.1 pour le plugin cordova-plugin-screen-orientation qui ajoute le bug cordova Le préfixe "tools" de l'attribut "tools:replace" associé à un type d'élément "activity" n'est pas lié. -->
        <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest" xmlns:android="http://schemas.android.com/apk/res/android">
            <manifest xmlns:tools="http://schemas.android.com/tools" />
        </edit-config>
    </platform>
    <!-- <plugin name="phonegap-plugin-barcodescanner" source="npm" /> --> <!-- besoin de min android version 24.1.0 --> <!-- ne marche pas avec version cordova 12 cordova-android@12.0.1 android 13 sdk 24-33 remplacé par le ...-androidx  -->
    <plugin name="phonegap-plugin-barcodescanner-androidx" source="npm" />
<!--     <plugin name="cordova-plugin-qr-barcode-scanner" source="npm" /> -->
    <!-- <plugin name="cordova-plugin-qrscanner" source="npm" /> -->






    <plugin name="cordova-plugin-x-socialsharing" source="npm" /> <!-- Need to <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" /> -->
    <platform name="android"> <!-- Pour ajouter la permission à l'app -->
        <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/uses-permission" xmlns:android="http://schemas.android.com/apk/res/android">
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        </edit-config>
    </platform>
    <platform name="ios">
        <feature name="SocialSharing">
            <param name="ios-package" value="SocialSharing" />
        </feature>
    </platform>
    <platform name="android"><!-- for Android (you will find one in res/xml) -->
        <feature name="SocialSharing">
            <param name="android-package" value="nl.xservices.plugins.SocialSharing" />
        </feature>
    </platform>

    <plugin name="cordova-sqlite-storage" source="npm" />
    <!-- <plugin name="cordova-sqlite-ext" source="npm" /> -->







    <platform name="android"> <!-- Pour ajouter la permission à l'app --> <!-- probleme aparu avec cordova 12 cordova-android@12.0.1 pas d'accès internet  -->
        <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/uses-permission" xmlns:android="http://schemas.android.com/apk/res/android">
                <uses-permission android:name="android.permissions.NETWORK_ACCESS" /> <!-- quand le gradle se build ces éléments semblent disparaitre... les remettre à la main ? -->
                <uses-permission android:name="android.permission.INTERNET" /> <!-- quand le gradle se build ces éléments semblent disparaitre... les remettre à la main ? -->
                <!-- <uses-permission android:name="android.permissions.ACCESS_NETWORK_STATE" /> --> <!-- lui y est déjà -->
        </edit-config>
    </platform>


    <plugin name="cordova-android-play-services-gradle-release" source="npm" >
        <!-- <variable name="play-services-location" value="17.0.0" /> -->
    </plugin>
    
    <plugin name="cordova-plugin-firebasex" source="npm" spec="16.1.0"> <!-- version 16.1.0 car la version 16.3.0 ou 16.3.1 posait des problème avec cocoapods, la 16.3.1 mettait le inappmessagin plugin en beta -->
        <variable name="FIREBASE_ANALYTICS_COLLECTION_ENABLED" value="false" />
        <variable name="FIREBASE_PERFORMANCE_COLLECTION_ENABLED" value="false" />
        <variable name="FIREBASE_CRASHLYTICS_COLLECTION_ENABLED" value="false" />
    </plugin>
    <platform name="android"> <!-- Pour ajouter la permission à l'app --> <!-- probleme aparu avec cordova 12 cordova-android@12.0.1 pour android 13  -->
        <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/uses-permission" xmlns:android="http://schemas.android.com/apk/res/android">
            <uses-permission android:name="android.permission.POST_NOTIFICATIONS" /> <!-- quand le gradle se build ces éléments semblent disparaitre... les remettre à la main ? -->
        </edit-config>
    </platform>







<!-- pour lire le manifeste de l'apk -> en ligne https://www.sisik.eu/apk-tool -->


</widget>
`;

module.exports = configXmlContent;