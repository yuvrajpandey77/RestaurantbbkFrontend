export const cn = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(' ');

export const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = src;
  });


