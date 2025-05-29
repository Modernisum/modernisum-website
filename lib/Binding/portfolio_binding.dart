import 'package:get/get.dart';

import '../modules/portfolio/portfolio_controller.dart';

class PortfolioBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PortfolioController>(
      () => PortfolioController(),
    );
  }
}
