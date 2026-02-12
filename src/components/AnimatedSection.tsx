import { ReactNode, useRef, useEffect, useState } from 'react';

type AnimationType = 
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'rotate'
  | 'blur';

interface AnimatedSectionProps {
  children: ReactNode;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

export const AnimatedSection = ({
  children,
  animationType = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  className = '',
  stagger = false,
  staggerDelay = 100,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) {
                setHasAnimated(true);
              }
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  const getAnimationClass = () => {
    if (!isVisible && !hasAnimated) {
      switch (animationType) {
        case 'fadeIn':
          return 'opacity-0';
        case 'slideUp':
          return 'opacity-0 translate-y-10';
        case 'slideDown':
          return 'opacity-0 -translate-y-10';
        case 'slideLeft':
          return 'opacity-0 translate-x-10';
        case 'slideRight':
          return 'opacity-0 -translate-x-10';
        case 'scale':
          return 'opacity-0 scale-95';
        case 'rotate':
          return 'opacity-0 rotate-12';
        case 'blur':
          return 'opacity-0 blur-sm';
        default:
          return 'opacity-0';
      }
    }

    const baseTransition = 'transition-all duration-700 ease-out';
    
    switch (animationType) {
      case 'fadeIn':
        return `${baseTransition} opacity-100`;
      case 'slideUp':
        return `${baseTransition} opacity-100 translate-y-0`;
      case 'slideDown':
        return `${baseTransition} opacity-100 translate-y-0`;
      case 'slideLeft':
        return `${baseTransition} opacity-100 translate-x-0`;
      case 'slideRight':
        return `${baseTransition} opacity-100 translate-x-0`;
      case 'scale':
        return `${baseTransition} opacity-100 scale-100`;
      case 'rotate':
        return `${baseTransition} opacity-100 rotate-0`;
      case 'blur':
        return `${baseTransition} opacity-100 blur-0`;
      default:
        return baseTransition;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

interface AnimatedChildProps {
  children: ReactNode;
  index?: number;
  animationType?: AnimationType;
  delay?: number;
  className?: string;
}

export const AnimatedChild = ({
  children,
  index = 0,
  animationType = 'fadeIn',
  delay = 0,
  className = '',
}: AnimatedChildProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay + index * 100);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, index]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case 'fadeIn':
          return 'opacity-0';
        case 'slideUp':
          return 'opacity-0 translate-y-10';
        case 'slideDown':
          return 'opacity-0 -translate-y-10';
        case 'slideLeft':
          return 'opacity-0 translate-x-10';
        case 'slideRight':
          return 'opacity-0 -translate-x-10';
        case 'scale':
          return 'opacity-0 scale-95';
        case 'rotate':
          return 'opacity-0 rotate-12';
        case 'blur':
          return 'opacity-0 blur-sm';
        default:
          return 'opacity-0';
      }
    }

    const baseTransition = 'transition-all duration-700 ease-out';
    
    switch (animationType) {
      case 'fadeIn':
        return `${baseTransition} opacity-100`;
      case 'slideUp':
        return `${baseTransition} opacity-100 translate-y-0`;
      case 'slideDown':
        return `${baseTransition} opacity-100 translate-y-0`;
      case 'slideLeft':
        return `${baseTransition} opacity-100 translate-x-0`;
      case 'slideRight':
        return `${baseTransition} opacity-100 translate-x-0`;
      case 'scale':
        return `${baseTransition} opacity-100 scale-100`;
      case 'rotate':
        return `${baseTransition} opacity-100 rotate-0`;
      case 'blur':
        return `${baseTransition} opacity-100 blur-0`;
      default:
        return baseTransition;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};
