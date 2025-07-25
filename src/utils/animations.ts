import { gsap } from 'gsap';

// 页面加载动画
export const pageLoadAnimation = () => {
  const tl = gsap.timeline();
  
  tl.from('.navbar', {
    y: -50,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  })
  .from('.sidebar', {
    x: -100,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.search-container', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.knowledge-card', {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.2');
  
  return tl;
};

// 卡片悬停动画
export const cardHoverAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    y: -8,
    scale: 1.02,
    duration: 0.3,
    ease: 'power2.out',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  });
};

// 卡片离开动画
export const cardLeaveAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    y: 0,
    scale: 1,
    duration: 0.3,
    ease: 'power2.out',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  });
};

// 搜索框聚焦动画
export const searchFocusAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.02,
    duration: 0.2,
    ease: 'power2.out'
  });
};

// 搜索框失焦动画
export const searchBlurAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out'
  });
};

// 按钮点击动画
export const buttonClickAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1
  });
};

// 过滤器切换动画
export const filterToggleAnimation = (element: HTMLElement, isActive: boolean) => {
  if (isActive) {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: 'back.out(1.7)'
    });
  } else {
    gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  }
};

// 加载动画
export const loadingAnimation = (element: HTMLElement) => {
  return gsap.to(element, {
    rotation: 360,
    duration: 1,
    ease: 'none',
    repeat: -1
  });
};
