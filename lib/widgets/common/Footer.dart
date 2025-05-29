import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../constants/responsive.dart';

class Footer extends StatelessWidget {
  const Footer({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: Responsive.isDesktop(context)
          ? 200.h
          : Responsive.isMobile(context)
              ? 150.h
              : 100.h,
      width: double.infinity,
      margin: EdgeInsets.only(bottom: 30.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "COPYRIGHT © 2025 MODERNISUM",
            style: Theme.of(context).textTheme.labelSmall!.copyWith(
                  color: const Color.fromRGBO(245, 179, 1, 1),
                  letterSpacing: 1.2,
                  fontWeight: FontWeight.w500,
                  fontSize: 30.h,
                ),
          ),
        ],
      ),
    );
  }
}
