import 'package:get/get.dart';
import 'package:modernisum/modules/home/home_view.dart';
import 'package:modernisum/modules/services/services_view.dart';
import 'package:modernisum/modules/portfolio/portfolio_view.dart';
import 'package:modernisum/modules/blog/blog_view.dart';
import 'package:modernisum/modules/about/about_view.dart';
import 'package:modernisum/modules/contact/contact_view.dart';
import '../Binding/about_binding.dart';
import '../Binding/blog_binding.dart';
import '../Binding/contact_binding.dart';
import '../Binding/home_binding.dart';
import '../Binding/services_binding.dart';
import '../Binding/portfolio_binding.dart';

part 'app_routes.dart';

class AppPages {
  static const initial = Routes.home;

  static final routes = [
    GetPage(
      name: Routes.home,
      page: () => HomeView(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: Routes.services,
      page: () => const ServicesView(),
      binding: ServicesBinding(),
    ),
    GetPage(
      name: Routes.portfolio,
      page: () => const PortfolioView(),
      binding: PortfolioBinding(),
    ),
    GetPage(
      name: Routes.blog,
      page: () => const BlogView(),
      binding: BlogBinding(),
    ),
    GetPage(
      name: Routes.about,
      page: () => const AboutView(),
      binding: AboutBinding(),
    ),
    GetPage(
      name: Routes.contact,
      page: () => const ContactView(),
      binding: ContactBinding(),
    ),
  ];
}

class Routes {
  static const home = '/home';
  static const services = '/services';
  static const portfolio = '/portfolio';
  static const blog = '/blog';
  static const about = '/about';
  static const contact = '/contact';
}
