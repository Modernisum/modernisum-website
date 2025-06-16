import 'package:modernisum/widgets/constants/assets.dart';

class ServiceItem {
  String title;
  final String imagePath;
  final String description;

  ServiceItem({
    required this.title,
    required this.imagePath,
    required this.description,
  });
}

class ServiceModel {
  static List<ServiceItem> services1 = [
    ServiceItem(
      title: 'Mobile Application',
      imagePath: ImagePaths.appimg,
      description: 'Modern mobile applications for iOS and Android',
    ),
    ServiceItem(
      title: 'Web Application',
      imagePath: ImagePaths.webimg,
      description: 'Responsive web applications and websites',
    ),
    ServiceItem(
      title: 'Automation',
      imagePath: ImagePaths.autoimg,
      description: 'Business process automation solutions',
    ),
  ];
}
