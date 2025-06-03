import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:modernisum/widgets/constants/color.dart';
//import 'package:modernisum/widgets/constants/responsive.dart';

class TextBox1 extends StatelessWidget {
  final String text;
  final double fontSize;

  const TextBox1({
    Key? key,
    required this.text,
    required this.fontSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    //final double screenHeight = MediaQuery.of(context).size.height;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        height: 300.h,
        width: 1200.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(
            screenWidth > 600.w ? 60.r : 120.r,
          ),
          gradient: AppGradients.primary,
        ),
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(20.w),
            child: Text(
              text,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.labelSmall!.copyWith(
                    color: Colors.white,
                    letterSpacing: 1.2,
                    fontWeight: FontWeight.w500,
                    fontSize: fontSize,
                  ),
            ),
          ),
        ),
      ),
    );
  }
}
