import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/gestures.dart';
import 'routes/app_pages.dart';
import 'theme/app_theme.dart';
import 'modules/home/home_controller.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    ),
  );
  Get.put(HomeController());
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Modernisum',
      theme: AppTheme.lightTheme,
      initialRoute: Routes.home,
      getPages: AppPages.routes,
      locale: const Locale('en', 'IN'),
      fallbackLocale: const Locale('en', 'IN'),
      debugShowCheckedModeBanner: false,
      enableLog: false,
      defaultTransition: Transition.fadeIn,
      opaqueRoute: true,
      popGesture: true,
      builder: (context, child) {
        return ScrollConfiguration(
          behavior: ScrollBehavior().copyWith(
            physics: const BouncingScrollPhysics(),
            dragDevices: {
              PointerDeviceKind.touch,
              PointerDeviceKind.mouse,
            },
          ),
          child: child!,
        );
      },
    );
  }
}
