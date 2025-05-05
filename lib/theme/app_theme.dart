import 'package:flutter/material.dart';

class AppTheme {
  static const Color primaryColor = Color(0xFFf5b301);
  static const Color secondaryColor = Color(0xFF3b3f43);
  static const Color backgroundColor = Color(0xFF2A2E34);

  static final ThemeData lightTheme = ThemeData(
    primaryColor: primaryColor,
    scaffoldBackgroundColor: backgroundColor,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryColor,
      secondary: secondaryColor,
      background: backgroundColor,
    ),
    useMaterial3: true,
  );
}
