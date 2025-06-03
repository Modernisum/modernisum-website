class ManuOption {
  final String text;
  final List<String> options;
  ManuOption({
    required this.text,
    required this.options,
  });
}

class ManuModel {
  static List<String> serviceModel = [
    'Android Aplication ',
    ' IOS Application',
    'Web Application',
    'Frontend Application ',
    'Backend Application',
    'IoT Service ',
    'Automate Service'
  ];

  static List<String> portfolioModel = [
    'School Managment',
    'Profile',
    'Website'
  ];
}
