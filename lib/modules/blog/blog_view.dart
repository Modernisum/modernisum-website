import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'blog_controller.dart';
import '../../widgets/common_page_layout.dart';

class BlogView extends GetView<BlogController> {
  const BlogView({super.key});

  @override
  Widget build(BuildContext context) {
    return CommonPageLayout(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Our Blog',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 20),
            Obx(
              () => Wrap(
                spacing: 20,
                runSpacing: 20,
                children: controller.blogs
                    .map((blog) => _buildBlogCard(blog))
                    .toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBlogCard(Blog blog) {
    return Container(
      width: 300,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.article,
            size: 50,
            color: Colors.blue,
          ),
          const SizedBox(height: 20),
          Text(
            blog.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 10),
          Text(
            blog.description,
            style: const TextStyle(
              fontSize: 16,
              color: Colors.grey,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
