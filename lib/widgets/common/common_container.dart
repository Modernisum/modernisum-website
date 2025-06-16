import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:modernisum/widgets/constants/responsive.dart';

class CommonContainer extends StatelessWidget {
  Widget? child;

  CommonContainer({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        height: Responsive.isDesktop(context) ? 900.h : 600.h,
        width: Responsive.isDesktop(context) ? 1800.h : context.width * 0.8,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.r),
          gradient: const LinearGradient(colors: [
            Color.fromRGBO(251, 252, 204, 1),
            Color(0xFFF0F8CB),
          ]),
          boxShadow: [
            BoxShadow(
                color: Colors.blue, offset: Offset(0, -1.h), blurRadius: 40.r),
            BoxShadow(
                color: Colors.brown, offset: Offset(0, 1.h), blurRadius: 40.r),
          ],
        ),
        child: child,
      ),
    );
  }
}
