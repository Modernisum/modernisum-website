import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'home_controller.dart';
import '../../widgets/common_page_layout.dart';
import 'package:lottie/lottie.dart';
import 'package:modernisum/assets.dart';
import 'package:modernisum/theme/gradient.dart';
import 'package:modernisum/widgets/text_box.dart';
import 'package:modernisum/widgets/common/TextField.dart';
import 'package:modernisum/widgets/constants/responsive.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});

  get name => HomeController().name;
  get email => HomeController().email;
  get massage => HomeController().massage;

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
                          // color: Colors.yellow,
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

    final PageController portfolioPageController = PageController(
        viewportFraction: 0.33); // Show three items at a time for Portfolio

    final _formKey = GlobalKey<FormState>();

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
                        TextBox1(
                          text: "$controller.companyDescription",
                          fontSize: Responsive.isDesktop(context) ? 50.h : 30.h,
                          //context: context,
                        ),
                        // Space between text and animation
                        Container(
                          height: context.height * 0.3,
                          width: context.width * 0.2,
                          child: Expanded(
                            flex: 2,
                            child: Lottie.asset(
                              '$AnimationPaths.tedianim',
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
                        TextBox1(
                          text: "We are a team of professions",
                          fontSize: 50.h,
                          // context: context,
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
                    ShaderMaskText1(text: "Our service", fontSize: 50.h),
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
                    ShaderMaskText1(text: "Portfolio", fontSize: 50.h),
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
                    ShaderMaskText1(text: "BLOG", fontSize: 50.h),
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
                    ShaderMaskText1(text: "ContactUs", fontSize: 50.h),
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
                            SizedBox(height: 20.h),
                            ElevatedButton(
                              onPressed: () {},
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
