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
  "assets/images/pico-de-sao-sebastiao-autoral-original.jpeg": [
    {
      "width": 320,
      "path": "assets/images/pico-de-sao-sebastiao-autoral-original-320w.webp",
      "bytes": 11624
    },
    {
      "width": 640,
      "path": "assets/images/pico-de-sao-sebastiao-autoral-original-640w.webp",
      "bytes": 44812
    },
    {
      "width": 960,
      "path": "assets/images/pico-de-sao-sebastiao-autoral-original-960w.webp",
      "bytes": 94544
    },
    {
      "width": 1600,
      "path": "assets/images/pico-de-sao-sebastiao-autoral-original-1600w.webp",
      "bytes": 201134
    }
  ]
};
  function responsiveImageAttrs(src, sizes) {
    const entries = variants[String(src).replace(/^\//, '')];
    if (!entries) return '';
    return ' srcset="' + entries.map(v => '/' + v.path + ' ' + v.width + 'w').join(', ') + '" sizes="' + sizes + '"';
  }
  // PERF-01A: attribution travels with the user photograph in cards/hubs.
  responsiveImageAttrs.attribution = function (spot, lang) {
    if (spot.id !== 'pico-de-sao-sebastiao') return '';
    const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch]));
    const photoWord = ({ pt: 'Foto', en: 'Photo', es: 'Foto', fr: 'Photo', he: 'צילום' })[lang] || 'Photo';
    return '<small data-photo-attribution="pico-de-sao-sebastiao" class="block text-xs leading-relaxed" style="display:block;font-size:12px;line-height:1.5" onclick="event.stopPropagation()">' + esc(photoWord) + ': ' + esc(spot.photoCredit) + '</small>';
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = responsiveImageAttrs;
  else root.responsiveImageAttrs = responsiveImageAttrs;
})(typeof window !== 'undefined' ? window : globalThis);
