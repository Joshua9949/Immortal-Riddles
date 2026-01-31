import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

// GenLayer contract address
const GENLAYER_CONTRACT = '0x024222FF1C4E75a02ad2D02000f6635c2fA65296';

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    isConnected: false,
    error: null,
  });

  const checkConnection = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setState({
          address: accounts[0],
          isConnecting: false,
          isConnected: true,
          error: null,
        });
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }, []);

  useEffect(() => {
    checkConnection();

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setState({
            address: accounts[0],
            isConnecting: false,
            isConnected: true,
            error: null,
          });
        } else {
          setState({
            address: null,
            isConnecting: false,
            isConnected: false,
            error: null,
          });
        }
      });
    }
  }, [checkConnection]);

  const connect = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setState(prev => ({
        ...prev,
        error: 'Please install MetaMask or another Web3 wallet',
      }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setState({
        address: accounts[0],
        isConnecting: false,
        isConnected: true,
        error: null,
      });
    } catch (error: any) {
      setState({
        address: null,
        isConnecting: false,
        isConnected: false,
        error: error.message || 'Failed to connect wallet',
      });
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      isConnecting: false,
      isConnected: false,
      error: null,
    });
  }, []);

  const shortenAddress = useCallback((address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    shortenAddress,
    contractAddress: GENLAYER_CONTRACT,
  };
}

// Extend window type for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
