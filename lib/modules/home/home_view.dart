import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:modernisum/widgets/common/Footer.dart';
import 'package:modernisum/widgets/common/build_card.dart';
import 'package:modernisum/widgets/common/button_text.dart';
import 'package:modernisum/widgets/common/common_container.dart';
import 'package:modernisum/widgets/common/contact_form.dart';
import 'package:modernisum/widgets/common/manu_bar.dart';
import 'package:modernisum/widgets/common/top_logo.dart';
import 'package:modernisum/widgets/constants/assets.dart';
import 'home_controller.dart';
import 'package:lottie/lottie.dart';
import 'package:modernisum/theme/gradient.dart';

import 'package:modernisum/widgets/constants/responsive.dart';

class HomeView extends GetView<HomeController> {
  HomeView({super.key});

  get companyDescription => HomeController().companyDescription;
  get iotDescription => HomeController().iotDescription;
  final List<String> options = ['Option 1', 'Option 2', 'Option 3'];
  final Duration pause = const Duration(milliseconds: 1000);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButtonAnimator: FloatingActionButtonAnimator.scaling,
      backgroundColor: Colors.white70,
      floatingActionButton: Responsive.isDesktop(context)
          ? const ManuBar()
          : const TopLogo(text: 'Modernisum'),
      floatingActionButtonLocation: FloatingActionButtonLocation.miniCenterTop,
      // appBar: Responsive.isDesktop(context)
      //     ? AppBar(
      //         backgroundColor: WidgetStateColor.transparent,
      //         scrolledUnderElevation: 60,
      //         toolbarHeight: 30,
      //         bottom: const PreferredSize(
      //           preferredSize: Size.fromHeight(20),
      //           child: ManuBar(),
      //         ),
      //       )
      //     : null,
      body: SingleChildScrollView(
        controller: controller.scrollController,
        padding: EdgeInsets.all(40.h),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              height: 100.h,
            ),
            // first container
            CommonContainer(
              height: Responsive.isDesktop(context) ? 900.h : 600.h,
              width:
                  Responsive.isDesktop(context) ? 1800.h : context.width * 0.8,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Lottie.asset(AnimationPaths.circular,
                      height: context.height * 0.5, width: context.width * 0.5),
                  // ShaderMaskText3(
                  //     text: "your Business",
                  //     textStyle:
                  //         TextStyle(letterSpacing: 10.sp, fontSize: 50.sp)),
                  Positioned(
                    top: Responsive.isDesktop(context) ? 120.h : 200.h,
                    child: ShaderMaskText2(
                      text: "   Modernize \nYour Business",
                      textStyle: TextStyle(
                          letterSpacing: 10.sp,
                          fontSize:
                              Responsive.isDesktop(context) ? 100.sp : 100.sp,
                          fontWeight: FontWeight.w400),
                    ),
                  ),
                ],
              ),
            ),

            CommonContainer2(
                height: Responsive.isDesktop(context) ? 1000.h : 2600.h,
                width: 2000.h,
                child: Column(
                  children: [
                    SizedBox(
                      height: 50.h,
                    ),
                    ShaderMaskText1(text: "Our service", fontSize: 50.h),
                    const BuildServices(),
                    if (!Responsive.isDesktop(context))
                      ExploreButton(
                        text: "Explore Service",
                        onPressed: () => Get.toNamed('/services'),
                      ),
                  ],
                )),

            CommonContainer2(
                height: Responsive.isDesktop(context) ? 1000.h : 2600.h,
                width: 2000.h,
                child: Column(
                  children: [
                    ShaderMaskText1(text: "Portfolio", fontSize: 50.h),
                    const BuildPortfolio(),
                    if (!Responsive.isDesktop(context))
                      ExploreButton(
                          text: "Explore Portfolio",
                          onPressed: () => Get.toNamed('/portfolio')),
                  ],
                )),

            CommonContainer2(
                height: Responsive.isDesktop(context) ? 1000.h : 2600.h,
                width: 2000.h,
                child: Column(
                  children: [
                    ShaderMaskText1(text: "Blog", fontSize: 50.h),
                    const BuildBlog(),
                    if (!Responsive.isDesktop(context))
                      ExploreButton(
                          text: "More Blog",
                          onPressed: () => Get.toNamed('/blog')),
                  ],
                )),

            ShaderMaskText1(text: "ContactUs", fontSize: 50.h),
            const ContactForm(),
            const Footer(),
          ],
        ),
      ),
    );
  }
}
