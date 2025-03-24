export const themeEffect = function () {
  // `null` preference implies system (auto)
  const pref = localStorage.getItem('theme');

  if (null === pref) {
    document.documentElement.classList.add('theme-system');
  } else {
    document.documentElement.classList.remove('theme-system');
  }

  if (
    pref === 'dark' ||
    (!pref && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('pause-transitions');
    document.documentElement.classList.add('dark');
    // Using the dark mode background color (--background: 240 10% 3.9%)
    // Which roughly corresponds to #09090b
    document.head
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', '#09090b');

    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions');
    });
    return 'dark';
  } else {
    document.documentElement.classList.add('pause-transitions');
    document.documentElement.classList.remove('dark');
    // Using the light mode background color (--background: 0 0% 100%)
    // Which corresponds to #ffffff
    document.head
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', '#ffffff');
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pause-transitions');
    });
    return 'light';
  }
};