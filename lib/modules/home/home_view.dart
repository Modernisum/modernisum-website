import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'home_controller.dart';
import '../../widgets/common_page_layout.dart';
import 'package:lottie/lottie.dart';

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

  Widget _buildServiceCard(BuildContext context, String title, String imagePath) {
    return Container(
      margin: EdgeInsets.only(top: 20.h),
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        height: 300.h,
        width: 250.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.r),
          gradient: const LinearGradient(colors: [
            Color.fromRGBO(251, 252, 204, 1),
            Color(0xFFF0F8CB),
          ]),
          boxShadow: [
            BoxShadow(color: Colors.blue, offset: Offset(0, -1.h), blurRadius: 5.r),
            BoxShadow(color: Colors.brown, offset: Offset(0, 1.h), blurRadius: 5.r),
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

  @override
  Widget build(BuildContext context) {
    return CommonPageLayout(
      isTransparent: true,
      child: SingleChildScrollView(
        controller: controller.scrollController,
        child: Column(
          children: [
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height,
              margin: EdgeInsets.only(top: 150.h),
              padding: EdgeInsets.symmetric(horizontal: 20.w),
              alignment: Alignment.topCenter,
              child: Column(
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
                    child: Container(
                      height: 200.h,
                      width: 1200.w,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20.r),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(245, 179, 1, 1),
                          Colors.brown,
                        ]),
                        boxShadow: [
                          BoxShadow(color: Colors.blue, offset: Offset(0, -1.h), blurRadius: 5.r),
                          BoxShadow(color: Colors.brown, offset: Offset(0, 1.h), blurRadius: 5.r),
                        ],
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            flex: 1,
                            child: Center(
                              child: Padding(
                                padding: EdgeInsets.all(20.w),
                                child: Text(
                                  controller.companyDescription,
                                  textAlign: TextAlign.center,
                                  style: Theme.of(context).textTheme.labelSmall!.copyWith(
                                        color: Colors.white,
                                        letterSpacing: 1.2,
                                        fontWeight: FontWeight.w500,
                                        fontSize: 15.sp,
                                      ),
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                            flex: 2,
                            child: Lottie.asset(
                              '/animation/animation1.json',
                              fit: BoxFit.contain,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 20.h),
                    padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
                    child: Container(
                      height: 200.h,
                      width: 1200.w,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20.r),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(245, 179, 1, 1),
                          Colors.brown,
                        ]),
                        boxShadow: [
                          BoxShadow(color: Colors.blue, offset: Offset(0, -1.h), blurRadius: 5.r),
                          BoxShadow(color: Colors.brown, offset: Offset(0, 1.h), blurRadius: 5.r),
                        ],
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            flex: 2,
                            child: Lottie.asset(
                              '/animation/animation10.json',
                              fit: BoxFit.contain,
                            ),
                          ),
                          Expanded(
                            flex: 1,
                            child: Center(
                              child: Padding(
                                padding: EdgeInsets.all(20.w),
                                child: Text(
                                  controller.iotDescription,
                                  textAlign: TextAlign.center,
                                  style: Theme.of(context).textTheme.labelSmall!.copyWith(
                                        color: Colors.white,
                                        letterSpacing: 1.2,
                                        fontWeight: FontWeight.w500,
                                        fontSize: 15.sp,
                                      ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20.h),
            _buildGradientText("OUR SERVICES", 50.h),
            Wrap(
              spacing: 20.w,
              runSpacing: 20.h,
              alignment: WrapAlignment.center,
              children: controller.services
                  .map((service) => _buildServiceCard(context, service.title, service.imagePath))
                  .toList(),
            ),
            SizedBox(height: 20.h),
            _buildGradientText("PORTFOLIO", 50.h),
            Wrap(
              spacing: 20.w,
              runSpacing: 20.h,
              alignment: WrapAlignment.center,
              children: controller.portfolioItems
                  .map((item) => _buildServiceCard(context, item.title, item.imagePath))
                  .toList(),
            ),
            Container(
              height: 200.h,
              width: double.infinity,
              margin: EdgeInsets.only(bottom: 30.h),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "COPYRIGHT © 2025 MODERNISUM",
                    style: Theme.of(context).textTheme.labelSmall!.copyWith(
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
    );
  }
}
