import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:modernisum/widgets/common/Footer.dart';
import 'package:modernisum/widgets/common/build_card.dart';
import 'package:modernisum/widgets/common/button_text.dart';
import 'package:modernisum/widgets/common/contact_form.dart';
import 'package:modernisum/widgets/common/manu_bar.dart';
import 'package:modernisum/widgets/common/top_logo.dart';
import 'package:modernisum/widgets/constants/assets.dart';
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
    return Scaffold(
      drawer: Responsive.isDesktop(context)
          ? null
          : Drawer(
              backgroundColor: Colors.white70,
              child: ListView(
                children: const [
                  DrawerHeader(
                    decoration: BoxDecoration(color: Colors.blue),
                    child: Text('Drawer Header',
                        style: TextStyle(color: Colors.white)),
                  ),
                  ListTile(title: Text('Item 1')),
                  ListTile(title: Text('Item 2')),
                ],
              ),
            ),
      floatingActionButtonAnimator: FloatingActionButtonAnimator.scaling,
      backgroundColor: Colors.white70,
      floatingActionButton: Responsive.isDesktop(context)
          ? null
          : const TopLogo(text: 'Modernisum'),
      floatingActionButtonLocation: FloatingActionButtonLocation.miniCenterTop,
      appBar: Responsive.isDesktop(context)
          ? AppBar(
              backgroundColor: WidgetStateColor.transparent,
              scrolledUnderElevation: 60,
              toolbarHeight: 30,
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
            spacing: 50.h,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: double.infinity,
                margin: EdgeInsets.only(top: 150.h),
                padding: EdgeInsets.symmetric(horizontal: 20.w),
                alignment: Alignment.topCenter,
                child: Column(
                  spacing: 60.h,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        if (Responsive.isDesktop(context))
                          TextBox1(
                            text: "$companyDescription",
                            fontSize:
                                Responsive.isDesktop(context) ? 35.h : 30.h,
                            //context: context,
                          ),
                        // Space between text and animation
                        Responsive.isDesktop(context)
                            ? SizedBox(
                                height: context.height * 0.3,
                                width: context.width * 0.2,
                                child: Expanded(
                                  flex: 1,
                                  child: Lottie.asset(
                                    AnimationPaths.tedianim,
                                    fit: BoxFit.contain,
                                  ),
                                ),
                              )
                            : const SizedBox.shrink(),
                      ],
                    ),
                    // Space between animation and description
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Responsive.isDesktop(context)
                            ? SizedBox(
                                height: context.height * 0.3,
                                width: context.width * 0.2,
                                child: Expanded(
                                  flex: 1,
                                  child: Lottie.asset(
                                    AnimationPaths.roboanim,
                                    fit: BoxFit.contain,
                                  ),
                                ),
                              )
                            : const SizedBox.shrink(),
                        TextBox1(
                          text: "$iotDescription.",
                          fontSize: Responsive.isDesktop(context) ? 35.h : 20.h,
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
                margin: EdgeInsets.only(left: 100.w, right: 100.w),
                child: Column(
                  spacing: 50.h,
                  children: [
                    ShaderMaskText1(text: "Our service", fontSize: 50.h),
                    const BuildServices(),
                    if (!Responsive.isDesktop(context))
                      ExploreButton(
                        text: "Explore Service",
                        onPressed: () => Get.toNamed('/services'),
                      ),

                    ShaderMaskText1(text: "Portfolio", fontSize: 50.h),
                    // BuildCard(title: item.title, imagePath: imagePath, routeName: routeName, itemCount: itemCount, item: item)
                    const BuildPortfolio(),
                    if (!Responsive.isDesktop(context))
                      ExploreButton(
                          text: "Explore Portfolio",
                          onPressed: () => Get.toNamed('/portfolio')),
                    ShaderMaskText1(text: "Blog", fontSize: 50.h),
                    // BuildCard(title: item.title, imagePath: imagePath, routeName: routeName, itemCount: itemCount, item: item)
                    const BuildBlog(),
                    if (!Responsive.isDesktop(context))
                      ExploreButton(
                          text: "More Blog",
                          onPressed: () => Get.toNamed('/blog')),
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
