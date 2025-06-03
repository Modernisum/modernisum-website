import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BuildCard extends StatelessWidget {
  final String title;
  final String imagePath;

  const BuildCard({
    required this.title,
    required this.imagePath,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 20.h),
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 15.h),
      child: Container(
        height: MediaQuery.of(context).size.height * 0.4,
        width: MediaQuery.of(context).size.width * 0.8,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.r),
          gradient: const LinearGradient(colors: [
            Color.fromRGBO(251, 252, 204, 1),
            Color(0xFFF0F8CB),
          ]),
          boxShadow: [
            BoxShadow(
                color: Colors.blue, offset: Offset(0, -1.h), blurRadius: 5.r),
            BoxShadow(
                color: Colors.brown, offset: Offset(0, 1.h), blurRadius: 5.r),
          ],
        ),
        child: Stack(
          children: [
            SizedBox(
              width: double.infinity,
              height: double.infinity,
              child: Image(
                image: AssetImage(imagePath),
                fit: BoxFit.cover,
              ),
            ),
            Positioned(
              bottom: 11.h,
              left: 0,
              right: 0,
              child: Opacity(
                opacity: 0.3,
                child: Container(
                  height: 30.h,
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Colors.blue,
                        Colors.brown,
                      ],
                    ),
                  ),
                  child: Text(
                    title,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.titleLarge!.copyWith(
                          fontWeight: FontWeight.bold,
                          fontSize: 20.sp,
                        ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
