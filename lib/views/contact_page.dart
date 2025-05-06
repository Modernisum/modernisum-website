import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ContactPage extends StatelessWidget {
  const ContactPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Initialize ScreenUtil with design size
    ScreenUtil.init(
      context,
      designSize: const Size(375, 812), // Base design size (iPhone X)
      minTextAdapt: true,
    );

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: Text(
          'Contact Us',
          style: TextStyle(fontSize: 20.sp),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(20.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Contact Us',
                style: TextStyle(
                  fontSize: 32.sp,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFFf5b301),
                ),
              ),
              SizedBox(height: 20.h),
              Container(
                padding: EdgeInsets.all(20.w),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10.r),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.2),
                      spreadRadius: 2.r,
                      blurRadius: 5.r,
                      offset: Offset(0, 3.h),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Get in Touch',
                      style: TextStyle(
                        fontSize: 24.sp,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFFf5b301),
                      ),
                    ),
                    SizedBox(height: 20.h),
                    _buildContactForm(),
                    SizedBox(height: 30.h),
                    Text(
                      'Our Location',
                      style: TextStyle(
                        fontSize: 24.sp,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFFf5b301),
                      ),
                    ),
                    SizedBox(height: 20.h),
                    _buildContactInfo(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildContactForm() {
    return Column(
      children: [
        TextField(
          decoration: InputDecoration(
            labelText: 'Name',
            labelStyle: TextStyle(fontSize: 16.sp),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
            prefixIcon: Icon(Icons.person, size: 24.w),
            contentPadding:
                EdgeInsets.symmetric(horizontal: 15.w, vertical: 15.h),
          ),
        ),
        SizedBox(height: 15.h),
        TextField(
          decoration: InputDecoration(
            labelText: 'Email',
            labelStyle: TextStyle(fontSize: 16.sp),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
            prefixIcon: Icon(Icons.email, size: 24.w),
            contentPadding:
                EdgeInsets.symmetric(horizontal: 15.w, vertical: 15.h),
          ),
        ),
        SizedBox(height: 15.h),
        TextField(
          maxLines: 5,
          decoration: InputDecoration(
            labelText: 'Message',
            labelStyle: TextStyle(fontSize: 16.sp),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.r),
            ),
            prefixIcon: Icon(Icons.message, size: 24.w),
            contentPadding:
                EdgeInsets.symmetric(horizontal: 15.w, vertical: 15.h),
          ),
        ),
        SizedBox(height: 20.h),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF3b3f43),
              padding: EdgeInsets.symmetric(vertical: 15.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.r),
              ),
            ),
            child: Text(
              'Send Message',
              style: TextStyle(
                fontSize: 16.sp,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildContactInfo() {
    return Column(
      children: [
        _buildInfoRow(Icons.location_on,
            'jawar calony ,parikshitgarh meerut Uttar Pradesh India (250406)'),
        _buildInfoRow(Icons.phone, '+91 9368671007'),
        _buildInfoRow(Icons.email, 'contact@modernisum.com'),
        _buildInfoRow(Icons.access_time, 'Mon - Fri: 9:00 AM - 6:00 PM'),
      ],
    );
  }

  Widget _buildInfoRow(IconData icon, String text) {
    return Padding(
      padding: EdgeInsets.only(bottom: 15.h),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(10.w),
            decoration: BoxDecoration(
              color: const Color(0xFF3b3f43),
              borderRadius: BorderRadius.circular(10.r),
            ),
            child: Icon(
              icon,
              color: Colors.white,
              size: 20.w,
            ),
          ),
          SizedBox(width: 15.w),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: 16.sp,
                color: Colors.grey,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
