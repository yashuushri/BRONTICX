/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside portfolio component boundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          id="error-boundary-fallback" 
          className="my-6 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-900/60 text-center flex flex-col items-center justify-center min-h-[180px]"
        >
          <AlertCircle className="w-6 h-6 text-zinc-600 mb-2.5" />
          <h4 className="text-white font-sans font-bold text-xs tracking-tight uppercase">
            {this.props.fallbackTitle || "Section Unavailable"}
          </h4>
          <p className="text-zinc-550 text-[11px] max-w-xs mx-auto mt-1 leading-normal font-normal">
            Something went wrong while drawing this component. You can reload the segment safely.
          </p>
          <button
            onClick={this.handleReset}
            className="mt-3.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-[10px] transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Retry Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
