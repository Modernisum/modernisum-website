import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DesignUtils {
  static BoxDecoration gradientBoxDecoration(
      {required List<Color> colors, double? borderRadius}) {
    return BoxDecoration(
      gradient: LinearGradient(colors: colors),
      borderRadius: BorderRadius.circular(borderRadius ?? 10.r),
      boxShadow: [
        BoxShadow(
          color: Colors.yellow,
          offset: Offset(0, -1.h),
          blurRadius: 5.r,
        ),
        BoxShadow(
          color: Colors.brown,
          offset: Offset(0, 1.h),
          blurRadius: 5.r,
        ),
      ],
    );
  }

  static TextStyle gradientTextStyle(
      {required double fontSize, required BuildContext context}) {
    return Theme.of(context).textTheme.labelSmall!.copyWith(
          color: Colors.white,
          letterSpacing: 1.2,
          fontWeight: FontWeight.w500,
          fontSize: fontSize.sp,
        );
  }

  static Widget gradientText(
      String text, double fontSize, BuildContext context) {
    return ShaderMask(
      shaderCallback: (bounds) => const LinearGradient(
        colors: [
          Color.fromRGBO(245, 179, 1, 1),
          Colors.brown,
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(bounds),
      child: Text(
        text,
        style: TextStyle(
          fontSize: fontSize.sp,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
    );
  }
}
