import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Service {
  final String title;
  final String description;
  final IconData icon;

  Service({
    required this.title,
    required this.description,
    required this.icon,
  });
}

class ServicesController extends GetxController {
  final services = <Service>[].obs;

  @override
  void onInit() {
    super.onInit();
    loadServices();
  }

  void loadServices() {
    services.value = [
      Service(
        title: 'Web Development',
        description: 'Custom web applications and websites',
        icon: Icons.web,
      ),
      Service(
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile apps',
        icon: Icons.phone_android,
      ),
      Service(
        title: 'UI/UX Design',
        description: 'Beautiful and intuitive user interfaces',
        icon: Icons.design_services,
      ),
    ];
  }
}
