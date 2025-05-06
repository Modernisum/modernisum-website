import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../routes/app_pages.dart';
import '../theme/app_theme.dart';

class CommonAppBar extends StatelessWidget implements PreferredSizeWidget {
  final bool isTransparent;
  final double _mobileBreakpoint = 600;

  const CommonAppBar({
    super.key,
    this.isTransparent = false,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      backgroundColor: isTransparent
          ? Colors.transparent
          : AppTheme.primaryColor.withOpacity(0.9),
      elevation: isTransparent ? 0 : 4,
      flexibleSpace: Container(
        decoration: BoxDecoration(
          gradient: isTransparent
              ? null
              : LinearGradient(
                  colors: [
                    AppTheme.primaryColor,
                    AppTheme.primaryColor.withOpacity(0.8),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
        ),
      ),
      title: Row(
        children: [
          MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              onTap: () => Get.toNamed(Routes.home),
              child: Image.asset(
                'assets/images/logo1.png',
                width: 70.w,
                fit: BoxFit.contain,
              ),
            ),
          ),
        ],
      ),
      actions: [
        LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth < _mobileBreakpoint) {
              return _buildMobileMenuButton(context);
            }
            return _buildDesktopMenu();
          },
        ),
      ],
    );
  }

  Widget _buildMobileMenuButton(BuildContext context) {
    return IconButton(
      icon: Icon(
        Icons.menu,
        color: Colors.white,
        size: 24.sp,
      ),
      onPressed: () => _showMobileMenu(context),
    );
  }

  void _showMobileMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: AppTheme.primaryColor,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(height: 10.h),
              Container(
                width: 40.w,
                height: 4.h,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(2.r),
                ),
              ),
              SizedBox(height: 20.h),
              ..._buildMobileMenuItems(context),
              SizedBox(height: 20.h),
            ],
          ),
        ),
      ),
    );
  }

  List<Widget> _buildMobileMenuItems(BuildContext context) {
    final menuItems = [
      {'title': 'Home', 'route': Routes.home},
      {'title': 'Services', 'route': Routes.services},
      {'title': 'Portfolio', 'route': Routes.portfolio},
      {'title': 'Blog', 'route': Routes.blog},
      {'title': 'About', 'route': Routes.about},
      {'title': 'Contact Us', 'route': Routes.contact},
    ];

    return menuItems
        .map((item) => _buildMobileMenuItem(
              context,
              item['title']!,
              item['route']!,
            ))
        .toList();
  }

  Widget _buildMobileMenuItem(
      BuildContext context, String title, String route) {
    return ListTile(
      title: Text(
        title,
        style: TextStyle(
          color: Colors.white,
          fontSize: 16.sp,
          fontWeight: FontWeight.w500,
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
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 5.w),
        child: TextButton(
          onPressed: () => Get.toNamed(route),
          style: TextButton.styleFrom(
            foregroundColor: Get.currentRoute == route
                ? Colors.white
                : AppTheme.primaryColor,
            backgroundColor: Get.currentRoute == route
                ? AppTheme.primaryColor
                : Colors.transparent,
            side: BorderSide(color: AppTheme.primaryColor),
            padding: EdgeInsets.symmetric(
              horizontal: 15.w,
              vertical: 8.h,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(5.r),
            ),
          ),
          child: Text(
            text,
            style: TextStyle(fontSize: 14.sp),
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight.h);
}
