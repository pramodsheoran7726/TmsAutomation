/**
 * Locator Finder — Browser Console Script (P1 Stable Only)
 *
 * Paste into DevTools console to scan the page and generate
 * only the most stable, production-grade locators.
 *
 * P1 locators: data-testid, stable id, aria-label, role+name, name, placeholder
 * Duplicate IDs are detected and resolved with context-aware XPaths.
 *
 * Usage:
 *   findLocators()                          // all elements
 *   findLocators({ tag: 'button' })         // only <button> elements
 *   findLocators({ highlight: true })       // enable highlightLocator(index)
 *
 * Output is auto-copied to clipboard as ready-to-use Playwright locators.
 */
;(function () {
  'use strict';

  // Scan every element in the DOM — filter happens via P1 locator generators
  const CANDIDATE_SELECTOR = '*';

  const AUTO_ID_PATTERNS = [
    /^react-select/i, /^radix-/i, /^:r/, /^ember/i,
    /^headlessui-/i, /^downshift-/i, /^rc-/i, /^mui-/i,
    /^[0-9a-f]{8,}$/i, /^[a-z0-9]{20,}$/i, /^\d+$/,
    /^[0-9:]+$/,
  ];

  const TEST_DATA_ATTRS = ['data-testid', 'data-test', 'data-cy', 'data-qa'];

  // -- Helpers ----------------------------------------------------------------

  function isVisible(el) {
    if (!(el instanceof HTMLElement)) return false;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    if (parseFloat(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 || r.height > 0;
  }

  function isAutoId(id) {
    if (!id) return true;
    if (id.length <= 2) return true;
    return AUTO_ID_PATTERNS.some(p => p.test(id));
  }

  function esc(str) {
    return CSS.escape ? CSS.escape(str) : str.replace(/([^\w-])/g, '\\$1');
  }

  function truncate(str, len) {
    if (!str) return '';
    str = str.trim().replace(/\s+/g, ' ');
    return str.length > len ? str.slice(0, len) + '...' : str;
  }

  function visibleText(el) {
    let t = '';
    for (const n of el.childNodes) {
      if (n.nodeType === Node.TEXT_NODE) t += n.textContent;
    }
    return t.trim().replace(/\s+/g, ' ');
  }

  function fullText(el) {
    return (el.textContent || '').trim().replace(/\s+/g, ' ');
  }

  function cssCount(sel) {
    try { return document.querySelectorAll(sel).length; } catch { return 0; }
  }

  function xpathCount(xpath) {
    try {
      return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
    } catch { return 0; }
  }

  function implicitRole(el) {
    const tag = el.tagName.toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();
    const map = {
      a: el.hasAttribute('href') ? 'link' : null,
      button: 'button',
      input: ({ checkbox:'checkbox', radio:'radio', submit:'button', reset:'button',
        text:'textbox', search:'searchbox', email:'textbox', tel:'textbox',
        url:'textbox', number:'spinbutton', range:'slider' })[type] || 'textbox',
      select: 'combobox', textarea: 'textbox', img: 'img',
      h1:'heading', h2:'heading', h3:'heading', h4:'heading', h5:'heading', h6:'heading',
    };
    return map[tag] || null;
  }

  // -- Duplicate ID: find stable parent context -------------------------------

  function findParentContext(el, depth) {
    let current = el.parentElement;
    let level = 0;
    while (current && current !== document.body && level < depth) {
      const pid = current.id;
      const pTestId = current.getAttribute('data-testid');
      const pTag = current.tagName.toLowerCase();

      // Desktop/Mobile tabs — very stable
      if (pid === '-Desktop' || pid === '-Mobile') {
        return { type: 'tab', id: pid, tag: pTag, label: pid.replace('-', '') };
      }
      // Stable parent ID
      if (pid && !isAutoId(pid)) {
        return { type: 'id', id: pid, tag: pTag, label: pid };
      }
      // Parent data-testid
      if (pTestId) {
        return { type: 'data-testid', id: pTestId, tag: pTag, label: pTestId };
      }
      current = current.parentElement;
      level++;
    }
    return null;
  }

  // -- Unique XPath (positional fallback) ------------------------------------

  function getPositionalXPath(el) {
    if (el === document.body) return '/html/body';
    let ix = 0;
    const siblings = el.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] === el) {
        return getPositionalXPath(el.parentNode) + '/' + el.tagName.toLowerCase() + '[' + (ix + 1) + ']';
      }
      if (siblings[i].nodeType === 1 && siblings[i].tagName === el.tagName) ix++;
    }
    return null;
  }

  // -- Pre-scan: build ID count map ------------------------------------------

  function buildIdCountMap(elements) {
    const map = {};
    elements.forEach(el => {
      if (el.id) map[el.id] = (map[el.id] || 0) + 1;
    });
    return map;
  }

  // -- P1 Locator Generators -------------------------------------------------

  function genTestData(el) {
    const out = [];
    for (const attr of TEST_DATA_ATTRS) {
      const val = el.getAttribute(attr);
      if (val) {
        const css = `[${attr}="${val}"]`;
        out.push({
          type: attr, css,
          playwright: `page.locator('${css}')`,
          xpath: `//*[@${attr}="${val}"]`,
        });
      }
    }
    return out;
  }

  function genId(el, idCountMap) {
    const id = el.id;
    if (!id || isAutoId(id)) return [];

    const count = idCountMap[id] || 1;
    const isDup = count > 1;

    if (!isDup) {
      const css = `#${esc(id)}`;
      return [{
        type: 'id', css,
        playwright: `page.locator('${css}')`,
        xpath: `//*[@id="${id}"]`,
      }];
    }

    // Duplicate ID — resolve with parent context
    const ctx = findParentContext(el, 6);
    if (ctx) {
      let ctxXPath;
      if (ctx.type === 'data-testid') {
        ctxXPath = `//${ctx.tag}[@data-testid="${ctx.id}"]`;
      } else {
        ctxXPath = `//${ctx.tag}[@id="${ctx.id}"]`;
      }
      const resolvedXPath = `${ctxXPath}//*[@id="${id}"]`;
      return [{
        type: 'id (dup->ctx)',
        css: null,
        playwright: `page.locator('${ctxXPath} >> #${esc(id)}')`,
        xpath: resolvedXPath,
        warning: `Dup ID x${count} — resolved via ${ctx.type}="${ctx.label}"`,
      }];
    }

    // No stable parent — use positional XPath
    const posXPath = getPositionalXPath(el);
    return [{
      type: 'id (dup->pos)',
      css: null,
      playwright: `page.locator('xpath=${posXPath}')`,
      xpath: posXPath,
      warning: `Dup ID x${count} — using positional XPath (fragile)`,
    }];
  }

  function genAriaLabel(el) {
    const label = el.getAttribute('aria-label');
    if (!label) return [];
    const css = `[aria-label="${label}"]`;
    return [{
      type: 'aria-label', css,
      playwright: `page.getByLabel('${label.replace(/'/g, "\\'")}')`,
      xpath: `//*[@aria-label="${label}"]`,
    }];
  }

  function genRole(el) {
    const role = el.getAttribute('role') || implicitRole(el);
    if (!role) return [];
    const name = el.getAttribute('aria-label') || visibleText(el) || el.getAttribute('title') || '';
    if (!name) return [];
    const safe = name.replace(/'/g, "\\'");
    return [{
      type: 'role+name', css: null,
      playwright: `page.getByRole('${role}', { name: '${safe}' })`,
      xpath: null,
    }];
  }

  function genPlaceholder(el) {
    const ph = el.getAttribute('placeholder');
    if (!ph) return [];
    return [{
      type: 'placeholder', css: `[placeholder="${ph}"]`,
      playwright: `page.getByPlaceholder('${ph.replace(/'/g, "\\'")}')`,
      xpath: `//*[@placeholder="${ph}"]`,
    }];
  }

  function genName(el) {
    const name = el.getAttribute('name');
    if (!name) return [];
    const tag = el.tagName.toLowerCase();
    if (!['input','select','textarea'].includes(tag)) return [];
    const css = `${tag}[name="${name}"]`;
    return [{
      type: 'name', css,
      playwright: `page.locator('${css}')`,
      xpath: `//${tag}[@name="${name}"]`,
    }];
  }

  // -- Core -------------------------------------------------------------------

  function collectLocators(el, idCountMap) {
    const generators = [
      e => genTestData(e),
      e => genId(e, idCountMap),
      e => genAriaLabel(e),
      e => genRole(e),
      e => genPlaceholder(e),
      e => genName(e),
    ];
    const locators = [];
    for (const gen of generators) {
      for (const item of gen(el)) {
        let count = 0;
        if (item.css) count = cssCount(item.css);
        else if (item.xpath) count = xpathCount(item.xpath);
        else count = 1; // role+name — assume unique
        locators.push({ ...item, unique: count === 1, matchCount: count });
      }
    }
    return locators;
  }

  // -- Main -------------------------------------------------------------------

  function findLocators(opts) {
    opts = opts || {};
    const tagFilter = opts.tag;
    const highlight = opts.highlight;

    // Gather all candidates
    const allEls = Array.from(document.querySelectorAll(CANDIDATE_SELECTOR));
    const idCountMap = buildIdCountMap(allEls);

    const results = [];
    const seen = new Set();
    const dupIdSet = new Set(Object.keys(idCountMap).filter(k => idCountMap[k] > 1));

    const SKIP_TAGS = new Set(['script','style','link','meta','head','html','noscript','br','hr','wbr','base','title']);
    for (const el of allEls) {
      if (seen.has(el)) continue;
      const elTag = el.tagName.toLowerCase();
      if (SKIP_TAGS.has(elTag)) continue;
      if (!isVisible(el)) continue;
      seen.add(el);
      if (tagFilter && elTag !== tagFilter.toLowerCase()) continue;

      const locators = collectLocators(el, idCountMap);
      if (!locators.length) continue;

      const preview = truncate(fullText(el), 40);
      for (const loc of locators) {
        results.push({
          _el: el,
          element: `<${elTag}>${preview ? ' ' + preview : ''}`,
          type: loc.type,
          playwright: loc.playwright,
          css: loc.css || null,
          xpath: loc.xpath || null,
          selector: loc.css || loc.xpath || loc.playwright,
          unique: loc.unique,
          matchCount: loc.matchCount,
          warning: loc.warning || null,
        });
      }
    }

    // =========================================================================
    // OUTPUT
    // =========================================================================

    console.clear();
    console.log(
      '%c LOCATOR FINDER — P1 Stable Locators ',
      'background:#1a73e8;color:white;font-size:14px;padding:4px 12px;border-radius:4px',
    );
    console.log(`Page:  ${document.title}`);
    console.log(`URL:   ${location.href}`);

    const uniqueCount = results.filter(r => r.unique).length;
    console.log(
      `Found %c${results.length}%c locators (%c${uniqueCount} unique%c) across %c${seen.size}%c elements`,
      'font-weight:bold;color:#1a73e8','',
      'font-weight:bold;color:green','',
      'font-weight:bold;color:#1a73e8','',
    );

    // -- Duplicate ID warnings --
    if (dupIdSet.size > 0) {
      console.log(
        `\n%c DUPLICATE IDs DETECTED (${dupIdSet.size}) `,
        'background:#cc3300;color:white;padding:2px 8px;border-radius:3px',
      );
      for (const id of dupIdSet) {
        console.log(`   "${id}" appears ${idCountMap[id]} times — context-aware XPath used`);
      }
    }

    if (!results.length) {
      console.log('%cNo P1 locators found.', 'color:orange');
      return [];
    }

    // -- Plain text table (copyable from console) --
    console.log('');
    const div = '='.repeat(140);
    const hdr = padRow('#', 'Element', 'Type', 'Playwright Locator', 'Unique', 'Warning');
    console.log(div);
    console.log(hdr);
    console.log(div);
    results.forEach((r, i) => {
      console.log(padRow(
        String(i),
        truncate(r.element, 32),
        r.type,
        r.playwright,
        r.unique ? 'Yes' : `No(${r.matchCount})`,
        r.warning || '',
      ));
    });
    console.log(div);

    // -- Build JSON output --
    const jsonOutput = {
      page: document.title,
      url: location.href,
      timestamp: new Date().toISOString(),
      summary: {
        totalElements: seen.size,
        totalLocators: results.length,
        uniqueLocators: uniqueCount,
        duplicateIds: Array.from(dupIdSet).map(id => ({
          id, count: idCountMap[id],
        })),
      },
      locators: [],
    };

    // Group locators by element
    const grouped = new Map();
    results.forEach(r => {
      if (!grouped.has(r.element)) grouped.set(r.element, []);
      grouped.get(r.element).push({
        type: r.type,
        playwright: r.playwright,
        css: r.css || undefined,
        xpath: r.xpath || undefined,
        selector: r.selector,
        unique: r.unique,
        matchCount: r.matchCount,
        warning: r.warning || undefined,
      });
    });

    for (const [element, locs] of grouped) {
      jsonOutput.locators.push({ element, locators: locs });
    }

    const clipText = JSON.stringify(jsonOutput, null, 2);

    // Print JSON in console (copyable)
    console.log('\n%c JSON OUTPUT (also copied to clipboard) ', 'background:#333;color:#0f0;padding:2px 8px;border-radius:3px');
    console.log(clipText);

    // -- Copy to clipboard --
    navigator.clipboard.writeText(clipText).then(() => {
      console.log(
        '\n%c COPIED TO CLIPBOARD %c Paste anywhere to use.',
        'background:green;color:white;padding:2px 8px;border-radius:3px',
        'color:green',
      );
    }).catch(() => {
      console.log(
        '\n%c Could not auto-copy. Select and copy manually: ',
        'color:orange;font-weight:bold',
      );
      console.log(clipText);
    });

    // -- Highlight mode --
    if (highlight) {
      console.log(
        '\n%c HIGHLIGHT MODE ON %c Call %chighlightLocator(index)%c to flash element on page.',
        'background:#1a73e8;color:white;padding:2px 8px;border-radius:3px', '',
        'font-weight:bold;color:#1a73e8', '',
      );
      window.highlightLocator = function (idx) {
        if (idx < 0 || idx >= results.length) {
          console.log('Invalid index. Range: 0 –', results.length - 1);
          return;
        }
        document.querySelectorAll('[data-lf-hl]').forEach(el => {
          el.style.outline = el.dataset.lfOrig || '';
          el.style.outlineOffset = '';
          el.removeAttribute('data-lf-hl');
        });
        const t = results[idx]._el;
        t.dataset.lfOrig = t.style.outline || '';
        t.style.outline = '3px solid #ff4444';
        t.style.outlineOffset = '2px';
        t.setAttribute('data-lf-hl', '1');
        t.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log(`Highlighted #${idx}: ${results[idx].element}`);
        console.log(`  ${results[idx].playwright}`);
      };
    }

    // -- Usage hint --
    console.log(
      '\n%c Re-run: %cfindLocators()%c | %cfindLocators({ tag: "button" })%c | %cfindLocators({ highlight: true })',
      'color:gray',
      'color:#1a73e8;font-weight:bold','color:gray',
      'color:#1a73e8;font-weight:bold','color:gray',
      'color:#1a73e8;font-weight:bold',
    );

    return results.map(r => ({
      element: r.element, type: r.type, playwright: r.playwright,
      css: r.css, xpath: r.xpath, selector: r.selector,
      unique: r.unique, warning: r.warning,
    }));
  }

  // -- Padding helper --
  function padRow(idx, element, type, playwright, unique, warning) {
    return [
      idx.padEnd(4),
      element.padEnd(35),
      type.padEnd(16),
      playwright.padEnd(58),
      unique.padEnd(8),
      (warning || '').substring(0, 40),
    ].join(' | ');
  }

  // Expose & run
  window.findLocators = findLocators;
  findLocators();
})();
