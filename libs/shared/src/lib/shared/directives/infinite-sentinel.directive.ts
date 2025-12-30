import { Directive, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[libUiInfiniteSentinel]',
  standalone: true,
})
export class InfiniteSentinelDirective implements OnInit, OnDestroy {
  @Input() rootMargin = '600px';
  @Input() preventEmissionOnFirstLoad = false;
  @Output() visible = new EventEmitter<void>();

  private host = inject(ElementRef<HTMLElement>);
  private intersectionObserver?: IntersectionObserver;
  private hasEmmitedOnce = false;

  ngOnInit() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        // Workaround to prevent emitting on first load
        if (this.preventEmissionOnFirstLoad && !this.hasEmmitedOnce) {
          this.hasEmmitedOnce = true;
          return;
        }

        if (entries.some((entry) => entry.isIntersecting)) {
          this.visible.emit();
        }
      },
      { root: null, rootMargin: this.rootMargin },
    );
    this.intersectionObserver.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
  }
}
