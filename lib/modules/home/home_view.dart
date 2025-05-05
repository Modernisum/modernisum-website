import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'home_controller.dart';
import '../../widgets/common_page_layout.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});

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
              // padding: const EdgeInsets.symmetric(horizontal: 50),
              alignment: Alignment.center,
              child: AnimatedTextKit(
                animatedTexts: [
                  FadeAnimatedText(
                    'Welcome Modernisum',
                    textStyle: const TextStyle(
                      fontSize: 54.0,
                      fontWeight: FontWeight.bold,
                      color: Color.fromRGBO(245, 179, 1, 1),
                    ),
                    duration: const Duration(seconds: 2),
                    fadeInEnd: 0.3,
                    fadeOutBegin: 0.7,
                  ),
                  FadeAnimatedText(
                    'Let\'s Start',
                    textStyle: const TextStyle(
                      fontSize: 64.0,
                      fontWeight: FontWeight.bold,
                      color: Colors.green,
                    ),
                    duration: const Duration(seconds: 2),
                    fadeInEnd: 0.3,
                    fadeOutBegin: 0.7,
                  ),
                  FadeAnimatedText(
                    'Modernize your business',
                    textStyle: const TextStyle(
                      fontSize: 54.0,
                      fontWeight: FontWeight.bold,
                      color: Colors.red,
                    ),
                    duration: const Duration(seconds: 2),
                    fadeInEnd: 0.3,
                    fadeOutBegin: 0.7,
                  ),
                ],
                totalRepeatCount: 1,
                onTap: controller.handleTap,
                onNextBeforePause: (index, isLast) {
                  controller.updateIndex(index);
                  if (isLast) {
                    controller.scrollToServices();
                  }
                },
              ),
            ),
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height,
              padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 30),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Our Services',
                    style: TextStyle(
                      fontSize: 42,
                      fontWeight: FontWeight.bold,
                      color: Color.fromRGBO(245, 179, 1, 1),
                    ),
                  ),
                  const SizedBox(height: 30),
                  Expanded(
                    child: GridView.count(
                      crossAxisCount: 3,
                      crossAxisSpacing: 20,
                      mainAxisSpacing: 20,
                      children: List.generate(
                        6,
                        (index) => Card(
                          elevation: 5,
                          child: Container(
                            padding: const EdgeInsets.all(20),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.business, size: 48),
                                SizedBox(height: 15),
                                Text(
                                  'Service ${index + 1}',
                                  style: TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
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
  }
}
