import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'package:modernisum/widgets/constants/responsive.dart';
import 'package:modernisum/widgets/constants/assets.dart';
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
    //final double screenHeight = MediaQuery.of(context).size.height;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        height: Responsive.isDesktop(context) ? 300.h : 760.h,
        width: Responsive.isDesktop(context) ? 1100.w : 1500.w,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.r),
          gradient: const LinearGradient(colors: [
            Color.fromRGBO(251, 252, 204, 1),
            Color(0xFFF0F8CB),
          ]),
          boxShadow: [
            BoxShadow(
                color: Colors.blue, offset: Offset(0, -1.h), blurRadius: 5.r),
            BoxShadow(
                color: Colors.brown, offset: Offset(0, 1.h), blurRadius: 5.r),
          ],
        ),
        child: Responsive.isDesktop(context)
            ? Text(
                text,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: const Color.fromRGBO(245, 179, 1, 1),
                  letterSpacing: 1.2,
                  fontWeight: FontWeight.bold,
                  fontSize: 30.h,
                ),
              )
            : Positioned(
                bottom: 90.h,
                child: Image.asset(
                  ImagePaths.baner,
                  fit: BoxFit.fill,
                ),
              ),
      ),
    );
  }
}
