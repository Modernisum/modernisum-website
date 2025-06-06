import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'contact_controller.dart';

//import '../../widgets/responsive_layout.dart';
import '../../theme/app_theme.dart';

class ContactView extends GetView<ContactController> {
  const ContactView({super.key});

  Future<void> _sendEmail(String subject, String body) async {
    try {
      final Uri emailLaunchUri = Uri(
        scheme: 'mailto',
        path: 's.b.dayalpur@gmail.com',
        queryParameters: {
          'subject': subject,
          'body': body,
        },
      );

      if (await canLaunchUrl(emailLaunchUri)) {
        await launchUrl(
          emailLaunchUri,
          mode: LaunchMode.externalApplication,
        );
        Get.snackbar(
          'Success',
          'Email client opened successfully',
          snackPosition: SnackPosition.BOTTOM,
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
      } else {
        throw Exception('Could not launch email client');
      }
    } catch (e) {
      Get.snackbar(
        'Error',
        'Failed to open email client. Please try again or contact us directly.',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _buildMobileLayout(),
      ),
    );
  }

  Widget _buildMobileLayout() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(20.w),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Contact Us',
            style: TextStyle(
              fontSize: 28.sp,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          SizedBox(height: 20.h),
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(15.w),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.9),
              borderRadius: BorderRadius.circular(10.r),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  spreadRadius: 2.r,
                  blurRadius: 5.r,
                  offset: Offset(0, 3.h),
                ),
              ],
            ),
            child: Column(
              children: [
                _buildContactInfo(
                  Icons.location_on,
                  'Address',
                  'near ccsu university  meerut Uttar Pradesh India (250401)',
                ),
                SizedBox(height: 15.h),
                _buildContactInfo(
                  Icons.phone,
                  'Phone',
                  '+91 9368671007',
                ),
                SizedBox(height: 15.h),
                _buildContactInfo(
                  Icons.email,
                  'Email',
                  's.b.dayalpur@gmail.com',
                ),
                SizedBox(height: 20.h),
                _buildContactForm(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactInfo(IconData icon, String title, String content) {
    return Container(
      padding: EdgeInsets.all(15.w),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.r),
      ),
      child: Row(
        children: [
          Icon(icon, size: 30.w, color: Colors.blue),
          SizedBox(width: 15.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                SizedBox(height: 5.h),
                Text(
                  content,
                  style: TextStyle(
                    fontSize: 16.sp,
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactForm() {
    final TextEditingController nameController = TextEditingController();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController messageController = TextEditingController();

    void _resetForm() {
      nameController.clear();
      emailController.clear();
      messageController.clear();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'Send us a message',
          style: TextStyle(
            fontSize: 20.sp,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 20.h),
        TextField(
          controller: nameController,
          decoration: InputDecoration(
            labelText: 'Name',
            labelStyle: TextStyle(fontSize: 16.sp),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
              borderSide: const BorderSide(color: AppTheme.primaryColor),
            ),
            contentPadding:
                EdgeInsets.symmetric(horizontal: 15.w, vertical: 15.h),
          ),
        ),
        SizedBox(height: 15.h),
        TextField(
          controller: emailController,
          decoration: InputDecoration(
            labelText: 'Email',
            labelStyle: TextStyle(fontSize: 16.sp),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
              borderSide: BorderSide(color: AppTheme.primaryColor),
            ),
            contentPadding:
                EdgeInsets.symmetric(horizontal: 15.w, vertical: 15.h),
          ),
        ),
        SizedBox(height: 15.h),
        TextField(
          controller: messageController,
          maxLines: 5,
          decoration: InputDecoration(
            labelText: 'Message',
            labelStyle: TextStyle(fontSize: 16.sp),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
              borderSide: BorderSide(color: AppTheme.primaryColor),
            ),
            contentPadding:
                EdgeInsets.symmetric(horizontal: 15.w, vertical: 15.h),
          ),
        ),
        SizedBox(height: 20.h),
        ElevatedButton(
          onPressed: () async {
            if (nameController.text.isEmpty ||
                emailController.text.isEmpty ||
                messageController.text.isEmpty) {
              Get.snackbar(
                'Error',
                'Please fill all fields',
                snackPosition: SnackPosition.BOTTOM,
                backgroundColor: Colors.red,
                colorText: Colors.white,
              );
              return;
            }

            final subject =
                'New Contact Form Submission from ${nameController.text}';
            final body = '''
Name: ${nameController.text}
Email: ${emailController.text}

Message:
${messageController.text}
''';

            try {
              await _sendEmail(subject, body);
              _resetForm();
              Get.snackbar(
                'Success',
                'Message sent successfully!',
                snackPosition: SnackPosition.BOTTOM,
                backgroundColor: Colors.green,
                colorText: Colors.white,
                duration: const Duration(seconds: 3),
              );
            } catch (e) {
              Get.snackbar(
                'Error',
                'Failed to send message. Please try again.',
                snackPosition: SnackPosition.BOTTOM,
                backgroundColor: Colors.red,
                colorText: Colors.white,
              );
            }
          },
          style: ElevatedButton.styleFrom(
            padding: EdgeInsets.symmetric(vertical: 15.h),
            backgroundColor: AppTheme.primaryColor,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
          ),
          child: Text(
            'Send Message',
            style: TextStyle(fontSize: 16.sp),
          ),
        ),
      ],
    );
  }
}
