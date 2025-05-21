import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'home_controller.dart';
import '../../widgets/common_page_layout.dart';
import 'package:lottie/lottie.dart';
import 'dart:async';
import 'package:flutter_email_sender/flutter_email_sender.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});

  Widget _buildGradientText(String text, double fontSize) {
    return ShaderMask(
      shaderCallback: (bounds) => const LinearGradient(
        colors: [
          Color.fromRGBO(245, 179, 1, 1),
          Colors.brown,
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(bounds),
      child: Text(
        text,
        style: TextStyle(
          fontSize: fontSize.sp,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
    );
  }

  Widget _buildServiceCard(
      BuildContext context, String title, String imagePath) {
    return Container(
      margin: EdgeInsets.only(top: 20.h),
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        height: context.height * 0.3,
        width: context.width * 0.3,
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
        child: Stack(
          children: [
            SizedBox(
              width: double.infinity,
              height: double.infinity,
              child: Image(
                image: AssetImage(imagePath),
                fit: BoxFit.cover,
              ),
            ),
            Positioned(
              bottom: 11.h,
              left: 0,
              right: 0,
              child: Opacity(
                opacity: 0.3,
                child: Container(
                  height: 30.h,
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Color.fromRGBO(15, 15, 14, 1),
                        Color.fromARGB(255, 0, 0, 0),
                      ],
                    ),
                  ),
                  child: Text(
                    textAlign: TextAlign.center,
                    title,
                    style: Theme.of(context).textTheme.titleLarge!.copyWith(
                          color: Colors.yellow,
                          fontWeight: FontWeight.bold,
                          fontSize: 20.sp,
                        ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

//Above is the code for the manu bar weget
  @override
  Widget build(BuildContext context) {
    final PageController _pageController =
        PageController(viewportFraction: 0.33); // Show three items at a time

    Timer.periodic(Duration(seconds: 3), (Timer timer) {
      if (_pageController.hasClients) {
        int nextPage = _pageController.page!.toInt() + 1;
        if (nextPage >= controller.services.length) {
          nextPage = 0;
        }
        _pageController.animateToPage(
          nextPage,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      }
    });

    final PageController portfolioPageController = PageController(
        viewportFraction: 0.33); // Show three items at a time for Portfolio

    Timer.periodic(const Duration(seconds: 3), (Timer timer) {
      if (portfolioPageController.hasClients) {
        int nextPage = portfolioPageController.page!.toInt() + 1;
        if (nextPage >= controller.portfolioItems.length) {
          nextPage = 0;
        }
        portfolioPageController.animateToPage(
          nextPage,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeInOut,
        );
      }
    });

    final _formKey = GlobalKey<FormState>();
    final TextEditingController _nameController = TextEditingController();
    final TextEditingController _emailController = TextEditingController();
    final TextEditingController _messageController = TextEditingController();

    Future<void> _sendEmail() async {
      if (_formKey.currentState!.validate()) {
        final Email email = Email(
          body: _messageController.text,
          subject: 'Contact Form Message from ${_nameController.text}',
          recipients: ['modernisum@gmail.com'],
          isHTML: false,
        );

        try {
          await FlutterEmailSender.send(email);
          Get.snackbar('Success', 'Message sent successfully!',
              snackPosition: SnackPosition.BOTTOM);
        } catch (error) {
          Get.snackbar('Error', 'Failed to send message.',
              snackPosition: SnackPosition.BOTTOM);
        }
      }
    }

    return CommonPageLayout(
      isTransparent: true,
      child: SingleChildScrollView(
        controller: controller.scrollController,
        child: Padding(
          padding: EdgeInsets.only(
            top: 50.h,
            left: 30.w,
            right: 30.w,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: double.infinity,
                margin: EdgeInsets.only(top: 150.h),
                padding: EdgeInsets.symmetric(horizontal: 20.w),
                alignment: Alignment.topCenter,
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 10.w, vertical: 15.h),
                          child: Container(
                            height: context.height * 0.3,
                            width: context.width * 0.6,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(
                                  context.width > 600.w ? 60.r : 120.r),
                              gradient: const LinearGradient(
                                colors: [
                                  Color.fromRGBO(245, 179, 1, 1),
                                  Colors.brown,
                                ],
                              ),
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.blue,
                                    offset: Offset(0, -1.h),
                                    blurRadius: 5.r),
                                BoxShadow(
                                    color: Colors.brown,
                                    offset: Offset(0, 1.h),
                                    blurRadius: 5.r),
                              ],
                            ),
                            child: Center(
                              child: Padding(
                                padding: EdgeInsets.all(20.w),
                                child: Text(
                                  controller.companyDescription,
                                  textAlign: TextAlign.center,
                                  style: Theme.of(context)
                                      .textTheme
                                      .labelSmall!
                                      .copyWith(
                                        color: Colors.white,
                                        letterSpacing: 1.2,
                                        fontWeight: FontWeight.w500,
                                        fontSize: context.width > 600.w
                                            ? 25.sp
                                            : 20.sp,
                                      ),
                                ),
                              ),
                            ),
                          ),
                        ),
                        // Space between text and animation
                        Container(
                          height: context.height * 0.3,
                          width: context.width * 0.2,
                          child: Expanded(
                            flex: 2,
                            child: Lottie.asset(
                              '/animation/animation1.json',
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                      ],
                    ),
                    // Space between animation and description
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          height: context.height * 0.3,
                          width: context.width * 0.2,
                          child: Expanded(
                            flex: 2,
                            child: Lottie.asset(
                              '/animation/animation10.json',
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(top: 20.h),
                          padding: EdgeInsets.symmetric(
                              horizontal: 10.w, vertical: 15.h),
                          child: Container(
                            height: context.height * 0.3,
                            width: context.width * 0.6,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(
                                context.width > 600.w ? 60.r : 120.r,
                              ),
                              gradient: const LinearGradient(colors: [
                                Color.fromRGBO(245, 179, 1, 1),
                                Colors.brown,
                              ]),
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.blue,
                                    offset: Offset(0, -1.h),
                                    blurRadius: 5.r),
                                BoxShadow(
                                    color: Colors.brown,
                                    offset: Offset(0, 1.h),
                                    blurRadius: 5.r),
                              ],
                            ),
                            child: Expanded(
                              flex: 1,
                              child: Center(
                                child: Padding(
                                  padding: EdgeInsets.all(20.w),
                                  child: Text(
                                    controller.iotDescription,
                                    textAlign: TextAlign.center,
                                    style: Theme.of(context)
                                        .textTheme
                                        .labelSmall!
                                        .copyWith(
                                          color: Colors.white,
                                          letterSpacing: 1.2,
                                          fontWeight: FontWeight.w500,
                                          fontSize: context.width > 600.w
                                              ? 25.sp
                                              : 20.sp,
                                        ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // space between description and services
              // SizedBox(height: 5.h),
              Container(
                margin: EdgeInsets.only(left: 150.w, right: 150.w),
                child: Column(
                  children: [
                    _buildGradientText("OUR SERVICES", 50.h),
                    SizedBox(
                      height: 600.h,
                      child: PageView.builder(
                        controller: _pageController,
                        itemCount: controller.services.length,
                        itemBuilder: (context, index) {
                          final service = controller.services[index];
                          return _buildServiceCard(
                            context,
                            service.title,
                            service.imagePath,
                          );
                        },
                      ),
                    ),

                    // space between services and portfolio
                    SizedBox(height: 20.h),
                    _buildGradientText("PORTFOLIO", 50.h),
                    SizedBox(
                      height: 600.h,
                      child: PageView.builder(
                        controller: portfolioPageController,
                        itemCount: controller.portfolioItems.length,
                        itemBuilder: (context, index) {
                          final item = controller.portfolioItems[index];
                          return _buildServiceCard(
                            context,
                            item.title,
                            item.imagePath,
                          );
                        },
                      ),
                    ),
                    SizedBox(height: 20.h),
                    _buildGradientText("BLOG", 50.h),
                    SizedBox(
                      height: 600.h,
                      child: PageView.builder(
                        controller: portfolioPageController,
                        itemCount: controller.portfolioItems.length,
                        itemBuilder: (context, index) {
                          final item = controller.portfolioItems[index];
                          return _buildServiceCard(
                            context,
                            item.title,
                            item.imagePath,
                          );
                        },
                      ),
                    ),
                    _buildGradientText("Contact Us", 50.h),
                    Container(
                      width: context.width * 0.6,
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
                        key: _formKey,
                        child: Column(
                          children: [
                            TextFormField(
                              controller: _nameController,
                              decoration: InputDecoration(labelText: 'Name'),
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your name';
                                }
                                return null;
                              },
                            ),
                            SizedBox(height: 10.h),
                            TextFormField(
                              controller: _emailController,
                              decoration: InputDecoration(labelText: 'Email'),
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your email';
                                }
                                if (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
                                    .hasMatch(value)) {
                                  return 'Please enter a valid email';
                                }
                                return null;
                              },
                            ),
                            SizedBox(height: 10.h),
                            TextFormField(
                              controller: _messageController,
                              decoration: InputDecoration(labelText: 'Message'),
                              maxLines: 5,
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your message';
                                }
                                return null;
                              },
                            ),
                            SizedBox(height: 20.h),
                            ElevatedButton(
                              onPressed: _sendEmail,
                              style: ElevatedButton.styleFrom(
                                padding: EdgeInsets.symmetric(
                                    horizontal: 20.w, vertical: 10.h),
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
                                  height: 50.h,
                                  width: 300.w,
                                  alignment: Alignment.center,
                                  child: Text(
                                    'Send Message',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 18.sp,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // space between portfolio and footer
                    Container(
                      height: 200.h,
                      width: double.infinity,
                      margin: EdgeInsets.only(bottom: 30.h),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "COPYRIGHT © 2025 MODERNISUM",
                            style: Theme.of(context)
                                .textTheme
                                .labelSmall!
                                .copyWith(
                                  color: const Color.fromRGBO(245, 179, 1, 1),
                                  letterSpacing: 1.2,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 15.sp,
                                ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
