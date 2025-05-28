import 'package:flutter/material.dart';

class ShaderMaskText1 extends StatefulWidget {
  final String text;
  final double fontSize;

  const ShaderMaskText1({Key? key, required this.text, required this.fontSize})
      : super(key: key);

  @override
  _ShaderMaskTextState createState() => _ShaderMaskTextState();
}

class _ShaderMaskTextState extends State<ShaderMaskText1> {
  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      shaderCallback: (bounds) => const LinearGradient(
        colors: [
          Color.fromRGBO(245, 179, 1, 1),
          Colors.brown,
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(bounds),
      child: Text(
        widget.text,
        style: TextStyle(
          fontSize: widget.fontSize,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
    );
  }
}

/// Provides a utility method for creating a gradient box decoration.
class GradientLinear1 {
  static BoxDecoration gradientBoxDecoration({
    required List<Color> colors,
    double? borderRadius,
  }) {
    return BoxDecoration(
      gradient: const LinearGradient(colors: [
        Color.fromRGBO(245, 179, 1, 1),
        Colors.brown,
      ]),
      borderRadius: BorderRadius.circular(borderRadius ?? 10),
      boxShadow: const [
        BoxShadow(
          color: Colors.yellow,
          offset: Offset(0, -1),
          blurRadius: 5,
        ),
        BoxShadow(
          color: Colors.brown,
          offset: Offset(0, 1),
          blurRadius: 5,
        ),
      ],
    );
  }
}
