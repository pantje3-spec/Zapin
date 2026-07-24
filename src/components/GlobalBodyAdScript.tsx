import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const GlobalBodyAdScript: React.FC = () => {
  const { adNetworkConfig, currentPage } = useStore();

  useEffect(() => {
    if (!adNetworkConfig.enabled || currentPage === 'admin') {
      return;
    }

    const scriptContainer = document.createElement('div');
    scriptContainer.id = 'zapin-global-body-ad-container';

    // Parse and append script or iframe code provided in admin portal
    if (adNetworkConfig.bodyScriptEnabled && adNetworkConfig.bodyAdCode) {
      const code = adNetworkConfig.bodyAdCode.trim();
      
      // Extract script src if it's a script tag
      const srcMatch = code.match(/src=["']([^"']+)["']/i);
      if (srcMatch && srcMatch[1]) {
        let scriptUrl = srcMatch[1];
        if (scriptUrl.startsWith('//')) {
          scriptUrl = 'https:' + scriptUrl;
        }
        
        // Prevent duplicate script insertion
        const existingScript = document.querySelector(`script[src*="${srcMatch[1]}"]`);
        if (!existingScript) {
          const scriptEl = document.createElement('script');
          scriptEl.type = 'text/javascript';
          scriptEl.src = scriptUrl;
          scriptEl.async = true;
          document.body.appendChild(scriptEl);
        }
      } else {
        // Fallback HTML injection
        scriptContainer.innerHTML = code;
        document.body.appendChild(scriptContainer);
      }
    }

    // Optional First-Click Popunder / Direct CPM Ad Redirect Listener
    const handleGlobalClick = (e: MouseEvent) => {
      if (!adNetworkConfig.popupAdEnabled || !adNetworkConfig.directAdUrl) {
        return;
      }

      // Trigger popunder ad once per session on background click
      const hasClickedAd = sessionStorage.getItem('zapin_cpm_ad_triggered');
      if (!hasClickedAd) {
        sessionStorage.setItem('zapin_cpm_ad_triggered', 'true');
        const adWindow = window.open(adNetworkConfig.directAdUrl, '_blank');
        if (adWindow) {
          adWindow.blur();
          window.focus();
        }
      }
    };

    if (adNetworkConfig.popupAdEnabled && adNetworkConfig.directAdUrl) {
      window.addEventListener('click', handleGlobalClick, { once: true });
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      const containerEl = document.getElementById('zapin-global-body-ad-container');
      if (containerEl) {
        containerEl.remove();
      }
    };
  }, [
    adNetworkConfig.enabled,
    adNetworkConfig.bodyScriptEnabled,
    adNetworkConfig.bodyAdCode,
    adNetworkConfig.popupAdEnabled,
    adNetworkConfig.directAdUrl,
    currentPage
  ]);

  return null;
};
