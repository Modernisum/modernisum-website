import 'package:flutter/material.dart';

class AnimationText extends StatefulWidget {
  final Widget child;
  final String buttonName;
  final List<String> option;

  const AnimationText({
    super.key,
    required this.child,
    required this.buttonName,
    required this.option,
  });

  @override
  State<AnimationText> createState() => _AnimationTextState();
}

class _AnimationTextState extends State<AnimationText> {
  bool _isDialogVisible = false;

  void _showDropdownDialog(BuildContext context) {
    if (_isDialogVisible) return;

    _isDialogVisible = true;

    showDialog(
      context: context,
      builder: (_) => DropdownDialog(
        options: widget.option,
        onDismissed: () {
          _isDialogVisible = false;
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => _showDropdownDialog(context),
      child: TextButton(
        onPressed: () => _showDropdownDialog(context),
        child: Text(widget.buttonName),
      ),
    );
  }
}

class DropdownDialog extends StatefulWidget {
  final List<String> options;
  final VoidCallback onDismissed;

  const DropdownDialog({
    super.key,
    required this.options,
    required this.onDismissed,
  });

  @override
  State<DropdownDialog> createState() => _DropdownDialogState();
}

class _DropdownDialogState extends State<DropdownDialog>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _animation;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _animation = Tween<Offset>(
      begin: const Offset(0, -0.2),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    widget.onDismissed(); // Notify parent
    super.dispose();
  }

  void _onOptionSelected(String option) {
    Navigator.of(context).pop(); // Close dialog
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('You selected: $option')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      insetPadding: const EdgeInsets.all(20),
      backgroundColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: SlideTransition(
        position: _animation,
        child: ListView.builder(
          shrinkWrap: true,
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          itemCount: widget.options.length,
          itemBuilder: (context, index) {
            final option = widget.options[index];
            return ListTile(
              title: Text(option),
              onTap: () => _onOptionSelected(option),
            );
          },
        ),
      ),
    );
  }
}
