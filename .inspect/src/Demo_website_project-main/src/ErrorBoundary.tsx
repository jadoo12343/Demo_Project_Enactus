import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo): void {}
  render() {
    if (this.state.hasError) {
      return <main className="error-screen"><p className="eyebrow">INNOVISION 2027</p><h1>Something interrupted the experience.</h1><p>Please reload the page to continue.</p><button className="button button-primary" onClick={() => window.location.reload()}>Reload page</button></main>;
    }
    return this.props.children;
  }
}
