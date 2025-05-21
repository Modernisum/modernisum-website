import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../routes/app_pages.dart';
import '../theme/app_theme.dart';

class CommonAppBar extends StatelessWidget implements PreferredSizeWidget {
  final bool isTransparent;
  double get _mobileBreakpoint => 600.w;

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
                errorBuilder: (context, error, stackTrace) {
                  return Icon(
                    Icons.business,
                    size: 70.w,
                    color: Colors.white,
                  );
                },
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
      onPressed: () {
        Scaffold.of(context).openDrawer();
      },
    );
  }

  Widget _buildDrawerItem(
    BuildContext context,
    IconData icon,
    String title,
    String route,
  ) {
    return Container(
      margin: EdgeInsets.only(bottom: 10.h),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(10.r),
      ),
      child: ListTile(
        leading: Icon(
          icon,
          color: Colors.white,
          size: 24.sp,
        ),
        title: Text(
          title,
          style: TextStyle(
            color: Colors.white,
            fontSize: 16.sp,
            fontWeight: FontWeight.w500,
          ),
        ),
        trailing: Icon(
          Icons.arrow_forward_ios,
          color: Colors.white.withOpacity(0.5),
          size: 16.sp,
        ),
        onTap: () {
          Navigator.pop(context);
          Get.toNamed(route);
        },
      ),
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
                foregroundColor:
                    isHovered ? Colors.white : AppTheme.primaryColor,
                backgroundColor:
                    isHovered ? AppTheme.primaryColor : Colors.transparent,
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

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight.h);
}
