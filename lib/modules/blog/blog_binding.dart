import 'package:get/get.dart';
import 'blog_controller.dart';

class BlogBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<BlogController>(
      () => BlogController(),
    );
  }
}
