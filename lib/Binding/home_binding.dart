import 'package:get/get.dart';

import '../modules/home/home_controller.dart';

class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.put<HomeController>(
      HomeController(),
      permanent: true, // Keep controller alive
    );
  }
}
