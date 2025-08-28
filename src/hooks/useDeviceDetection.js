import { useState, useEffect } from 'react';

export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    isTouchDevice: false,
    deviceType: 'desktop'
  });

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 检测是否为触摸设备
      const isTouchDevice = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
      
      // 检测设备类型
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(userAgent);
      const isTabletUA = /tablet|ipad/i.test(userAgent);
      
      // 基于屏幕尺寸判断
      const isMobileScreen = width < 768;
      const isTabletScreen = width >= 768 && width < 1024;
      const isDesktopScreen = width >= 1024;
      
      // 综合判断
      let deviceType = 'desktop';
      let isMobile = false;
      let isTablet = false;
      let isDesktop = true;
      
      if (isMobileUA || (isMobileScreen && isTouchDevice)) {
        deviceType = 'mobile';
        isMobile = true;
        isTablet = false;
        isDesktop = false;
      } else if (isTabletUA || (isTabletScreen && isTouchDevice)) {
        deviceType = 'tablet';
        isMobile = false;
        isTablet = true;
        isDesktop = false;
      } else if (isDesktopScreen) {
        deviceType = 'desktop';
        isMobile = false;
        isTablet = false;
        isDesktop = true;
      }
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        screenHeight: height,
        isTouchDevice,
        deviceType,
        userAgent: navigator.userAgent
      });
      
      // 在document.body上添加设备类型class
      document.body.className = document.body.className.replace(/device-\w+/g, '');
      document.body.classList.add(`device-${deviceType}`);
      
      if (isTouchDevice) {
        document.body.classList.add('touch-device');
      } else {
        document.body.classList.remove('touch-device');
      }
    };

    // 初始检测
    detectDevice();

    // 监听窗口大小变化
    window.addEventListener('resize', detectDevice);
    
    // 监听设备方向变化（移动设备）
    window.addEventListener('orientationchange', () => {
      setTimeout(detectDevice, 100); // 延迟一点以确保尺寸更新
    });

    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  return deviceInfo;
};