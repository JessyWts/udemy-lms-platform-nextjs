"use client";

import React from 'react';
import { useWindowSize } from 'react-use';
import ReactConfetti from 'react-confetti'
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
    const confetti = useConfettiStore();
    const {width, height} = useWindowSize();


    if ((!confetti.isOpen)) return null;

    return (
        <ReactConfetti
            className='pointer-events-none z-[100]'
            width= {width}
            height={height}
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={
                () => confetti.onClose()
            }
        />
    );
}