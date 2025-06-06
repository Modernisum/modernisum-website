import 'package:flutter/material.dart';

class AppColors {
  static const Color primary = Color(0xFF1A237E);
  static const Color secondary = Color(0xFF303F9F);
  static const Color accent = Color(0xFFFFC107);
  static const Color background = Color(0xFFF5F5F5);
  static const Color textPrimary = Color(0xFF212121);
  static const Color textSecondary = Color(0xFF757575);
  static const Color error = Color(0xFFD32F2F);
  static const Color success = Color(0xFF388E3C);
  static const Color warning = Color(0xFFF57C00);
}

class AppGradients {
  static const LinearGradient primary = LinearGradient(
    colors: [AppColors.accent, Colors.brown],
  );
  static const LinearGradient secondary = LinearGradient(colors: [
    Color(0xFFF2F9CB),
    Color.fromARGB(255, 236, 241, 209),
    Color.fromARGB(255, 243, 249, 209),
  ]);
}
