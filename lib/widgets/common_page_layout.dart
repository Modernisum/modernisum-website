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
    return LayoutBuilder(
      builder: (context, constraints) {
        // Calculate dynamic padding and font size based on width
        double horizontalPadding = constraints.maxWidth < 800 ? 10 : 20;
        double verticalPadding = constraints.maxWidth < 800 ? 5 : 10;
        double logoWidth = constraints.maxWidth < 800 ? 50 : 70;

        return Container(
          padding: EdgeInsets.symmetric(
              horizontal: horizontalPadding, vertical: verticalPadding),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Image.asset('assets/images/logo1.png', width: logoWidth),
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
                      _buildResponsiveNavButtons(constraints.maxWidth),
                    ],
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildResponsiveNavButtons(double width) {
    // Calculate button properties based on available width
    double fontSize = width < 800 ? 12 : 14;
    double horizontalPadding = width < 800 ? 8 : 15;
    double verticalPadding = width < 800 ? 4 : 8;
    double buttonSpacing = width < 800 ? 2 : 5;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _buildNavButton(
          'Home',
          Routes.home,
          fontSize: fontSize,
          horizontalPadding: horizontalPadding,
          verticalPadding: verticalPadding,
          spacing: buttonSpacing,
        ),
        _buildNavButton(
          'Services',
          Routes.services,
          fontSize: fontSize,
          horizontalPadding: horizontalPadding,
          verticalPadding: verticalPadding,
          spacing: buttonSpacing,
        ),
        _buildNavButton(
          'Portfolio',
          Routes.portfolio,
          fontSize: fontSize,
          horizontalPadding: horizontalPadding,
          verticalPadding: verticalPadding,
          spacing: buttonSpacing,
        ),
        _buildNavButton(
          'Blog',
          Routes.blog,
          fontSize: fontSize,
          horizontalPadding: horizontalPadding,
          verticalPadding: verticalPadding,
          spacing: buttonSpacing,
        ),
        _buildNavButton(
          'About',
          Routes.about,
          fontSize: fontSize,
          horizontalPadding: horizontalPadding,
          verticalPadding: verticalPadding,
          spacing: buttonSpacing,
        ),
        _buildNavButton(
          'Contact Us',
          Routes.contact,
          fontSize: fontSize,
          horizontalPadding: horizontalPadding,
          verticalPadding: verticalPadding,
          spacing: buttonSpacing,
        ),
      ],
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

  Widget _buildNavButton(
    String text,
    String route, {
    double fontSize = 14,
    double horizontalPadding = 15,
    double verticalPadding = 8,
    double spacing = 5,
  }) {
    bool isHovered = false;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: StatefulBuilder(
        builder: (context, setState) {
          return Container(
            margin: EdgeInsets.symmetric(horizontal: spacing),
            child: TextButton(
              onPressed: () => Get.toNamed(route),
              style: TextButton.styleFrom(
                foregroundColor:
                    isHovered ? Colors.white : AppTheme.primaryColor,
                backgroundColor:
                    isHovered ? AppTheme.primaryColor : Colors.transparent,
                side: BorderSide(color: AppTheme.primaryColor),
                padding: EdgeInsets.symmetric(
                    horizontal: horizontalPadding, vertical: verticalPadding),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
              onHover: (hovered) {
                setState(() {
                  isHovered = hovered;
                });
              },
              child: Text(
                text,
                style: TextStyle(fontSize: fontSize),
              ),
            ),
          );
        },
      ),
    );
  }
}
