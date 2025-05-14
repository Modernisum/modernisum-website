import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
      drawer: _buildDrawer(context),
      body: CommonBackground(
        isTransparent: isTransparent,
        child: Column(
          children: [
            Builder(
              builder: (context) => _buildAppBar(context),
            ),
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

  Widget _buildAppBar(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 1100.w;
    
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.h),
      decoration: BoxDecoration(
        color: isTransparent ? Colors.transparent : AppTheme.primaryColor.withOpacity(0.9),
        boxShadow: isTransparent ? null : [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 5.r,
            offset: Offset(0, 2.h),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              if (isMobile)
                Padding(
                  padding: EdgeInsets.only(right: 10.w),
                  child: IconButton(
                    icon: Icon(Icons.menu, color: Colors.white, size: 24.sp),
                    onPressed: () {
                      Scaffold.of(context).openDrawer();
                    },
                  ),
                ),
              Image.asset('assets/images/logo1.png', width: 50.w),
              SizedBox(width: 10.w),
              ShaderMask(
                shaderCallback: (bounds) => const LinearGradient(
                  colors: [
                    Color.fromRGBO(245, 179, 1, 1),
                    Colors.brown,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ).createShader(bounds),
                child: Text(
                  'Modernisum',
                  style: TextStyle(
                    fontSize: 24.sp,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
          if (!isMobile)
            _buildDesktopMenu(),
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
                Image.asset('assets/images/logo1.png', width: 100.w),
                SizedBox(height: 10.h),
                Text(
                  'Modernisum',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          _buildDrawerItem(Icons.home, 'Home', Routes.home, context),
          _buildDrawerItem(Icons.business, 'Services', Routes.services, context),
          _buildDrawerItem(Icons.work, 'Portfolio', Routes.portfolio, context),
          _buildDrawerItem(Icons.article, 'Blog', Routes.blog, context),
          _buildDrawerItem(Icons.info, 'About', Routes.about, context),
          _buildDrawerItem(Icons.contact_mail, 'Contact Us', Routes.contact, context),
        ],
      ),
    );
  }

  Widget _buildDrawerItem(IconData icon, String title, String route, BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: Colors.white, size: 24.sp),
      title: Text(
        title,
        style: TextStyle(
          color: Colors.white,
          fontSize: 16.sp,
        ),
      ),
      onTap: () {
        Navigator.pop(context);
        Get.toNamed(route);
      },
    );
  }

  Widget _buildDesktopMenu() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _buildNavButton('Home', Routes.home),
        _buildNavButton('Services', Routes.services),
        _buildNavButton('Portfolio', Routes.portfolio),
        _buildNavButton('Blog', Routes.blog),
        _buildNavButton('About', Routes.about),
        _buildNavButton('Contact Us', Routes.contact),
      ],
    );
  }

  Widget _buildNavButton(String text, String route) {
    bool isHovered = false;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: StatefulBuilder(
        builder: (context, setState) {
          return Container(
            margin: EdgeInsets.symmetric(horizontal: 2.w),
            child: TextButton(
              onPressed: () => Get.toNamed(route),
              style: TextButton.styleFrom(
                foregroundColor: isHovered ? Colors.white : AppTheme.primaryColor,
                backgroundColor: isHovered ? AppTheme.primaryColor : Colors.transparent,
                side: BorderSide(color: AppTheme.primaryColor),
                padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 8.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.r),
                ),
              ),
              onHover: (hovered) {
                setState(() {
                  isHovered = hovered;
                });
              },
              child: Text(
                text,
                style: TextStyle(fontSize: 14.sp),
              ),
            ),
          );
        },
      ),
    );
  }
}
