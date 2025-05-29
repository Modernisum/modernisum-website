import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
      width: 800.w,
      padding: EdgeInsets.all(150.w),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [
          Color(0xFFF2F9CB),
          Color.fromARGB(255, 236, 241, 209),
          Color.fromARGB(255, 243, 249, 209),
        ]),
        borderRadius: BorderRadius.circular(10.r),
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
            const TextButton1(width: 100, height: 30, text: "Send Message"),
          ],
        ),
      ),
    );
  }
}
