import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';

export const GlobalBodyAdScript: React.FC = () => {
  const { adNetworkConfig, currentPage } = useStore();
  const [refreshCount, setRefreshCount] = useState(0);

  // Auto-refresh timer effect
  useEffect(() => {
    const isAutoRefreshActive =
      adNetworkConfig.enabled &&
      (adNetworkConfig.autoRefreshEnabled ?? true) &&
      currentPage !== 'admin';

    if (!isAutoRefreshActive) return;

    const intervalSeconds = adNetworkConfig.autoRefreshInterval || 30;
    const timerId = setInterval(() => {
      setRefreshCount((prev) => prev + 1);
    }, intervalSeconds * 1000);

    return () => clearInterval(timerId);
  }, [
    adNetworkConfig.enabled,
    adNetworkConfig.autoRefreshEnabled,
    adNetworkConfig.autoRefreshInterval,
    currentPage,
  ]);

  // Main ad injection and rotation effect
  useEffect(() => {
    if (!adNetworkConfig.enabled || currentPage === 'admin') {
      return;
    }

    // Clean up previously injected global containers & tagged ad scripts
    const previousContainer = document.getElementById('zapin-global-body-ad-container');
    if (previousContainer) {
      previousContainer.remove();
    }
    document.querySelectorAll('script[data-zapin-ad]').forEach((script) => script.remove());

    const scriptContainer = document.createElement('div');
    scriptContainer.id = 'zapin-global-body-ad-container';

    const injectScriptOrHtml = (codeString: string, idPrefix: string) => {
      if (!codeString || !codeString.trim()) return;
      const code = codeString.trim();

      // Create container for non-script HTML elements
      const tempDiv = document.createElement('div');
      tempDiv.id = `zapin-ad-holder-${idPrefix}`;
      tempDiv.innerHTML = code;

      // Extract and execute scripts dynamically with timestamp parameter to ensure dynamic rotation
      const scriptTags = tempDiv.querySelectorAll('script');
      scriptTags.forEach((sTag) => {
        const src = sTag.getAttribute('src');
        if (src) {
          let scriptUrl = src;
          if (scriptUrl.startsWith('//')) {
            scriptUrl = 'https:' + scriptUrl;
          }
          const separator = scriptUrl.includes('?') ? '&' : '?';
          const freshUrl = `${scriptUrl}${separator}_cb=${Date.now()}`;

          const scriptEl = document.createElement('script');
          scriptEl.type = 'text/javascript';
          scriptEl.src = freshUrl;
          scriptEl.async = true;
          scriptEl.setAttribute('data-zapin-ad', idPrefix);
          document.body.appendChild(scriptEl);
        } else if (sTag.textContent) {
          try {
            const inlineScript = document.createElement('script');
            inlineScript.type = 'text/javascript';
            inlineScript.textContent = sTag.textContent;
            inlineScript.setAttribute('data-zapin-ad', idPrefix);
            document.body.appendChild(inlineScript);
          } catch (e) {
            console.error('Ad script execution error:', e);
          }
        }
        sTag.remove();
      });

      if (tempDiv.childNodes.length > 0) {
        scriptContainer.appendChild(tempDiv);
      }
    };

    // 1. Full Body Dynamic Ad Script
    if (adNetworkConfig.bodyScriptEnabled && adNetworkConfig.bodyAdCode) {
      injectScriptOrHtml(adNetworkConfig.bodyAdCode, 'body-ad');
    }

    // 2. Social Bar Ad Unit Script Injection
    if (adNetworkConfig.socialBarEnabled && adNetworkConfig.socialBarCode) {
      injectScriptOrHtml(adNetworkConfig.socialBarCode, 'social-bar');
    }

    // 3. Native Banner Script Injection
    if (adNetworkConfig.nativeBannerEnabled && adNetworkConfig.nativeBannerCode) {
      injectScriptOrHtml(adNetworkConfig.nativeBannerCode, 'native-banner');
    }

    // 4. Custom / Newsletter Ad Snippet Injection
    if (adNetworkConfig.customScriptSnippet) {
      injectScriptOrHtml(adNetworkConfig.customScriptSnippet, 'custom-script');
    }

    if (scriptContainer.hasChildNodes()) {
      document.body.appendChild(scriptContainer);
    }

    return () => {
      const containerEl = document.getElementById('zapin-global-body-ad-container');
      if (containerEl) {
        containerEl.remove();
      }
    };
  }, [
    adNetworkConfig.enabled,
    adNetworkConfig.bodyScriptEnabled,
    adNetworkConfig.bodyAdCode,
    adNetworkConfig.socialBarEnabled,
    adNetworkConfig.socialBarCode,
    adNetworkConfig.nativeBannerEnabled,
    adNetworkConfig.nativeBannerCode,
    adNetworkConfig.popunderEnabled,
    adNetworkConfig.popunderCode,
    adNetworkConfig.popupAdEnabled,
    adNetworkConfig.smartlinkUrl,
    adNetworkConfig.directAdUrl,
    currentPage,
    refreshCount,
  ]);

  return null;
};
