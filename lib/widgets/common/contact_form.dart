import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:modernisum/widgets/constants/color.dart';
import 'package:modernisum/widgets/constants/responsive.dart';

import '../../modules/home/home_controller.dart';
import 'TextField.dart';
import 'button_text.dart';

class ContactForm extends StatelessWidget {
  get name => HomeController().name;
  get email => HomeController().email;
  get massage => HomeController().massage;

  const ContactForm({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final formKey = GlobalKey<FormState>();
    return Container(
      width: Responsive.isDesktop(context) ? 800.w : 1650.w,
      padding: EdgeInsets.all(Responsive.isDesktop(context) ? 100.w : 100.w),
      decoration: BoxDecoration(
        gradient: AppGradients.secondary,
        borderRadius: BorderRadius.circular(20.r),
        boxShadow: const [
          BoxShadow(
            color: Color(0xFF9E9E9E),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Form(
        key: formKey,
        child: Column(
          children: [
            TextFieldHelper1.buildTextField(
              controller: name,
              label: 'Name',
              //context: context,
            ),
            SizedBox(height: 10.h),
            TextFieldHelper1.buildTextField(
              controller: email,
              label: 'Email',
              //context: context,
            ),
            SizedBox(height: 10.h),
            TextFieldHelper1.buildTextField(
              controller: massage,
              label: 'Message',
              maxLines: 5,
              //context: context,
            ),
            SizedBox(height: 50.h),
            TextButton1(text: "Send Message"),
          ],
        ),
      ),
    );
  }
}
