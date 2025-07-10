import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'package:modernisum/widgets/constants/responsive.dart';
import '../constants/assets.dart';

class TopLogo extends StatelessWidget {
  const TopLogo({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      ImagePaths.logo,
      height: Responsive.isDesktop(context) ? 50.h : 200.h,
      width: Responsive.isDesktop(context) ? 50.w : 200.w,
    );
  }
}
