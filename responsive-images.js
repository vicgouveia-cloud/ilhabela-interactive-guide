// PERF-01: original src remains the fallback and metadata identity.
(function (root) {
  const variants = {
  "assets/images/cachoeira-da-laje_verified.jpg": [
    {
      "width": 320,
      "path": "assets/images/cachoeira-da-laje_verified-320w.webp",
      "bytes": 25654
    },
    {
      "width": 640,
      "path": "assets/images/cachoeira-da-laje_verified-640w.webp",
      "bytes": 111694
    },
    {
      "width": 960,
      "path": "assets/images/cachoeira-da-laje_verified-960w.webp",
      "bytes": 275256
    },
    {
      "width": 1600,
      "path": "assets/images/cachoeira-da-laje_verified-1600w.webp",
      "bytes": 815744
    }
  ],
  "assets/images/cachoeira-da-toca_verified.png": [
    {
      "width": 320,
      "path": "assets/images/cachoeira-da-toca_verified-320w.webp",
      "bytes": 25526
    },
    {
      "width": 640,
      "path": "assets/images/cachoeira-da-toca_verified-640w.webp",
      "bytes": 75956
    },
    {
      "width": 768,
      "path": "assets/images/cachoeira-da-toca_verified-768w.webp",
      "bytes": 102892
    }
  ],
  "assets/images/mirante-do-coracao_verified.jpg": [
    {
      "width": 320,
      "path": "assets/images/mirante-do-coracao_verified-320w.webp",
      "bytes": 23248
    },
    {
      "width": 640,
      "path": "assets/images/mirante-do-coracao_verified-640w.webp",
      "bytes": 96358
    },
    {
      "width": 960,
      "path": "assets/images/mirante-do-coracao_verified-960w.webp",
      "bytes": 229296
    },
    {
      "width": 1600,
      "path": "assets/images/mirante-do-coracao_verified-1600w.webp",
      "bytes": 657792
    }
  ],
  "assets/images/pico-de-sao-sebastiao_verified.jpg": [
    {
      "width": 320,
      "path": "assets/images/pico-de-sao-sebastiao_verified-320w.webp",
      "bytes": 25352
    },
    {
      "width": 640,
      "path": "assets/images/pico-de-sao-sebastiao_verified-640w.webp",
      "bytes": 93646
    },
    {
      "width": 960,
      "path": "assets/images/pico-de-sao-sebastiao_verified-960w.webp",
      "bytes": 189576
    },
    {
      "width": 1600,
      "path": "assets/images/pico-de-sao-sebastiao_verified-1600w.webp",
      "bytes": 438208
    }
  ]
};
  function responsiveImageAttrs(src, sizes) {
    const entries = variants[String(src).replace(/^\//, '')];
    if (!entries) return '';
    return ' srcset="' + entries.map(v => '/' + v.path + ' ' + v.width + 'w').join(', ') + '" sizes="' + sizes + '"';
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = responsiveImageAttrs;
  else root.responsiveImageAttrs = responsiveImageAttrs;
})(typeof window !== 'undefined' ? window : globalThis);
