import 'package:modernisum/widgets/constants/assets.dart';

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

class PortfolioModel {
  static List<PortfolioItem> portfolioItems1 = [
    PortfolioItem(
      title: 'Modern School',
      imagePath: ImagePaths.modernSchool,
      description: 'School management system',
    ),
    PortfolioItem(
      title: 'Modern CV',
      imagePath: ImagePaths.webimg,
      description: 'CV builder application',
    ),
    PortfolioItem(
      title: 'Modern Page',
      imagePath: ImagePaths.autoimg,
      description: 'Portfolio website',
    ),
  ];
}
