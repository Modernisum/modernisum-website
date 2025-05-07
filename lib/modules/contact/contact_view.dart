import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';
import 'contact_controller.dart';
import '../../widgets/common_page_layout.dart';
import '../../widgets/responsive_layout.dart';
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
    Size size = MediaQuery.of(context).size;
    return CommonPageLayout(
      child: Center(
        child: ResponsiveLayout(
          mobile: _buildMobileLayout(),
          tablet: _buildTabletLayout(),
          desktop: _buildDesktopLayout(),
        ),
      ),
    );
  }

  Widget _buildMobileLayout() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Contact Us',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 20),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(15),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.9),
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  spreadRadius: 2,
                  blurRadius: 5,
                  offset: const Offset(0, 3),
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
                const SizedBox(height: 15),
                _buildContactInfo(
                  Icons.phone,
                  'Phone',
                  '+91 9368671007',
                ),
                const SizedBox(height: 15),
                _buildContactInfo(
                  Icons.email,
                  'Email',
                  's.b.dayalpur@gmail.com',
                ),
                const SizedBox(height: 20),
                _buildContactForm(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabletLayout() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(30),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Contact Us',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 30),
          Container(
            width: 600,
            padding: const EdgeInsets.all(25),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.9),
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  spreadRadius: 2,
                  blurRadius: 5,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Column(
              children: [
                _buildContactInfo(
                  Icons.location_on,
                  'Address',
                  'jawar calony ,parikshitgarh meerut Uttar Pradesh India (250406)',
                ),
                const SizedBox(height: 20),
                _buildContactInfo(
                  Icons.phone,
                  'Phone',
                  '+91 9368671007',
                ),
                const SizedBox(height: 20),
                _buildContactInfo(
                  Icons.email,
                  'Email',
                  's.b.dayalpur@gmail.com',
                ),
                const SizedBox(height: 30),
                _buildContactForm(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopLayout() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(40),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Contact Us',
            style: TextStyle(
              fontSize: 46,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 40),
          Container(
            width: 800,
            padding: const EdgeInsets.all(30),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.9),
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  spreadRadius: 2,
                  blurRadius: 5,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 1,
                  child: Column(
                    children: [
                      _buildContactInfo(
                        Icons.location_on,
                        'Address',
                        'jawar calony ,parikshitgarh meerut Uttar Pradesh India (250406)',
                      ),
                      const SizedBox(height: 20),
                      _buildContactInfo(
                        Icons.phone,
                        'Phone',
                        '+91 9368671007',
                      ),
                      const SizedBox(height: 20),
                      _buildContactInfo(
                        Icons.email,
                        'Email',
                        's.b.dayalpur@gmail.com',
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 40),
                Expanded(
                  flex: 2,
                  child: _buildContactForm(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactInfo(IconData icon, String title, String content) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: StatefulBuilder(
        builder: (context, setState) {
          bool isHovered = false;
          return Container(
            padding: const EdgeInsets.all(15),
            decoration: BoxDecoration(
              color: isHovered
                  ? AppTheme.primaryColor.withOpacity(0.1)
                  : Colors.transparent,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                Icon(icon,
                    size: 30,
                    color: isHovered ? const Color(0xFFF5B301) : Colors.blue),
                const SizedBox(width: 15),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color:
                              isHovered ? AppTheme.primaryColor : Colors.black,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        content,
                        style: TextStyle(
                          fontSize: 16,
                          color:
                              isHovered ? AppTheme.primaryColor : Colors.grey,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
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
        const Text(
          'Send us a message',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 20),
        TextField(
          controller: nameController,
          decoration: InputDecoration(
            labelText: 'Name',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: AppTheme.primaryColor),
            ),
          ),
        ),
        const SizedBox(height: 15),
        TextField(
          controller: emailController,
          decoration: InputDecoration(
            labelText: 'Email',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: AppTheme.primaryColor),
            ),
          ),
        ),
        const SizedBox(height: 15),
        TextField(
          controller: messageController,
          maxLines: 5,
          decoration: InputDecoration(
            labelText: 'Message',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: AppTheme.primaryColor),
            ),
          ),
        ),
        const SizedBox(height: 20),
        MouseRegion(
          cursor: SystemMouseCursors.click,
          child: StatefulBuilder(
            builder: (context, setState) {
              bool isHovered = false;
              return ElevatedButton(
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
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  backgroundColor:
                      isHovered ? AppTheme.primaryColor : Colors.blue,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                onHover: (hovered) {
                  setState(() {
                    isHovered = hovered;
                  });
                },
                child: const Text('Send Message'),
              );
            },
          ),
        ),
      ],
    );
  }
}
