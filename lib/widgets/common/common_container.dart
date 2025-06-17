import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CommonContainer extends StatelessWidget {
  final Widget? child;
  final double height;
  final double width;

  const CommonContainer({
    Key? key,
    required this.child,
    required this.height,
    required this.width,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        padding: EdgeInsets.all(40.r),
        height: height,
        width: width,
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

class CommonContainer2 extends StatelessWidget {
  final Widget? child;
  final double height;
  final double width;

  const CommonContainer2({
    Key? key,
    required this.child,
    required this.height,
    required this.width,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        height: height,
        width: width,
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
