import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:modernisum/modules/home/home_controller.dart';
import 'package:modernisum/widgets/constants/responsive.dart';
//import 'package:modernisum/modules/home/home_view.dart';

class TextButton1 extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color? color;
  final Color? textColor;
  final double? fontSize;
  final double? width;
  final double? height;
  get email => HomeController().email.text;
  get message => HomeController().massage.text;
  get name => HomeController().name.text;

  const TextButton1({
    Key? key,
    required this.width,
    required this.height,
    required this.text,
    this.onPressed,
    this.color,
    this.textColor,
    this.fontSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        HomeController().sendEmail(name, email, message);
      },
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.h),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.r),
        ),
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
        elevation: 10,
      ),
      child: Ink(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [
              Color.fromRGBO(245, 179, 1, 1),
              Colors.brown,
            ],
          ),
          borderRadius: BorderRadius.circular(10.r),
        ),
        child: Container(
          height: height,
          width: width,
          alignment: Alignment.center,
          child: Text(
            text,
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 18.sp,
            ),
          ),
        ),
      ),
    );
  }
}
