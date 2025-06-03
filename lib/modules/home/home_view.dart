import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:modernisum/widgets/common/Footer.dart';
import 'package:modernisum/widgets/common/build_card.dart';
import 'package:modernisum/widgets/common/contact_form.dart';
import 'package:modernisum/widgets/common/manu_bar.dart';
import 'package:modernisum/widgets/constants/assets.dart';
import 'package:modernisum/widgets/constants/color.dart';
import 'home_controller.dart';
import 'package:lottie/lottie.dart';
import 'package:modernisum/theme/gradient.dart';
import 'package:modernisum/widgets/text_box.dart';
import 'package:modernisum/widgets/constants/responsive.dart';

class HomeView extends GetView<HomeController> {
  HomeView({super.key});

  get companyDescription => HomeController().companyDescription;
  get iotDescription => HomeController().iotDescription;
  final List<String> options = ['Option 1', 'Option 2', 'Option 3'];

//Above is the code for the manu bar weget
  @override
  Widget build(BuildContext context) {
    final PageController pageController =
        PageController(viewportFraction: 0.33); // Show three items at a time

    final PageController portfolioPageController = PageController(
        viewportFraction: 0.33); // Show three items at a time for Portfolio

    return Scaffold(
      backgroundColor: Colors.white70,
      appBar: Responsive.isDesktop(context)
          ? AppBar(
              backgroundColor: WidgetStateColor.transparent,
              scrolledUnderElevation: 60,
              toolbarHeight: 20,
              bottom: const PreferredSize(
                preferredSize: Size.fromHeight(20),
                child: ManuBar(),
              ),
            )
          : null,
      body: SingleChildScrollView(
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
                          text: "$companyDescription",
                          fontSize: Responsive.isDesktop(context) ? 35.h : 20.h,
                          //context: context,
                        ),
                        // Space between text and animation
                        SizedBox(
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
                        TextBox1(
                          text: "$iotDescription.",
                          fontSize: 35.h,
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
                        controller: pageController,
                        itemCount: controller.services.length,
                        itemBuilder: (context, index) {
                          final service = controller.services[index];
                          return BuildCard(
                            title: service.title,
                            imagePath: service.imagePath,
                          );
                        },
                      ),
                    ),

                    // space between services and portfolio
                    SizedBox(height: 50.h),
                    ShaderMaskText1(text: "Portfolio", fontSize: 50.h),
                    SizedBox(
                      height: 600.h,
                      child: PageView.builder(
                        controller: portfolioPageController,
                        itemCount: controller.portfolioItems.length,
                        itemBuilder: (context, index) {
                          final item = controller.portfolioItems[index];
                          return BuildCard(
                            title: item.title,
                            imagePath: item.imagePath,
                          );
                        },
                      ),
                    ),
                    SizedBox(height: 50.h),
                    ShaderMaskText1(text: "BLOG", fontSize: 50.h),
                    SizedBox(
                      height: 800.h,
                      child: PageView.builder(
                        controller: portfolioPageController,
                        itemCount: controller.portfolioItems.length,
                        itemBuilder: (context, index) {
                          final item = controller.portfolioItems[index];
                          return BuildCard(
                            title: item.title,
                            imagePath: item.imagePath,
                          );
                        },
                      ),
                    ),
                    ShaderMaskText1(
                        text: "ContactUs", fontSize: 50.h), // contact headline

                    const ContactForm(), // contact page

                    // space between portfolio and footer
                    const Footer(),
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
