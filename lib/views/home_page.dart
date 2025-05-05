import 'package:flutter/material.dart';
import '../modules/home/home_view.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: const Text('Modernisum'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/home'),
            child: const Text('Home', style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/services'),
            child:
                const Text('Services', style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/portfolio'),
            child:
                const Text('Portfolio', style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/blog'),
            child: const Text('Blog', style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/about'),
            child: const Text('About', style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/contact'),
            child:
                const Text('Contact Us', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
      body: const HomeView(),
    );
  }
}
