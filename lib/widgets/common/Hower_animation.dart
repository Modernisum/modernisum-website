import 'package:flutter/material.dart';

class HoverAnimation extends StatefulWidget {
  final String text;
  final List<String> options;
  final void Function() onPress;

  const HoverAnimation({
    super.key,
    required this.text,
    required this.options,
    required this.onPress,
  });

  @override
  State<HoverAnimation> createState() => _HoverAnimationState();
}

class _HoverAnimationState extends State<HoverAnimation>
    with SingleTickerProviderStateMixin {
  final GlobalKey _hoverKey = GlobalKey();
  OverlayEntry? _overlayEntry;
  late AnimationController _controller;
  late Animation<Offset> _offsetAnimation;

  // Static reference to the currently open menu
  static _HoverAnimationState? _currentlyOpen;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 250),
      vsync: this,
    );
    _offsetAnimation = Tween<Offset>(
      begin: const Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOut,
    ));
  }

  void _showOverlay() {
    // Close any previously open menu
    if (_currentlyOpen != null && _currentlyOpen != this) {
      _currentlyOpen!._removeOverlay();
    }
    _currentlyOpen = this;

    final RenderBox renderBox =
        _hoverKey.currentContext!.findRenderObject() as RenderBox;
    final Offset offset = renderBox.localToGlobal(Offset.zero);
    final Size size = renderBox.size;

    _overlayEntry = OverlayEntry(
      builder: (context) => Positioned(
        top: offset.dy + size.height + 10,
        left: offset.dx - 20,
        width: size.width * 3,
        child: MouseRegion(
          onExit: (event) {
            _removeOverlay();
          },
          child: Material(
            elevation: 4,
            borderRadius: BorderRadius.circular(8),
            child: SlideTransition(
              position: _offsetAnimation,
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
                  children: [
                    for (int i = 0; i < widget.options.length; i++) ...[
                      _HoverElevatedOption(
                        label: widget.options[i],
                        onTap: () {
                          _removeOverlay();
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                                content:
                                    Text('You selected: ${widget.options[i]}')),
                          );
                        },
                      ),
                      if (i != widget.options.length - 1)
                        SizedBox(height: 8), // Space between options
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );

    Overlay.of(context).insert(_overlayEntry!);
    _controller.forward(from: 0);
  }

  void _removeOverlay() {
    if (_overlayEntry != null) {
      _controller.reverse();
      _overlayEntry?.remove();
      _overlayEntry = null;
      if (_currentlyOpen == this) {
        _currentlyOpen = null;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      key: _hoverKey,
      child: MouseRegion(
        onEnter: (_) {
          if (_overlayEntry == null) _showOverlay();
        },
        child: Row(
          children: [
            TextButton(
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.resolveWith<Color?>(
                  (Set<MaterialState> states) {
                    const Color hoverColor = Color(0x332196F3);
                    const Color pressColor = Color(0x662196F3);
                    if (states.contains(MaterialState.hovered)) {
                      return hoverColor;
                    }
                    if (states.contains(MaterialState.pressed)) {
                      return pressColor;
                    }
                    return null;
                  },
                ),
              ),
              onPressed: widget.onPress,
              child: SelectableText(widget.text),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _removeOverlay();
    _controller.dispose();
    super.dispose();
  }
}

// This widget gives each option an elevated box style on hover
class _HoverElevatedOption extends StatefulWidget {
  final String label;
  final VoidCallback onTap;

  const _HoverElevatedOption({
    required this.label,
    required this.onTap,
  });

  @override
  State<_HoverElevatedOption> createState() => _HoverElevatedOptionState();
}

class _HoverElevatedOptionState extends State<_HoverElevatedOption> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: Duration(milliseconds: 120),
        margin: EdgeInsets.symmetric(vertical: 0),
        decoration: BoxDecoration(
          color: _hovered ? Colors.blue[50] : Colors.white,
          borderRadius: BorderRadius.circular(6),
          boxShadow: _hovered
              ? [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.15),
                    blurRadius: 8,
                    offset: Offset(0, 2),
                  )
                ]
              : [],
        ),
        child: ListTile(
          onTap: widget.onTap,
          title: Text(
            widget.label,
            style: TextStyle(
              color: _hovered ? Colors.blue : Colors.black,
              fontWeight: _hovered ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 2),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        ),
      ),
    );
  }
}
