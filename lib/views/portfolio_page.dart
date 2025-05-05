import 'package:flutter/material.dart';
import '../widgets/common_page_layout.dart';
import '../widgets/responsive_layout.dart';

class PortfolioPage extends StatelessWidget {
  const PortfolioPage({super.key});

  @override
  Widget build(BuildContext context) {
    return CommonPageLayout(
      child: Center(
        child: ResponsiveLayout(
          mobile: _buildMobileLayout(),
          tablet: _buildTabletLayout(),
          desktop: _buildDesktopLayout(),
        ),
      ),
    );
  }

  Widget _buildMobileLayout() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Our Portfolio',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 20),
          Wrap(
            spacing: 15,
            runSpacing: 15,
            children: [
              _buildPortfolioCard(
                'Project 1',
                'Web Application',
                'assets/project1.jpg',
              ),
              _buildPortfolioCard(
                'Project 2',
                'Mobile App',
                'assets/project2.jpg',
              ),
              _buildPortfolioCard(
                'Project 3',
                'UI Design',
                'assets/project3.jpg',
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTabletLayout() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(30),
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
          const SizedBox(height: 30),
          Wrap(
            spacing: 20,
            runSpacing: 20,
            children: [
              _buildPortfolioCard(
                'Project 1',
                'Web Application',
                'assets/project1.jpg',
              ),
              _buildPortfolioCard(
                'Project 2',
                'Mobile App',
                'assets/project2.jpg',
              ),
              _buildPortfolioCard(
                'Project 3',
                'UI Design',
                'assets/project3.jpg',
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopLayout() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(40),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Our Portfolio',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 40),
          Wrap(
            spacing: 30,
            runSpacing: 30,
            children: [
              _buildPortfolioCard(
                'Project 1',
                'Web Application',
                'assets/project1.jpg',
              ),
              _buildPortfolioCard(
                'Project 2',
                'Mobile App',
                'assets/project2.jpg',
              ),
              _buildPortfolioCard(
                'Project 3',
                'UI Design',
                'assets/project3.jpg',
              ),
            ],
          ),
        ],
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
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.asset(
              height: 200,
              width: double.infinity,
              imagePath,
              fit: BoxFit.cover,
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
      ),
    );
  }
}
