import 'package:flutter/material.dart';

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
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/bg1.jpg'),
          fit: BoxFit.cover,
        ),
      ),
      child: child,
    );
  }
}
