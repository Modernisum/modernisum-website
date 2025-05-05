import 'package:get/get.dart';
import 'services_controller.dart';

class ServicesBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ServicesController>(
      () => ServicesController(),
    );
  }
}
