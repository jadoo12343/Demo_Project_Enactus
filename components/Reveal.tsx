import { useEffect, useRef, useState, type ReactNode, type AnchorHTMLAttributes, type RefObject } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'a';
  href?: AnchorHTMLAttributes<HTMLAnchorElement>['href'];
};

export function Reveal(props: RevealProps) {
  const { children, className = '', delay = 0, as = 'div' } = props;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const sharedClassName = `reveal ${visible ? 'reveal-visible' : ''} ${className}`;
  const sharedStyle = { transitionDelay: `${delay}ms` };
  if (as === 'a') return <a ref={ref as RefObject<HTMLAnchorElement>} className={sharedClassName} style={sharedStyle} href={props.href}>{children}</a>;
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      className={sharedClassName}
      style={sharedStyle}
    >
      {children}
    </Tag>
  );
}
