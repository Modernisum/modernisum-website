import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'models/home_model.dart';

class HomeController extends GetxController
    with GetSingleTickerProviderStateMixin {
  static bool isFirstLoad = true; // Static variable to track first load
  final RxBool shouldAnimate = true.obs;
  final ScrollController scrollController = ScrollController();
  final RxInt currentIndex = 0.obs;
  final RxBool isLastAnimation = false.obs;
  final RxDouble currentScrollPosition = 0.0.obs;
  final RxBool isAnimationComplete = false.obs;
  final HomeModel model = HomeModel();

  // Define section positions
  static const double servicesPosition = 400.0; // Adjust based on your layout

  @override
  void onInit() {
    super.onInit();
    shouldAnimate.value = isFirstLoad;
    if (isFirstLoad) {
      isFirstLoad = false; // Set to false after first load
    }
    scrollController.addListener(_scrollListener);
  }

  @override
  void onClose() {
    scrollController.dispose();
    super.onClose();
  }

  void _scrollListener() {
    currentScrollPosition.value = scrollController.position.pixels;
  }

  void updateIndex(int index) {
    currentIndex.value = index;
  }

  void handleTap() {
    scrollToServices();
  }

  void scrollToTop() {
    scrollController.animateTo(
      0,
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeInOut,
    );
  }

  void scrollToServices() {
    scrollController.animateTo(
      servicesPosition,
      duration: const Duration(milliseconds: 800),
      curve: Curves.easeInOutCubic,
    );
  }

  bool get isAtServices =>
      currentScrollPosition.value >= servicesPosition - 50 &&
      currentScrollPosition.value <= servicesPosition + 50;

  void setAnimationComplete(bool value) {
    isAnimationComplete.value = value;
  }

  List<ServiceItem> get services => model.services;
  List<PortfolioItem> get portfolioItems => model.portfolioItems;
  String get companyDescription => model.companyDescription;
  String get iotDescription => model.iotDescription;
}
