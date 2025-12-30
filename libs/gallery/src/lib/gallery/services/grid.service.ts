import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const GRID_LAYOUT = {
  [Breakpoints.XSmall]: 1,
  [Breakpoints.Small]: 2,
  [Breakpoints.Medium]: 2,
  [Breakpoints.Large]: 3,
  [Breakpoints.XLarge]: 3,
} as const;

const BREAKPOINTS = Object.keys(GRID_LAYOUT);

@Injectable()
export class GridService {
  private readonly breakpoint = inject(BreakpointObserver);

  public readonly gridColumns = toSignal(
    this.breakpoint.observe(BREAKPOINTS).pipe(
      map((result) => {
        const matchedBreakpoint = BREAKPOINTS.find((breakpoint) => result.breakpoints[breakpoint]);

        if (matchedBreakpoint) {
          return GRID_LAYOUT[matchedBreakpoint];
        }

        return 3;
      }),
    ),
    { initialValue: 3 },
  );
}
