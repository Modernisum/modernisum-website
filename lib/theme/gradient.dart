import 'package:flutter/material.dart';

class ShaderMaskText1 extends StatefulWidget {
  final String text;
  final double fontSize;

  const ShaderMaskText1({Key? key, required this.text, required this.fontSize})
      : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
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
      ).createShader(bounds),
      child: SelectableText(
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

class ShaderMaskText2 extends StatefulWidget {
  final String text;

  final TextStyle? textStyle; // ✅ fixed type

  const ShaderMaskText2({
    Key? key,
    required this.text,
    required this.textStyle,
  }) : super(key: key);

  @override
  _ShaderMaskText2State createState() => _ShaderMaskText2State();
}

class _ShaderMaskText2State extends State<ShaderMaskText2> {
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
      blendMode: BlendMode.srcIn, // ✅ required for text masking
      child: SelectableText(widget.text, style: widget.textStyle),
    );
  }
}

class ShaderMaskText3 extends StatefulWidget {
  final String text;

  final TextStyle? textStyle; // ✅ fixed type

  const ShaderMaskText3({
    Key? key,
    required this.text,
    required this.textStyle,
  }) : super(key: key);

  @override
  _ShaderMaskText3State createState() => _ShaderMaskText3State();
}

class _ShaderMaskText3State extends State<ShaderMaskText2> {
  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      shaderCallback: (bounds) => const LinearGradient(
        colors: [
          Color.fromRGBO(35, 134, 204, 1),
          Color.fromARGB(255, 208, 242, 248),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(bounds),
      blendMode: BlendMode.srcIn, // ✅ required for text masking
      child: SelectableText(widget.text, style: widget.textStyle),
    );
  }
}
