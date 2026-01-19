"use client";

import React from "react";
import { useStudioStore } from "../store/useStudioStore";
import StudioLayout from "./StudioLayout";
import DesignControls from "./controls/DesignControls";
import ProfileControls from "./controls/ProfileControls";
import OrderSummary from "./controls/OrderSummary";
import Card3D from "./preview/Card3D";
import MobilePreview from "./preview/MobilePreview";

export default function StudioContent() {
    const { step } = useStudioStore();

    let controls;
    let preview;

    switch (step) {
        case 1:
            controls = <DesignControls />;
            preview = <Card3D />;
            break;
        case 2:
            controls = <ProfileControls />;
            preview = <MobilePreview />;
            break;
        case 3:
            controls = <OrderSummary />;
            preview = <Card3D />; // Show the card again at checkout
            break;
        default:
            controls = <DesignControls />;
            preview = <Card3D />;
    }

    return <StudioLayout controls={controls} preview={preview} />;
}
