import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lottie/lottie.dart';
import 'package:modernisum/modules/home/home_controller.dart';
import 'package:modernisum/widgets/constants/assets.dart';
import 'package:modernisum/widgets/constants/color.dart';
import 'package:modernisum/widgets/constants/responsive.dart';
//import 'package:modernisum/widgets/constants/responsive.dart';
//import 'package:modernisum/modules/home/home_view.dart';

class TextButton1 extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color? color;
  final Color? textColor;
  final double? fontSize;

  get email => HomeController().email.text;
  get message => HomeController().massage.text;
  get name => HomeController().name.text;

  const TextButton1({
    Key? key,
    required this.text,
    this.onPressed,
    this.color,
    this.textColor,
    this.fontSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: Responsive.isDesktop(context) ? 70.h : 70.h,
      width: Responsive.isDesktop(context) ? 200.w : 600.w,
      child: ElevatedButton(
        onPressed: () {
          HomeController().sendEmail(name, email, message);
        },
        style: ElevatedButton.styleFrom(
          backgroundColor:
              AppGradients.primary.colors.first, // Button background
          foregroundColor: Colors.white, // Text color
          elevation: 8, // Shadow
          shadowColor: Colors.black54,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: Text(
          text,
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: Responsive.isDesktop(context) ? 20.sp : 50.sp,
          ),
        ),
      ),
    );
  }
}

class ExploreButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color? color;
  final Color? textColor;
  final double? fontSize;

  get email => HomeController().email.text;
  get message => HomeController().massage.text;
  get name => HomeController().name.text;

  const ExploreButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.color,
    this.textColor,
    this.fontSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: Responsive.isDesktop(context) ? 70.h : 70.h,
      width: Responsive.isDesktop(context) ? 200.w : 850.w,
      child: ElevatedButton(
        onPressed: () => onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor:
              AppGradients.primary.colors.first, // Button background
          foregroundColor: Colors.white, // Text color
          elevation: 8, // Shadow
          shadowColor: Colors.black54,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          spacing: 5.sp,
          children: [
            Text(
              text,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: Responsive.isDesktop(context) ? 20.sp : 50.sp,
              ),
            ),
            Lottie.asset(AnimationPaths.navigationRight,
                height: 90.h, width: 100.h)
          ],
        ),
      ),
    );
  }
}
