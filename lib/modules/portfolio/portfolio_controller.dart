import 'package:get/get.dart';

class Project {
  final String title;
  final String description;
  final String imageUrl;
  final String category;

  Project({
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.category,
  });
}

class PortfolioController extends GetxController {
  final projects = <Project>[].obs;

  @override
  void onInit() {
    super.onInit();
    loadProjects();
  }

  void loadProjects() {
    projects.value = [
      Project(
        title: 'E-commerce Website',
        description: 'A modern e-commerce platform built with Flutter',
        imageUrl: 'assets/images/ecommerce.jpg',
        category: 'Web Development',
      ),
      Project(
        title: 'Social Media App',
        description: 'Cross-platform social media application',
        imageUrl: 'assets/images/social.jpg',
        category: 'Mobile Development',
      ),
      Project(
        title: 'Dashboard Design',
        description: 'Admin dashboard with modern UI/UX',
        imageUrl: 'assets/images/dashboard.jpg',
        category: 'UI/UX Design',
      ),
    ];
  }
}
