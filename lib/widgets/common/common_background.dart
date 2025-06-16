import 'package:flutter/material.dart';
import 'package:modernisum/widgets/constants/assets.dart';

class CommonBackground extends StatelessWidget {
  final Widget child;
  final bool isTransparent;
  const CommonBackground({
    super.key,
    required this.child,
    this.isTransparent = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage(ImagePaths.bg1img),
          fit: BoxFit.cover,
        ),
      ),
      child: child,
    );
  }
}
