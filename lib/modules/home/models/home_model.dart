class ServiceItem {
  final String title;
  final String imagePath;
  final String description;

  ServiceItem({
    required this.title,
    required this.imagePath,
    required this.description,
  });
}

class PortfolioItem {
  final String title;
  final String imagePath;
  final String description;

  PortfolioItem({
    required this.title,
    required this.imagePath,
    required this.description,
  });
}

class HomeModel {
  final List<ServiceItem> services = [
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

  final List<PortfolioItem> portfolioItems = [
    PortfolioItem(
      title: 'Modern School',
      imagePath: '/images/img6.png',
      description: 'School management system',
    ),
    PortfolioItem(
      title: 'Modern CV',
      imagePath: '/images/img7.png',
      description: 'CV builder application',
    ),
    PortfolioItem(
      title: 'Modern Page',
      imagePath: '/images/img8.png',
      description: 'Portfolio website',
    ),
  ];

  final String companyDescription = 'Modernisum transforms traditional operations with advanced technology, offering '
      'software and hardware solutions that reduce complexity, automate processes,'
      ' and help you scale your organization efficiently and intelligently.';

  final String iotDescription = 'Modernisum uses advanced IoT and embedded systems to automate business '
      'operations, reduce human errors, save valuable time, boost efficiency, increase '
      'accuracy, and drive smarter, scalable growth solutions';
} 