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
}
