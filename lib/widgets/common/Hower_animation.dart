import 'dart:async';

import 'package:flutter/material.dart';

class HoverAnimation extends StatefulWidget {
  final String text;
  final List<String> options;
  final void Function() onPresess;

  const HoverAnimation({
    super.key,
    required this.text,
    required this.options,
    required this.onPresess,
  });

  @override
  State<HoverAnimation> createState() => _HoverAnimationState();
}

class _HoverAnimationState extends State<HoverAnimation> {
  final GlobalKey _hoverKey = GlobalKey();
  bool onOption = true;
  OverlayEntry? _overlayEntry;

  void _showOverlay() {
    final RenderBox renderBox =
        _hoverKey.currentContext!.findRenderObject() as RenderBox;
    final Offset offset = renderBox.localToGlobal(Offset.zero);
    final Size size = renderBox.size;

    _overlayEntry = OverlayEntry(
      builder: (context) => Positioned(
        // set position  dropdown box
        top: offset.dy + size.height + 10,
        left: offset.dx - 30,
        width: size.width * 1.8,
        child: MouseRegion(
          onExit: (event) {
            Timer(const Duration(microseconds: 600), () => _removeOverlay());
          },
          child: Material(
            elevation: 4,
            borderRadius: BorderRadius.circular(8),
            child: Container(
              width: size.width * 5,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 10,
                  )
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: widget.options
                    .map((option) => InkWell(
                          onTap: () {
                            _removeOverlay();
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('You selected: $option')),
                            );
                          },
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8.0),
                            child: Text(option),
                          ),
                        ))
                    .toList(),
              ),
            ),
          ),
        ),
      ),
    );

    Overlay.of(context).insert(_overlayEntry!);
  }

  void _removeOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
        key: _hoverKey,
        onEnter: (_) {
          if (_overlayEntry == null) _showOverlay();
        },
        child: Row(
          children: [
            TextButton(
              style: ButtonStyle(
                backgroundColor: WidgetStateProperty.resolveWith<Color?>(
                  (Set<WidgetState> states) {
                    const Color hoverColor =
                        Color(0x332196F3); // Colors.blue.withOpacity(0.2)
                    const Color pressColor =
                        Color(0x662196F3); // Colors.blue.withOpacity(0.4)

                    if (states.contains(WidgetState.hovered)) {
                      return hoverColor;
                    }
                    if (states.contains(WidgetState.pressed)) {
                      return pressColor;
                    }
                    return null;
                  },
                ),
                // ... rest of the style
              ),
              onPressed: widget.onPresess,
              child: Text(widget.text),
            ),
          ],
        ));
  }

  @override
  void dispose() {
    _removeOverlay();
    super.dispose();
  }
}
