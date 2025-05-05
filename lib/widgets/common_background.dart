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
      decoration: BoxDecoration(
        image: DecorationImage(
          image: const AssetImage('assets/images/Margo.jpg'),
          fit: BoxFit.cover,
        ),
      ),
      child: child,
    );
  }
}
