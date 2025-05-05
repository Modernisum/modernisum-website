import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../routes/app_pages.dart';
import '../theme/app_theme.dart';

class CommonAppBar extends StatelessWidget implements PreferredSizeWidget {
  final bool isTransparent;

  const CommonAppBar({
    super.key,
    this.isTransparent = false,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      backgroundColor: Colors.transparent,
      elevation: 0,
      title: Image.asset('assets/images/logo1.png', width: 70),
      actions: [
        LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth < 600) {
              return IconButton(
                icon: const Icon(Icons.menu, color: Colors.white),
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (context) => _buildMobileMenu(context),
                  );
                },
              );
            }
            return Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildNavButton('Home', Routes.home),
                  _buildNavButton('Services', Routes.services),
                  _buildNavButton('Portfolio', Routes.portfolio),
                  _buildNavButton('Blog', Routes.blog),
                  _buildNavButton('About', Routes.about),
                  _buildNavButton('Contact Us', Routes.contact),
                ],
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildNavButton(String text, String route) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: StatefulBuilder(
        builder: (context, setState) {
          return Container(
            margin: const EdgeInsets.symmetric(horizontal: 5),
            child: TextButton(
              onPressed: () => Get.toNamed(route),
              style: TextButton.styleFrom(
                foregroundColor: AppTheme.primaryColor,
                backgroundColor: Colors.transparent,
                side: BorderSide(color: AppTheme.primaryColor),
                padding:
                    const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5),
                ),
              ),
              onHover: (isHovered) {
                setState(() {});
              },
              child: Text(text),
            ),
          );
        },
      ),
    );
  }

  Widget _buildMobileMenu(BuildContext context) {
    return AlertDialog(
      backgroundColor: AppTheme.primaryColor,
      title: const Text('Menu', style: TextStyle(color: Colors.white)),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListTile(
            title: const Text('Home', style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              Get.toNamed(Routes.home);
            },
          ),
          ListTile(
            title:
                const Text('Services', style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              Get.toNamed(Routes.services);
            },
          ),
          ListTile(
            title:
                const Text('Portfolio', style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              Get.toNamed(Routes.portfolio);
            },
          ),
          ListTile(
            title: const Text('Blog', style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              Get.toNamed(Routes.blog);
            },
          ),
          ListTile(
            title: const Text('About', style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              Get.toNamed(Routes.about);
            },
          ),
          ListTile(
            title:
                const Text('Contact Us', style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pop(context);
              Get.toNamed(Routes.contact);
            },
          ),
        ],
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
