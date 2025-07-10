import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/route_manager.dart';
import 'package:modernisum/widgets/common/Hower_animation.dart';
import 'package:modernisum/widgets/common/top_logo.dart';
import 'package:modernisum/models/manu_model.dart';

class ManuBar extends StatelessWidget {
  const ManuBar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.only(top: 60.h),
        height: 100.h,
        width: 600.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.r),
          gradient: const LinearGradient(colors: [
            Color.fromRGBO(251, 252, 204, 0.8),
            Color.fromRGBO(240, 248, 203, 0.8),
          ]),
          boxShadow: [
            BoxShadow(
                color: Colors.blue, offset: Offset(0, -1.h), blurRadius: 5.r),
            BoxShadow(
                color: Colors.brown, offset: Offset(0, 1.h), blurRadius: 5.r),
          ],
        ),
        child: Row(
          spacing: 50.h,
          children: [
            const TopLogo(),
            HoverAnimation(
              text: 'Services',
              options: ManuModel.serviceModel,
              onPress: () => navigator,
            ),
            HoverAnimation(
              text: 'PortFolio',
              options: ManuModel.portfolioModel,
              onPress: () => navigator,
            ),
          ],
        ));
  }
}
