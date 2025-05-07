import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'home_controller.dart';
import '../../widgets/common_page_layout.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});

  ShaderMask _buildGradientText(String text, double fontSize) {
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
          fontSize: fontSize,
          fontWeight: FontWeight.bold,
          color: Colors.white, // The actual color is created by the gradient
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
              margin: const EdgeInsets.only(top: 150),
              padding: const EdgeInsets.symmetric(horizontal: 50),
              alignment: Alignment.topCenter,
              child: Column(
                children: [
                  AnimatedTextKit(
                    animatedTexts: [
                      FadeAnimatedText(
                        'Let\'s Start',
                        textStyle: TextStyle(
                            fontSize: 64.0,
                            fontWeight: FontWeight.bold,
                            foreground: Paint()
                              ..shader = const LinearGradient(
                                colors: [
                                  Color.fromRGBO(245, 179, 1, 1),
                                  Colors.brown,
                                ],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ).createShader(
                                  const Rect.fromLTWH(0.0, 0.0, 200.0, 70.0))),
                        duration: const Duration(seconds: 2),
                        fadeInEnd: 0.3,
                        fadeOutBegin: 0.7,
                      ),
                      FadeAnimatedText(
                        'Modernize your business',
                        textStyle: TextStyle(
                            fontSize: 54.0,
                            fontWeight: FontWeight.bold,
                            foreground: Paint()
                              ..shader = const LinearGradient(
                                colors: [
                                  Color.fromRGBO(245, 179, 1, 1),
                                  Colors.brown,
                                ],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ).createShader(
                                  const Rect.fromLTWH(0.0, 0.0, 200.0, 70.0))),
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
                        controller.setAnimationComplete(true);
                        controller.scrollToServices();
                      }
                    },
                  ),
                  const SizedBox(height: 30),
                  Obx(() => AnimatedOpacity(
                        opacity:
                            controller.isAnimationComplete.value ? 1.0 : 0.0,
                        duration: const Duration(milliseconds: 800),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 20, vertical: 15),
                          child: Container(
                              height: 400,
                              width: 600,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(20),
                                  gradient: LinearGradient(colors: [
                                    Color.fromRGBO(245, 179, 1, 1),
                                    Colors.brown,
                                  ]),
                                  boxShadow: const [
                                    BoxShadow(
                                        color: Colors.blue,
                                        offset: Offset(0, -1),
                                        blurRadius: 20 / 4),
                                    BoxShadow(
                                        color: Colors.brown,
                                        offset: Offset(0, 1),
                                        blurRadius: 20 / 4),
                                  ]),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    'Modernisum delivers intelligent software and robust IoT infrastructure to help businesses automate, connect, and grow—explore how we turn bold ideas into reliable, scalable digital systems.',
                                    style: Theme.of(context)
                                        .textTheme
                                        .labelSmall!
                                        .copyWith(
                                            color: Colors.white,
                                            letterSpacing: 1.2,
                                            fontWeight: FontWeight.bold),
                                  ),
                                ],
                              )),
                        ),
                      )),
                ],
              ),
            ),
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height,
              padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 30),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildGradientText('Our Services', 42),
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
                                const Icon(Icons.business, size: 48),
                                const SizedBox(height: 15),
                                Text(
                                  'Service ${index + 1}',
                                  style: const TextStyle(
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
