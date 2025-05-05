import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'portfolio_controller.dart';
import '../../widgets/common_page_layout.dart';

class PortfolioView extends GetView<PortfolioController> {
  const PortfolioView({super.key});

  @override
  Widget build(BuildContext context) {
    return CommonPageLayout(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Our Portfolio',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 20),
            Wrap(
              spacing: 20,
              runSpacing: 20,
              children: [
                _buildPortfolioCard(
                  'Project 1',
                  'Web Application',
                  'assets/images/project1.jpg',
                ),
                _buildPortfolioCard(
                  'Project 2',
                  'Mobile App',
                  'assets/images/project2.jpg',
                ),
                _buildPortfolioCard(
                  'Project 3',
                  'UI Design',
                  'assets/images/project3.jpg',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPortfolioCard(String title, String category, String imagePath) {
    return Container(
      width: 300,
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 200,
            decoration: BoxDecoration(
              color: const Color(0xFF3b3f43),
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(10)),
            ),
            child: Center(
              child: Icon(
                Icons.image,
                size: 50,
                color: Colors.white,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFFf5b301),
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  category,
                  style: const TextStyle(
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
