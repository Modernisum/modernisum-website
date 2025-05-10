import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'home_controller.dart';
import '../../widgets/common_page_layout.dart';
import 'package:lottie/lottie.dart';

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
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 15),
                    child: Container(
                      height: 200,
                      width: 1000,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          gradient: const LinearGradient(colors: [
                            Color.fromRGBO(245, 179, 1, 1),
                            Colors.brown,
                          ]),
                          boxShadow: const [
                            BoxShadow(
                                color: Colors.blue,
                                offset: Offset(0, -1),
                                blurRadius: 5),
                            BoxShadow(
                                color: Colors.brown,
                                offset: Offset(0, 1),
                                blurRadius: 5),
                          ]),
                      child: Row(
                        children: [
                          Center(
                            child: Padding(
                              padding: const EdgeInsets.all(20),
                              child: Text(
                                'Modernisum transforms traditional operations with advanced technology,offering '
                                '\nsoftware and hardware solutions that reduce complexity, automate processes,'
                                '\n and help you scale your organization efficiently and intelligently.',
                                textAlign: TextAlign.center,
                                style: Theme.of(context)
                                    .textTheme
                                    .labelSmall!
                                    .copyWith(
                                        color: Colors.white,
                                        letterSpacing: 1.2,
                                        fontWeight: FontWeight.w500,
                                        fontSize: 15),
                              ),
                            ),
                          ),
                          Expanded(
                            child: Lottie.asset(
                              '/animation/animation1.json',
                              width: 800,
                              height: 800,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 130),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 15),
                    child: Container(
                      height: 200,
                      width: 1000,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          gradient: const LinearGradient(colors: [
                            Color.fromRGBO(245, 179, 1, 1),
                            Colors.brown,
                          ]),
                          boxShadow: const [
                            BoxShadow(
                                color: Colors.blue,
                                offset: Offset(0, -1),
                                blurRadius: 5),
                            BoxShadow(
                                color: Colors.brown,
                                offset: Offset(0, 1),
                                blurRadius: 5),
                          ]),
                      child: Row(
                        children: [
                          Expanded(
                            child: Lottie.asset(
                              '/animation/animation10.json',
                              width: 1000,
                              height: 1000,
                              fit: BoxFit.cover,
                            ),
                          ),
                          Center(
                            child: Padding(
                              padding: const EdgeInsets.all(20),
                              child: Text(
                                'Modernisum uses advanced IoT and embedded systems to automate business  '
                                ' \noperations, reduce human errors, save valuable time,boost efficiency, increase '
                                ' \naccuracy, and drive smarter, scalable growth solutions',
                                textAlign: TextAlign.center,
                                style: Theme.of(context)
                                    .textTheme
                                    .labelSmall!
                                    .copyWith(
                                        color: Colors.white,
                                        letterSpacing: 1.2,
                                        fontWeight: FontWeight.w500,
                                        fontSize: 15),
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
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height,
              padding:
                  const EdgeInsets.symmetric(horizontal: 170, vertical: 50),
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
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(20),
                                gradient: const LinearGradient(colors: [
                                  Color.fromRGBO(245, 179, 1, 1),
                                  Colors.brown,
                                ]),
                                boxShadow: const [
                                  BoxShadow(
                                      color: Colors.blue,
                                      offset: Offset(0, -1),
                                      blurRadius: 5),
                                  BoxShadow(
                                      color: Colors.brown,
                                      offset: Offset(0, 1),
                                      blurRadius: 5),
                                ]),
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
