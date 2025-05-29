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
      imagePath: '/images/img6.png',
      description: 'Modern mobile applications for iOS and Android',
    ),
    ServiceItem(
      title: 'Web Application',
      imagePath: '/images/img7.png',
      description: 'Responsive web applications and websites',
    ),
    ServiceItem(
      title: 'Automation',
      imagePath: '/images/img8.png',
      description: 'Business process automation solutions',
    ),
  ];
}
