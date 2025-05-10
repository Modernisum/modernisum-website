import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../routes/app_pages.dart';
import '../theme/app_theme.dart';
import 'common_background.dart';

class CommonPageLayout extends StatelessWidget {
  final Widget child;
  final bool isTransparent;
  final String title;

  const CommonPageLayout({
    super.key,
    required this.child,
    this.isTransparent = false,
    this.title = '',
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      drawer: LayoutBuilder(
        builder: (context, constraints) {
          if (constraints.maxWidth < 600) {
            return _buildDrawer(context);
          }
          return const SizedBox.shrink();
        },
      ),
      body: CommonBackground(
        isTransparent: isTransparent,
        child: Column(
          children: [
            _buildAppBar(),
            Expanded(
              child: SingleChildScrollView(
                child: child,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Image.asset('assets/images/logo1.png', width: 50),
          ShaderMask(
            shaderCallback: (bounds) => const LinearGradient(
              colors: [
                Color.fromRGBO(245, 179, 1, 1),
                Colors.brown,
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ).createShader(bounds),
            child: const Text(
              'Modernisum',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors
                    .white, // This color will be overridden by the gradient
              ),
            ),
          ),
          const Spacer(),
          LayoutBuilder(
            builder: (context, constraints) {
              if (constraints.maxWidth < 600) {
                return IconButton(
                  icon: const Icon(Icons.menu, color: Colors.white),
                  onPressed: () {
                    Scaffold.of(context).openDrawer();
                  },
                );
              }
              return Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildNavButton('Home', Routes.home),
                  _buildNavButton('Services', Routes.services),
                  _buildNavButton('Portfolio', Routes.portfolio),
                  _buildNavButton('Blog', Routes.blog),
                  _buildNavButton('About', Routes.about),
                  _buildNavButton('Contact Us', Routes.contact),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: AppTheme.primaryColor,
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: AppTheme.primaryColor.withOpacity(0.8),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset('assets/images/logo1.png', width: 100),
                const SizedBox(height: 10),
                const Text(
                  'Modernisum',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          _buildDrawerItem(Icons.home, 'Home', Routes.home, context),
          _buildDrawerItem(
              Icons.business, 'Services', Routes.services, context),
          _buildDrawerItem(Icons.work, 'Portfolio', Routes.portfolio, context),
          _buildDrawerItem(Icons.article, 'Blog', Routes.blog, context),
          _buildDrawerItem(Icons.info, 'About', Routes.about, context),
          _buildDrawerItem(
              Icons.contact_mail, 'Contact Us', Routes.contact, context),
        ],
      ),
    );
  }

  Widget _buildDrawerItem(
      IconData icon, String title, String route, BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: Colors.white),
      title: Text(
        title,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 16,
        ),
      ),
      onTap: () {
        Navigator.pop(context);
        Get.toNamed(route);
      },
    );
  }

  Widget _buildNavButton(String text, String route) {
    bool isHovered = false;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: StatefulBuilder(
        builder: (context, setState) {
          return Container(
            margin: const EdgeInsets.symmetric(horizontal: 5),
            child: TextButton(
              onPressed: () => Get.toNamed(route),
              style: TextButton.styleFrom(
                foregroundColor:
                    isHovered ? Colors.white : AppTheme.primaryColor,
                backgroundColor:
                    isHovered ? AppTheme.primaryColor : Colors.transparent,
                side: BorderSide(color: AppTheme.primaryColor),
                padding:
                    const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
              onHover: (hovered) {
                setState(() {
                  isHovered = hovered;
                });
              },
              child: Text(text),
            ),
          );
        },
      ),
    );
  }
}
