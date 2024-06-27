import {Injectable} from '@angular/core'
import {GalleryItem} from "../../models/GalleryItem";
import {ResponsiveImage} from "./responsive-image";
import {ResponsiveImageAttributesService} from "./responsive-image-attributes.service";
import {Px} from "../css/unit/px";

/**
 * Creates responsive images attributes for use with Angular's optimized image
 * directive: `ngSrcSet` and `sizes` attributes
 *
 * Inspired from `unpic-img` lib. Can't use that lib because:
 *  - ImageKit CDN isn't supported
 *  - Doesn't provide proper `srcSet` and `sizes` for advanced layouts
 *
 * @see https://github.com/ascorbic/unpic-img/blob/core-v0.0.36/packages/core/src/core.ts#L200-L227
 * @see https://github.com/ascorbic/unpic-img/blob/core-v0.0.36/packages/core/src/core.ts#L315-L348
 */
@Injectable({
  providedIn: 'root',
})
export class ResponsiveImageService {
  private responsiveImageAttributesService: ResponsiveImageAttributesService;

  constructor(responsiveImageAttributesService: ResponsiveImageAttributesService) {
    this.responsiveImageAttributesService = responsiveImageAttributesService;
  }

  public convertGalleryItemToImageAsset(galleryItem: GalleryItem, maxHeight: number): ResponsiveImage {
    const imageAsset = {
      name: `image${galleryItem.id}.jpg`, // Или другое логическое имя для изображения
      filePath: galleryItem.image,
      url: galleryItem.image,
      alt: `Image ${galleryItem.id}`, // Или другое логическое описание
      width: galleryItem.width,
      height: galleryItem.height,
      mimeType: this.getMimeType(galleryItem.image) // Предполагается, что у вас есть метод для получения MIME-типа
    };
    const aspectRatio = imageAsset.width / imageAsset.height;
    const maxWidthPx = aspectRatio * maxHeight;

    /*const srcSet = this.responsiveImageAttributesService
      .fullWidthUntil(Px(Math.ceil(maxWidthPx)))
      .breakpoints.pxList.map(bp => this.createSizedUrl(imageAsset.filePath, bp) + ` ${bp}w`).join(', ');


    const src = this.responsiveImageAttributesService
      .fullWidthUntil(Px(Math.ceil(maxWidthPx)))
      .reduce();
    console.log(src)
    //console.log("\n\n" + srcSet + "\n\n")*/
    return new ResponsiveImage(
      imageAsset,
      this.responsiveImageAttributesService
        .fullWidthUntil(Px(Math.ceil(maxWidthPx)))
        .reduce(),
    );
  }

  private createSizedUrl(url: string, width: number): string {
    const urlParts = url.split('.');
    const extension = urlParts.pop();
    return `${urlParts.join('.')}_width${width}.${extension}`;
  }

  private getMimeType(url: string): string {
    const extension = url.split('.').pop();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      // Добавьте другие типы по мере необходимости
      default:
        return 'application/octet-stream';
    }
  }
}
