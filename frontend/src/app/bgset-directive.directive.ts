import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface ImageSource {
  url: string;
  width: number;
  height: number;
}

@Directive({
  standalone: true,
  selector: '[appBgset]'
})
export class BgsetDirective implements OnChanges {
  @Input('appBgset') images!: ImageSource[];
  @Input() maxWidth!: number;
  @Input() maxHeight!: number;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.images && this.images.length > 0) {
      const selectedImageUrl = this.selectImage();
      this.elementRef.nativeElement.style.backgroundImage = `url('${selectedImageUrl}')`;
    }
  }

  private selectImage(): string {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const selectedImage = this.images.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.width - screenWidth) + Math.abs(prev.height - screenHeight);
      const currDiff = Math.abs(curr.width - screenWidth) + Math.abs(curr.height - screenHeight);

      return currDiff < prevDiff ? curr : prev;
    });

    return selectedImage.url;
  }
}
