import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:modernisum/widgets/constants/color.dart';
import 'package:modernisum/widgets/constants/responsive.dart';
import 'package:modernisum/modules/home/home_controller.dart';

class BuildServices extends GetView<HomeController> {
  const BuildServices({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Show three items at a time

    final PageController pageController =
        PageController(viewportFraction: 0.33);

    return SizedBox(
      height: Responsive.isDesktop(context) ? 800.h : 2300.h,
      child: ListView.builder(
        scrollDirection:
            Responsive.isDesktop(context) ? Axis.horizontal : Axis.vertical,
        controller: pageController,
        itemCount: controller.services.length,
        itemBuilder: (context, index) {
          final service = controller.services[index];
          return Container(
            margin: EdgeInsets.only(top: 20.h),
            padding:
                EdgeInsets.all(Responsive.isTablet(context) ? 100.h : 20.h),
            child: Container(
              height: Responsive.isDesktop(context)
                  ? 1200.h
                  : Responsive.isTablet(context)
                      ? 850.h
                      : 650.h,
              width: Responsive.isDesktop(context)
                  ? 600.w
                  : Responsive.isTablet(context)
                      ? 850.w
                      : 650.w,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.r),
                gradient: const LinearGradient(colors: [
                  Color.fromRGBO(251, 252, 204, 1),
                  Color(0xFFF0F8CB),
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
              child: Stack(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: double.infinity,
                    child: Image(
                      image: AssetImage(service.imagePath),
                      fit: BoxFit.fill,
                    ),
                  ),
                  Positioned(
                    bottom: 0.h,
                    left: 0,
                    right: 0,
                    child: Stack(
                      children: [
                        Opacity(
                          opacity: 0.6,
                          child: Container(
                            height: 300.h,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              boxShadow: const [
                                BoxShadow(color: Colors.blueAccent)
                              ],
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(150.r),
                                topRight: Radius.circular(150.r),
                              ),
                              gradient: AppGradients.primary,
                            ),
                          ),
                        ),
                        Positioned(
                            right: 100.h,
                            left: 100.h,
                            bottom: 200.h,
                            child: ElevatedButton(
                                onPressed: () => Get.toNamed('/services'),
                                child: Text(service.title
                                    //style: Colors.orange,
                                    ))),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class BuildPortfolio extends GetView<HomeController> {
  const BuildPortfolio({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Show three items at a time

    final PageController portfolioPageController =
        PageController(viewportFraction: 0.33);
    return SizedBox(
      height: Responsive.isDesktop(context) ? 800.h : 2300.h,
      child: ListView.builder(
        scrollDirection:
            Responsive.isDesktop(context) ? Axis.horizontal : Axis.vertical,
        controller: portfolioPageController,
        itemCount: controller.portfolioItems.length,
        itemBuilder: (context, index) {
          final Portfolio = controller.portfolioItems[index];
          return Container(
            margin: EdgeInsets.only(top: 20.h),
            padding:
                EdgeInsets.all(Responsive.isTablet(context) ? 100.h : 20.h),
            child: Container(
              height: Responsive.isDesktop(context)
                  ? 1200.h
                  : Responsive.isTablet(context)
                      ? 850.h
                      : 650.h,
              width: Responsive.isDesktop(context)
                  ? 600.w
                  : Responsive.isTablet(context)
                      ? 850.w
                      : 650.w,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.r),
                gradient: const LinearGradient(colors: [
                  Color.fromRGBO(251, 252, 204, 1),
                  Color(0xFFF0F8CB),
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
              child: Stack(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: double.infinity,
                    child: Image(
                      image: AssetImage(Portfolio.imagePath),
                      fit: BoxFit.fill,
                    ),
                  ),
                  Positioned(
                    bottom: 0.h,
                    left: 0,
                    right: 0,
                    child: Stack(
                      children: [
                        Opacity(
                          opacity: 0.6,
                          child: Container(
                            height: 300.h,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              boxShadow: const [
                                BoxShadow(color: Colors.blueAccent)
                              ],
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(150.r),
                                topRight: Radius.circular(150.r),
                              ),
                              gradient: AppGradients.primary,
                            ),
                          ),
                        ),
                        Positioned(
                            right: 100.h,
                            left: 100.h,
                            bottom: 200.h,
                            child: ElevatedButton(
                                onPressed: () => Get.toNamed('/portfolio'),
                                child: Text(Portfolio.title
                                    //style: Colors.orange,
                                    ))),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class BuildBlog extends GetView<HomeController> {
  const BuildBlog({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Show three items at a time

    final PageController portfolioPageController =
        PageController(viewportFraction: 0.33);
    return SizedBox(
      height: Responsive.isDesktop(context) ? 800.h : 2300.h,
      child: ListView.builder(
        scrollDirection:
            Responsive.isDesktop(context) ? Axis.horizontal : Axis.vertical,
        controller: portfolioPageController,
        itemCount: controller.portfolioItems.length,
        itemBuilder: (context, index) {
          final blog = controller.portfolioItems[index];
          return Container(
            margin: EdgeInsets.only(top: 20.h),
            padding:
                EdgeInsets.all(Responsive.isTablet(context) ? 100.h : 20.h),
            child: Container(
              height: Responsive.isDesktop(context)
                  ? 1200.h
                  : Responsive.isTablet(context)
                      ? 850.h
                      : 650.h,
              width: Responsive.isDesktop(context)
                  ? 600.w
                  : Responsive.isTablet(context)
                      ? 850.w
                      : 650.w,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.r),
                gradient: const LinearGradient(colors: [
                  Color.fromRGBO(251, 252, 204, 1),
                  Color(0xFFF0F8CB),
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
              child: Stack(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: double.infinity,
                    child: Image(
                      image: AssetImage(blog.imagePath),
                      fit: BoxFit.fill,
                    ),
                  ),
                  Positioned(
                    bottom: 0.h,
                    left: 0,
                    right: 0,
                    child: Stack(
                      children: [
                        Opacity(
                          opacity: 0.6,
                          child: Container(
                            height: 300.h,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              boxShadow: const [
                                BoxShadow(color: Colors.blueAccent)
                              ],
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(150.r),
                                topRight: Radius.circular(150.r),
                              ),
                              gradient: AppGradients.primary,
                            ),
                          ),
                        ),
                        Positioned(
                          right: 100.h,
                          left: 100.h,
                          bottom: 200.h,
                          child: ElevatedButton(
                            onPressed: () => Get.toNamed('/blog'),
                            child: Text(blog.title
                                //style: Colors.orange,
                                ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
