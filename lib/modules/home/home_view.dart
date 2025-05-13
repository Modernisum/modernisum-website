import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'home_controller.dart';
import '../../widgets/common_page_layout.dart';
import 'package:lottie/lottie.dart';

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
                              width: 100,
                              height: 100,
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
            const SizedBox(
              height: 20,
            ),
            ShaderMask(
              shaderCallback: (bounds) => const LinearGradient(
                colors: [
                  Color.fromRGBO(245, 179, 1, 1),
                  Colors.brown,
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ).createShader(bounds),
              child: Text(
                "OUR SERVICES",
                style: Theme.of(context).textTheme.titleLarge!.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 50,
                    ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 130),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                  child: Container(
                    height: 300,
                    width: 300,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(251, 252, 204, 1),
                          Color(0xFFF0F8CB),
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
                    child: Stack(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: double.infinity,
                          child: const Image(
                            image: AssetImage("/images/img6.png"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          bottom: 11,
                          left: 0,
                          right: 0,
                          child: Opacity(
                            opacity: 0.3,
                            child: Container(
                              height: 30,
                              width: 300,
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
                                "Mobile Application",
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge!
                                    .copyWith(
                                      color: Colors.yellow,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 130),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                  child: Container(
                    height: 300,
                    width: 300,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(251, 252, 204, 1),
                          Color(0xFFF0F8CB),
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
                    child: Stack(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: double.infinity,
                          child: const Image(
                            image: AssetImage("/images/img7.png"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          bottom: 11,
                          left: 0,
                          right: 0,
                          child: Opacity(
                            opacity: 0.3,
                            child: Container(
                              height: 30,
                              width: 300,
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
                                "Web Application",
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge!
                                    .copyWith(
                                      color: Colors.yellow,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 130),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                  child: Container(
                    height: 300,
                    width: 300,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(251, 252, 204, 1),
                          Color(0xFFF0F8CB),
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
                    child: Stack(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: double.infinity,
                          child: const Image(
                            image: AssetImage("/images/img8.png"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          bottom: 11,
                          left: 0,
                          right: 0,
                          child: Opacity(
                            opacity: 0.3,
                            child: Container(
                              height: 30,
                              width: 300,
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
                                "Automation",
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge!
                                    .copyWith(
                                      color: Colors.yellow,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
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
            const SizedBox(
              height: 20,
            ),
            ShaderMask(
              shaderCallback: (bounds) => const LinearGradient(
                colors: [
                  Color.fromRGBO(245, 179, 1, 1),
                  Colors.brown,
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ).createShader(bounds),
              child: Text(
                "PORTFOLIO",
                style: Theme.of(context).textTheme.titleLarge!.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 50,
                    ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 130),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                  child: Container(
                    height: 300,
                    width: 300,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(251, 252, 204, 1),
                          Color(0xFFF0F8CB),
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
                    child: Stack(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: double.infinity,
                          child: const Image(
                            image: AssetImage("/images/img6.png"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          bottom: 11,
                          left: 0,
                          right: 0,
                          child: Opacity(
                            opacity: 0.3,
                            child: Container(
                              height: 30,
                              width: 300,
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
                                "Modern School",
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge!
                                    .copyWith(
                                      color: Colors.yellow,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 130),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                  child: Container(
                    height: 300,
                    width: 300,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(251, 252, 204, 1),
                          Color(0xFFF0F8CB),
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
                    child: Stack(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: double.infinity,
                          child: const Image(
                            image: AssetImage("/images/img7.png"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          bottom: 11,
                          left: 0,
                          right: 0,
                          child: Opacity(
                            opacity: 0.3,
                            child: Container(
                              height: 30,
                              width: 300,
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
                                "Modern CV",
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge!
                                    .copyWith(
                                      color: Colors.yellow,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 130),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                  child: Container(
                    height: 300,
                    width: 300,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: const LinearGradient(colors: [
                          Color.fromRGBO(251, 252, 204, 1),
                          Color(0xFFF0F8CB),
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
                    child: Stack(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: double.infinity,
                          child: const Image(
                            image: AssetImage("/images/img8.png"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          bottom: 11,
                          left: 0,
                          right: 0,
                          child: Opacity(
                            opacity: 0.3,
                            child: Container(
                              height: 30,
                              width: 300,
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
                                "Modern Page",
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge!
                                    .copyWith(
                                      color: Colors.yellow,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
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
            Container(
              height: 200,
              width: double.infinity,
              margin: const EdgeInsets.only(bottom: 30),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("COPYRIGHT © 2025 MODERNISUM",
                      style: Theme.of(context).textTheme.labelSmall!.copyWith(
                          color: Color.fromRGBO(245, 179, 1, 1),
                          letterSpacing: 1.2,
                          fontWeight: FontWeight.w500,
                          fontSize: 15)),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
