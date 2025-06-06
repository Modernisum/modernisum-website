import 'package:flutter/material.dart';
//import 'package:flutter_email_sender/flutter_email_sender.dart';
import 'package:modernisum/widgets/constants/color.dart';
import 'package:modernisum/widgets/constants/responsive.dart';

class TextFieldHelper1 extends ResponsiveConstant {
  static Widget buildTextField({
    required String label,
    required TextEditingController controller,
    int? maxLines,
    String? Function(String?)? validator,
  }) {
    if (label == 'Name') {
      return TextFormField(
        controller: controller,
        maxLines: maxLines ?? 1,
        decoration: InputDecoration(
          hintText: 'Enter your name',
          labelText: 'Name',
          prefixIcon: const Icon(Icons.person_outlined),
          filled: true,
          fillColor: AppGradients.primary.colors.first.withOpacity(0.8),
          contentPadding:
              const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade400),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.grey, width: 2),
          ),
        ),
        validator: validator ??
            (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your name';
              }
              return null;
            },
      );
    } else if (label == 'Message') {
      return TextFormField(
        controller: controller,
        maxLines: maxLines ?? 5,
        decoration: InputDecoration(
          hintText: 'Enter your message',
          labelText: 'Message',
          prefixIcon: const Icon(Icons.message_outlined),
          filled: true,
          fillColor: Colors.grey.shade100,
          contentPadding:
              const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade400),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.grey, width: 2),
          ),
        ),
        validator: validator ??
            (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your message';
              }
              return null;
            },
      );
    } else {
      return TextFormField(
        controller: controller,
        decoration: InputDecoration(
          hintText: 'Email',
          labelText: 'Enter your email',
          prefixIcon: const Icon(Icons.email_outlined),
          filled: true,
          fillColor: Colors.grey.shade100,
          contentPadding:
              const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade400),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.grey, width: 2),
          ),
        ),
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter your email';
          }
          if (!RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
              .hasMatch(value)) {
            return 'Please enter a valid email';
          }
          return null;
        },
      );
    }
  }
}
