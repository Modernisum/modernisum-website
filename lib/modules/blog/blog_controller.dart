
import 'package:get/get.dart';

class Blog {
  final String title;
  final String description;

  Blog({
    required this.title,
    required this.description,
  });
}

class BlogController extends GetxController {
  final blogs = <Blog>[].obs;

  @override
  void onInit() {
    super.onInit();
    loadBlogs();
  }

  void loadBlogs() {
    blogs.value = [
      Blog(
        title: 'Latest Technology Trends',
        description: 'Explore the latest trends in technology and innovation',
      ),
      Blog(
        title: 'Web Development Tips',
        description: 'Best practices for modern web development',
      ),
      Blog(
        title: 'UI/UX Design Principles',
        description: 'Essential principles for creating great user experiences',
      ),
    ];
  }
}
