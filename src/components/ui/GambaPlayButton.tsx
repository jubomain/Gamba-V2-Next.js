// src/components/ui/GambaPlayButton.tsx

import { GambaUi } from "gamba-react-ui-v2";
import React from "react";
import styled from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface GambaPlayButtonProps {
  disabled?: boolean;
  onPlay: () => void;
  text: string;
}

interface GambaButtonProps {
  disabled?: boolean;
  onClick: () => void;
  text: string;
}

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;

  @media (min-width: 768px) {
    flex-direction: row;
    width: auto;
  }
`;

export const GambaButton = ({ disabled, onClick, text }: GambaButtonProps) => {
  return (
    <GambaUi.Button main disabled={disabled} onClick={onClick}>
      {text}
    </GambaUi.Button>
  );
};

const GambaPlayButton = ({ disabled, onPlay, text }: GambaPlayButtonProps) => {
  const walletModal = useWalletModal();
  const wallet = useWallet();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  return wallet.connected ? (
    <GambaUi.Button main disabled={disabled} onClick={onPlay}>
      {text}
    </GambaUi.Button>
  ) : (
    <GambaUi.Button main disabled={disabled} onClick={connect}>
      {text}
    </GambaUi.Button>
  );
};

export default GambaPlayButton;