"use client";

import { ReactNode } from "react";
import { TourProvider, useRegisterTour } from "@oqlet/react-driver";
import "@oqlet/react-driver/driver.css";

import {
  DASHBOARD_TOUR,
  DASHBOARD_TOUR_ID,
  APPLIANCES_TOUR,
  APPLIANCES_TOUR_ID,
  SAVINGS_TIPS_TOUR,
  SAVINGS_TIPS_TOUR_ID,
  CHAT_TOUR,
  CHAT_TOUR_ID,
  SETTINGS_TOUR,
  SETTINGS_TOUR_ID,
} from "../constants/pageTours.constants";
import { WelcomeTourModal } from "./WelcomeTourModal";

function TourRegistrar() {
  useRegisterTour(DASHBOARD_TOUR_ID, DASHBOARD_TOUR);
  useRegisterTour(APPLIANCES_TOUR_ID, APPLIANCES_TOUR);
  useRegisterTour(SAVINGS_TIPS_TOUR_ID, SAVINGS_TIPS_TOUR);
  useRegisterTour(CHAT_TOUR_ID, CHAT_TOUR);
  useRegisterTour(SETTINGS_TOUR_ID, SETTINGS_TOUR);

  return <WelcomeTourModal />;
}

interface TourProviderWrapperProps {
  children: ReactNode;
}

export function TourProviderWrapper({ children }: Readonly<TourProviderWrapperProps>) {
  return (
    <TourProvider>
      <TourRegistrar />
      {children}
    </TourProvider>
  );
}
