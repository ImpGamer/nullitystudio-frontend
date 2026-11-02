import type { Directive } from 'vue';

interface AnimateOptions {
  animation: string;
  threshold?: number;
  once?: boolean;
  delay?: string;
}

export const animateOnView: Directive<HTMLElement, AnimateOptions> = {
  mounted(el, binding) {
    const {
      animation,
      threshold = 0.2,
      once = true,
      delay = '0s'
    } = binding.value;

    el.classList.add('invisible');
    el.style.setProperty('--animate-delay', delay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('invisible');
          el.classList.add(
            'animate__animated',
            `animate__${animation}`
          );

          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove(
            'animate__animated',
            `animate__${animation}`
          );

          el.classList.add('invisible');
        }
      },
      { threshold }
    );

    observer.observe(el);
    (el as any)._observer = observer;
  },

  unmounted(el) {
    (el as any)._observer?.disconnect();
  }
};