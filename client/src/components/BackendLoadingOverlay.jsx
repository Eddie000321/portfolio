import React, { useEffect, useRef, useState } from "react";

import { subscribeToApiLoading } from "../services/apiClient.js";

const BackendLoadingOverlay = () => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeToApiLoading((isLoading) => {
      if (isLoading) {
        if (timerRef.current) {
          return;
        }
        timerRef.current = setTimeout(() => setVisible(true), 150);
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        setVisible(false);
      }
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = null;
      unsubscribe();
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="backend-loading-overlay" aria-live="polite">
      <div className="backend-loading-card">
        <div className="backend-loading-spinner" aria-hidden="true" />
        <div>
          <p className="backend-loading-title">Please wait...</p>
          <p className="backend-loading-subtitle">Contacting backend and loading data.</p>
        </div>
      </div>
    </div>
  );
};

export default BackendLoadingOverlay;
