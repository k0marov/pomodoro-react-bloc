import { Component, useEffect, useState } from 'react';
import {Observable} from 'rxjs';

enum ConnectionState {
  none,
  waiting,
  active,
  done,
}

class AsyncSnapshot<T> {
  constructor(readonly connectionState: ConnectionState, readonly data: T | null, readonly error: Error | null) {};
  get hasData(): boolean {
    return this.data != null;
  }

  get hasError(): boolean {
    return this.error != null;
  }
};

interface StreamBuilderProps<T> {
    stream: Observable<T>,
    builder: (snapshot: AsyncSnapshot<T>) => React.ReactElement,
    initialData: T | null, 
};

function StreamBuilder<T>({stream, builder, initialData} : StreamBuilderProps<T>) {
    const [snapshot, setSnapshot] = useState(new AsyncSnapshot(ConnectionState.waiting, initialData, null)); 
    useEffect(() => {
      const subscription = stream.subscribe(
        (value) => setSnapshot(new AsyncSnapshot(ConnectionState.active, value, null)),
        (error) => setSnapshot(new AsyncSnapshot<T>(ConnectionState.active, null, error)),
        () => setSnapshot(new AsyncSnapshot<T>(ConnectionState.done, null, null)),
      );
      return () => subscription.unsubscribe();
    }, []);

    return builder(snapshot);
}