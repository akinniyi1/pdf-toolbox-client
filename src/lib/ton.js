import { TonConnectUIProvider, TonConnectUI } from '@tonconnect/ui-react';

const connector = new TonConnectUI({
  manifestUrl: 'https://pdf-toolbox-client.onrender.com/tonconnect-manifest.json',
});

export { connector as tonConnect };
