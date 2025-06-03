import 'package:flutter/material.dart';

class AnimationText extends StatelessWidget {
  final Widget child;
  final bool isTransparent;
  final String buttonName;
  final List<String> option;
  const AnimationText({
    super.key,
    required this.child,
    required this.buttonName,
    required this.option,
    this.isTransparent = false,
  });
  void _showDropdownDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (_) => const DropdownDialog(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: MouseRegion(
          onEnter: (_) => _showDropdownDialog(context),
          child: TextButton(
            onPressed: () => _showDropdownDialog(context),
            child: const Text('hover'),
          ),
        ),
      ),
    );
  }
}

class DropdownDialog extends StatefulWidget {
  const DropdownDialog({super.key});

  @override
  State<DropdownDialog> createState() => _DropdownDialogState();
}

class _DropdownDialogState extends State<DropdownDialog>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _animation;

  final List<String> options = ['Option 1', 'Option 2', 'Option 3'];

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
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
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
      child: SlideTransition(
        position: _animation,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: options
              .map((option) => ListTile(
                    title: Text(option),
                    onTap: () => _onOptionSelected(option),
                  ))
              .toList(),
        ),
      ),
    );
  }
}
