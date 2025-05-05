import 'package:get/get.dart';
import 'package:modernisum/modules/home/home_binding.dart';
import 'package:modernisum/modules/home/home_view.dart';
import 'package:modernisum/modules/services/services_binding.dart';
import 'package:modernisum/modules/services/services_view.dart';
import 'package:modernisum/modules/portfolio/portfolio_binding.dart';
import 'package:modernisum/modules/portfolio/portfolio_view.dart';
import 'package:modernisum/modules/blog/blog_binding.dart';
import 'package:modernisum/modules/blog/blog_view.dart';
import 'package:modernisum/modules/about/about_binding.dart';
import 'package:modernisum/modules/about/about_view.dart';
import 'package:modernisum/modules/contact/contact_binding.dart';
import 'package:modernisum/modules/contact/contact_view.dart';

part 'app_routes.dart';

class AppPages {
  static const initial = Routes.home;

  static final routes = [
    GetPage(
      name: Routes.home,
      page: () => const HomeView(),
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
