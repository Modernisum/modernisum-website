import 'package:get/get.dart';

class ContactController extends GetxController {
  final nameController = ''.obs;
  final emailController = ''.obs;
  final messageController = ''.obs;
  final isSubmitting = false.obs;

  void submitForm() {
    if (nameController.value.isEmpty ||
        emailController.value.isEmpty ||
        messageController.value.isEmpty) {
      Get.snackbar(
        'Error',
        'Please fill all fields',
        snackPosition: SnackPosition.BOTTOM,
      );
      return;
    }

    isSubmitting.value = true;

    // Simulate API call
    Future.delayed(const Duration(seconds: 2), () {
      isSubmitting.value = false;
      Get.snackbar(
        'Success',
        'Message sent successfully',
        snackPosition: SnackPosition.BOTTOM,
      );

      // Clear form
      nameController.value = '';
      emailController.value = '';
      messageController.value = '';
    });
  }
}
