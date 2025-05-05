import 'package:get/get.dart';

class TeamMember {
  final String name;
  final String role;
  final String bio;

  TeamMember({
    required this.name,
    required this.role,
    required this.bio,
  });
}

class AboutController extends GetxController {
  final teamMembers = <TeamMember>[].obs;
  final companyDescription = '''
We are a modern software development company specializing in creating innovative digital solutions. 
Our team of experts is dedicated to delivering high-quality web and mobile applications that help businesses thrive in the digital age.
'''
      .obs;

  @override
  void onInit() {
    super.onInit();
    loadTeamMembers();
  }

  void loadTeamMembers() {
    teamMembers.value = [
      TeamMember(
        name: 'John Doe',
        role: 'CEO & Founder',
        bio:
            'Tech enthusiast with 15 years of experience in software development.',
      ),
      TeamMember(
        name: 'Jane Smith',
        role: 'Lead Developer',
        bio: 'Full-stack developer specializing in modern web technologies.',
      ),
      TeamMember(
        name: 'Mike Johnson',
        role: 'UI/UX Designer',
        bio: 'Creative designer with a passion for user-centered design.',
      ),
    ];
  }
}
