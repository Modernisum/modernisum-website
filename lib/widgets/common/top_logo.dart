import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:modernisum/widgets/constants/color.dart';
import 'package:modernisum/widgets/constants/responsive.dart';
import '../constants/assets.dart';

class TopLogo extends StatelessWidget {
  final String text;

  const TopLogo({
    super.key,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: Responsive.isDesktop(context) ? 70.h : 100.h,
        width: Responsive.isDesktop(context) ? 500.w : 700.w,
        child: Row(
          children: [
            Image.asset(
              ImagePaths.logo,
              height: Responsive.isDesktop(context) ? 50.h : 200.h,
              width: Responsive.isDesktop(context) ? 50.w : 200.w,
            ),
            ShaderMask(
              shaderCallback: (bounds) =>
                  AppGradients.primary.createShader(bounds),
              child: Text(
                text,
                style: TextStyle(
                  fontSize: Responsive.isDesktop(context) ? 30.sp : 70.sp,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ));
  }
}
