import { LoadingComponent } from '../loading/index';
import { ComponentType } from 'react';

export function LoadContent<T>(WrappedComponent: ComponentType<T>) {
  function wrapper(props: T) {
    return <WrappedComponent {...props} loadingComponent={LoadingComponent} />;
  }
  return wrapper;
}
