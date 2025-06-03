import 'package:flutter/material.dart';
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
    return Row(
      spacing: 50,
      children: [
        const TopLogo(text: 'Modernisum'),
        const SizedBox(
          width: 200,
        ),
        HoverAnimation(
          text: 'Services',
          options: ManuModel.serviceModel,
          onPresess: () => navigator,
        ),
        HoverAnimation(
          text: 'PortFolio',
          options: ManuModel.portfolioModel,
          onPresess: () => navigator,
        ),
      ],
    );
  }
}
